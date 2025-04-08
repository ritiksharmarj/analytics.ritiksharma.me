import { AppHeader } from "@/components/app-header";
import * as React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <AppHeader />

      <div className="mt-16">{children}</div>
    </div>
  );
}
