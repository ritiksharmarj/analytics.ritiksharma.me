import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";
import { AddWebsite } from "@/components/app/dashboard/add-website";
import { WebsiteFeed } from "@/components/app/dashboard/website-feed";
import { WebsiteFeedSkeleton } from "@/components/skeleton";
import { auth } from "@/lib/auth";
import { openGraphImage } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Dashboard",
  openGraph: {
    ...openGraphImage,
    title: "Dashboard",
    url: ROUTES.DASHBOARD,
  },
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect(ROUTES.ROOT);

  return (
    <div>
      {/* top */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Websites</div>

        <AddWebsite />
      </div>

      {/* list */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <React.Suspense fallback={<WebsiteFeedSkeleton />}>
          <WebsiteFeed userId={session.user.id} />
        </React.Suspense>
      </div>
    </div>
  );
}
