import {
  BarChart,
  Briefcase,
  ClipboardList,
  LayoutDashboard,
  Settings,
  UserCircle,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  {
    href: "/dashboard",
    id: "dashboard",
    title: "Dashboard",
    roles: ["employee"],
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/employees",
    id: "employees",
    title: "Employees",
    roles: ["manager"],
    icon: Users,
  },
  {
    href: "/dashboard/jobs",
    id: "jobs",
    title: "Jobs",
    roles: ["manager", "employee"],
    icon: Briefcase,
  },
  {
    href: "/dashboard/reports",
    id: "reports",
    title: "Reports",
    icon: BarChart,
    roles: ["manager"],
    withDivider: true,
  },
  {
    href: "/dashboard/reports",
    id: "reports",
    title: "Reports",
    icon: ClipboardList,
    roles: ["employee"],
    withDivider: true,
  },
  {
    href: "/dashboard/profile",
    id: "profile",
    title: "Profile",
    roles: ["manager", "employee"],
    icon: UserCircle,
  },
  {
    href: "/dashboard/settings",
    id: "settings",
    title: "Settings",
    roles: ["manager", "employee"],
    icon: Settings,
  },
];
