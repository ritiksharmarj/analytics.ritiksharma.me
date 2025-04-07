"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth/client";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/icons";
import { Loader2Icon } from "lucide-react";

export const AuthForm = () => {
  const [isPending, setIsPending] = React.useState(false);

  const onGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          setIsPending(false);
        },
        onRequest: () => {
          setIsPending(true);
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center p-4">
      <Card className="max-w-md grow">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Lightweight google analytics alternative
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={onGoogleSignIn}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
