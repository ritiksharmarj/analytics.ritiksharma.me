import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const getCachedWebsites = async (userId: string) => {
  return unstable_cache(
    async () => {
      return await db.query.websites.findMany({
        where: (websites, { eq }) => eq(websites.userId, userId),
        orderBy: (websites, { desc }) => [desc(websites.createdAt)],
      });
    },
    ["websites", userId],
    { revalidate: 3600, tags: [`websites_${userId}`] },
  )();
};

export const WebsiteFeed = async ({ userId }: { userId: string }) => {
  const websites = await getCachedWebsites(userId);

  if (!websites.length) return <div>No website available</div>;

  return (
    <>
      {websites.map((site) => (
        <Link
          key={site.id}
          href={`${ROUTES.DASHBOARD}/${site.domain}`}
          prefetch={true}
        >
          <Card className="hover:border-ring transition-colors">
            <CardHeader>
              <CardTitle>{site.name}</CardTitle>
              <CardDescription>{site.domain}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </>
  );
};
