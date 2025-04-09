import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/routes";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";
import { WebsiteFeed } from "../_components/website-feed";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(ROUTES.ROOT);

  return (
    <div>
      {/* top */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Websites</div>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon /> Add website
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add website</DialogTitle>
                <DialogDescription>
                  Add your website here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Username</Label>
                  <Input
                    id="username-1"
                    name="username"
                    defaultValue="@peduarte"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      {/* list */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <React.Suspense fallback={<p>Loading websites...</p>}>
          <WebsiteFeed />
        </React.Suspense>
      </div>
    </div>
  );
}
