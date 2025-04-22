import { LogoIcon, NotFoundIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex h-dvh flex-col items-center justify-center gap-10 p-4">
      <Link href={ROUTES.ROOT} className="absolute left-4 top-4">
        <LogoIcon className="h-6 w-auto" />
      </Link>

      <NotFoundIcon />
      <div className="flex flex-col justify-center gap-3 text-center">
        <h4 className="font-bricolage_grotesque text-2xl font-medium">
          Whoops, looks like a 404!
        </h4>
        <p className="text-center text-sm text-muted-foreground">
          Yes, this is definitely a 404.
          <br />
          We couldn&apos;t find the page you were looking for, sorry.
        </p>
      </div>

      <Button asChild>
        <Link href={ROUTES.ROOT}>Back to homepage</Link>
      </Button>
    </div>
  );
}
