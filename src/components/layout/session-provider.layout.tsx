"use client";

import { ReactNode } from "react";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  return <NextSessionProvider>{children}</NextSessionProvider>;
}
