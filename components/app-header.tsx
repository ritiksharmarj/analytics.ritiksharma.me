"use client";

import { BookOpenIcon, CircleHelpIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export const AppHeader = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <div className="flex h-20 items-center justify-between">
      <div>Analytics</div>

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
            <DropdownMenuItem>
              <BookOpenIcon />
              <span>Documentation</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleHelpIcon />
              <span>Contact us</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut({
                fetchOptions: {
                  onSuccess() {
                    router.push("/login");
                  },
                },
              });
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
