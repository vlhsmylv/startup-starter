// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import { ZodError } from "zod";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/utils/zod.utils";
import { getEmployeeByCredentials } from "@/services/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          // Validate and parse credentials
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Retrieve user with provided credentials
          const user = await getEmployeeByCredentials(email, password);

          // If user exists, return it; otherwise, return null
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          if (error instanceof ZodError) {
            // Validation error, return null to indicate invalid credentials
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
      // Add custom user properties to JWT token
      if (user) {
        token.picture = user.picture;
        token.role = user.role;
        token.surname = user.surname;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Attach the user's ID from the token to the session
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
    maxAge: 7 * 24 * 60 * 60, // Set session max age to 7 days
    updateAge: 15 * 60, // Update session age every 15 minutes
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60, // JWT token expiration set to 7 days
  },
});
