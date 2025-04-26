"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createWebsiteAction } from "@/lib/actions/create-website";
import {
  createWebsiteFormSchema,
  type createWebsiteFormSchemaType,
} from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddWebsite = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<createWebsiteFormSchemaType>({
    resolver: zodResolver(createWebsiteFormSchema),
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  function onSubmit(values: createWebsiteFormSchemaType) {
    startTransition(async () => {
      const res = await createWebsiteAction(values);

      if (!res.success) {
        switch (res.type) {
          case "domain":
            form.setError(
              "domain",
              { message: res.error },
              { shouldFocus: true },
            );
            break;
          case "all":
            form.setError("domain", { message: res.error });
            form.setError("name", { message: res.error });
            break;

          default:
            toast.error(res.error);
            break;
        }
        return;
      }

      setIsOpen(false);
      toast.success("Website added successfully!");
    });
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setTimeout(() => form.reset(), 150);

        setIsOpen(open);
      }}
    >
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My vibe website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="vibesaas.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <LoaderCircleIcon className="animate-spin" />}{" "}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
