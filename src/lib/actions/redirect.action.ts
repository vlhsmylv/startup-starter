import { redirect as nextRedirect } from "next/navigation";

export default async function redirect(url: string) {
  return nextRedirect(url);
}
