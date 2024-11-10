import { isAuth } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const authenticated = await isAuth();

  if (!authenticated) return redirect("/login");

  return redirect("/dashboard");
}
