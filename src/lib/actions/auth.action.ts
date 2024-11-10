import { auth } from "@/auth";
import { Employee } from "@prisma/client";

export async function isAuth() {
  const session = await auth();

  return !!session?.user;
}

export async function currentMe() {
  const session = await auth();

  return session?.user;
}

export async function myRole() {
  const session = await auth();

  return (session?.user as Employee)?.role;
}
