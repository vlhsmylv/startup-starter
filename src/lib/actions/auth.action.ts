import { auth } from "@/auth";

export async function isAuth() {
  const session = await auth();

  return !!session?.user;
}

export async function currentMe() {
  const session = await auth();

  return session?.user;
}

