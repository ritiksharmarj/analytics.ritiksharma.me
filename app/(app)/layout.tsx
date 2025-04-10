import { AppHeader } from "@/components/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <AppHeader />

      <div className="my-16">{children}</div>
    </div>
  );
}
