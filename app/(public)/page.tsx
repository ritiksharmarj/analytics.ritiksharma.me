import { GoogleSignIn } from "./google-sign-in";

export default async function Home() {
  return (
    <div className="p-20">
      <GoogleSignIn />
    </div>
  );
}
