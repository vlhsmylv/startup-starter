import useClientSession from "@/lib/hooks/use-client-session.hook";
import Link from "next/link";

export default function NotFound() {
  const { myRole } = useClientSession();

  return (
    <div className="flex flex-col gap-2">
      <h1>Error Occurred</h1>
      <Link href={myRole === "manager" ? "/dashboard/employees" : "/dashboard"}>
        Go back to dashboard
      </Link>
    </div>
  );
}
