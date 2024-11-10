import { isAuth, myRole } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "./(components)/sidebar";

export default async function DashboardPagesLayout({
  manager,
  employee,
}: {
  manager: ReactNode;
  employee: ReactNode;
}) {
  const authenticated = await isAuth();
  const role = await myRole();

  if (!authenticated) return redirect("/login");

  return (
    <main className="flex">
      <Sidebar />
      <section className="p-10">
        {role === "manager" ? manager : employee}
      </section>
    </main>
  );
}
