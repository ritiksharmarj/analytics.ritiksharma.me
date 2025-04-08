import { AppHeader } from "@/components/app-header";
import { AppLayout } from "@/components/app-layout";
import * as React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <AppHeader />
      <AppLayout>{children}</AppLayout>
    </div>
  );
}
