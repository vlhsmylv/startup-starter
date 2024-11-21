import { authOptions } from "@/auth"; // Adjust the path to auth.ts as necessary
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
