"use client";

import { Loader2Icon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/client";
import { ROUTES } from "@/lib/routes";

export const GoogleSignIn = () => {
  const [isPending, setIsPending] = React.useState(false);

  const onGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: ROUTES.DASHBOARD,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onError: (ctx: { error: { message: string } }) => {
          setIsPending(false);
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <Button variant="outline" onClick={onGoogleSignIn} disabled={isPending}>
      {isPending ? <Loader2Icon className="animate-spin" /> : <GoogleIcon />}
      Continue with Google
    </Button>
  );
};
