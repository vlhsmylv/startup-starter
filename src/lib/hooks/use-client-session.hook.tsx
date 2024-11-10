import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function useClientSession() {
  const session = useSession();

  return {
    isAuth: !!session?.data?.user,
    currentMe: session?.data?.user as User,
  };
}
