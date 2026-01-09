import { startOfDay, subDays } from "date-fns";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AnalyticsPeriod } from "@/components/app/domain/analytics-period";
import { LiveUsersFeed } from "@/components/app/domain/live-users-feed";
import { auth } from "@/lib/auth";
import { openGraphImage, SITE_CONFIG } from "@/lib/constants";
import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { AnalyticsFeed } from "./analytics-feed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const website = await db.query.websites.findFirst({
    where: (websites, { eq }) => eq(websites.domain, domain),
  });

  if (!website) {
    return {
      title: "Domain not found",
      description: "The requested page could not be found",
    };
  }

  return {
    title: website.name,
    description: SITE_CONFIG.DESCRIPTION,
    openGraph: {
      ...openGraphImage,
      title: website.name,
      description: SITE_CONFIG.DESCRIPTION,
      type: "website",
      url: `${ROUTES.DASHBOARD}/${website.domain}`,
    },
  };
}

const defaultValue = {
  from: startOfDay(subDays(new Date(), 6)).toISOString(),
  to: new Date().toISOString(),
  period: "7d",
};

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(ROUTES.ROOT);

  const website = await db.query.websites.findFirst({
    where: (websites, { eq, and }) =>
      and(eq(websites.domain, domain), eq(websites.userId, session.user.id)),
  });

  if (!website) notFound();

  return (
    <div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 col-span-full">
        <div className="flex items-center gap-4 flex-none">
          <div className="font-semibold lowercase">{domain}</div>
          <LiveUsersFeed websiteId={website.id} />
        </div>

        <div className="flex items-center gap-2 w-full justify-end">
          <AnalyticsPeriod defaultValue={defaultValue} />
        </div>
      </div>

      <AnalyticsFeed websiteId={website.id} defaultValue={defaultValue} />
    </div>
  );
}
