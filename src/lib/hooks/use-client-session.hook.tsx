import { Employee } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function useClientSession() {
  const session = useSession();

  return {
    isAuth: !!session?.data?.user,
    currentMe: session?.data?.user as Employee,
    myRole: (session?.data?.user as Employee)?.role,
  };
}
