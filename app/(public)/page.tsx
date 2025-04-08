import { auth } from "@/lib/auth";
import { GoogleSignIn } from "./google-sign-in";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");

  return (
    <div className="p-20">
      <GoogleSignIn />
    </div>
  );
}
