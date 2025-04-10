import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";
import { headers } from "next/headers";

const getCachedWebsites = cache(
  async (userId: string) => {
    return await db.query.websites.findMany({
      where: (websites, { eq }) => eq(websites.userId, userId),
      orderBy: (websites, { desc }) => [desc(websites.createdAt)],
    });
  },
  ["websites"],
  { revalidate: 3600, tags: ["websites"] },
);

export const WebsiteFeed = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const websites = session?.user
    ? await getCachedWebsites(session.user.id)
    : [];

  if (!websites.length) return <div>No websites</div>;

  return (
    <>
      {websites.map((site) => (
        <Card key={site.id} className="hover:border-ring transition-colors">
          <CardHeader>
            <CardTitle>{site.name}</CardTitle>
            <CardDescription>{site.domain}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};
