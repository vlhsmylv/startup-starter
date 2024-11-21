import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { ZodError } from "zod";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/utils/zod.utils";
import { getUserByCredentials } from "@/services/auth"; // Adjust import path as necessary

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          const user = await getUserByCredentials(email, password);
          return user || null;
        } catch (error: any) {
          if (error instanceof ZodError) {
            return null;
          }
          throw new Error(
            error?.message || "An error occurred during authorization."
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.picture = user.picture;
        token.role = user.role;
        token.surname = user.surname;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.picture = token.picture as string;
        session.user.role = token.role as string;
        session.user.surname = token.surname as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 15 * 60,
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
