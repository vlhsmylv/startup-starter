"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sidebarLinks } from "@/lib/helpers/sidebar-links.helper";
import useClientSession from "@/lib/hooks/use-client-session.hook";
import { cn } from "@/lib/utils/shadcn.utils";
import { Droplets, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Sidebar() {
  const { myRole, currentMe } = useClientSession();

  const currentPath = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-blue-600 text-white p-6 flex flex-col">
      <div className="flex items-center mb-8">
        <Droplets className="w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold">Aventra</h1>
      </div>
      <nav className="flex-grow space-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          if (link.roles.includes(myRole)) {
            return (
              <Fragment key={link.id}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center w-full p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200",
                    currentPath === link.href && "bg-blue-700"
                  )}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="hover:text-primary-foreground">
                    {link.title}
                  </span>
                </Link>
                {link.withDivider && (
                  <div className="border-t border-blue-500 my-2"></div>
                )}
              </Fragment>
            );
          }
        })}
      </nav>
      <div className="mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start hover:bg-blue-500 transition-colors duration-200 h-14"
            >
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={currentMe?.picture} alt="User avatar" />
                <AvatarFallback>
                  {currentMe?.name?.[0]?.toUpperCase()}
                  {currentMe?.surname?.[1]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left mr-2">
                <p className="font-semibold text-white">
                  {currentMe?.name} {currentMe?.surname}
                </p>
                <p className="text-xs text-blue-200">{currentMe?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => await signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
