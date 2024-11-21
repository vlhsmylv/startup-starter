import { getSession } from "next-auth/react";

export async function isAuth() {
  const session = await getSession();
  return !!session?.user;
}

export async function getSessionMe() {
  const session = await getSession();
  return session?.user;
}
