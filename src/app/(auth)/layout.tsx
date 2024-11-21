import { isAuth } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthPagesLayout({ children } : { children: ReactNode}) {
  const authenticated = await isAuth();

  if (authenticated) return redirect("/authenticated-route");

  return children;
}
