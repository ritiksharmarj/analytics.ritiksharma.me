"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth/client";
import { ROUTES } from "@/lib/routes";
import { BookOpenIcon, GitBranchIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoIcon } from "./icons";

export const AppHeader = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <div className="flex h-20 items-center justify-between">
      <Link href={ROUTES.ROOT} className="focus-visible:outline-hidden">
        <LogoIcon className="h-6 w-auto" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative size-8 rounded-full">
            <Avatar className="size-8">
              <AvatarImage
                src={data?.user.image || undefined}
                alt={data?.user.name}
              />
              <AvatarFallback>{data?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="truncate text-sm leading-none font-medium">
                {data?.user.name}
              </p>
              <p className="text-muted-foreground truncate text-xs leading-none">
                {data?.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.DOCS}>
                <BookOpenIcon />
                <span>Documentation</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://github.com/ritiksharmarj/analytics.ritiksharma.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranchIcon />
                <span>Open source</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              router.push(ROUTES.ROOT);
            }}
          >
            <LogOutIcon />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
