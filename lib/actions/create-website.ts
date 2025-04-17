"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { normalizeDomain } from "@/lib/utils";
import {
  createWebsiteFormSchema,
  type createWebsiteFormSchemaType,
} from "@/lib/zod/schema";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function createWebsiteAction(values: createWebsiteFormSchemaType) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Unauthorized access" };

  const validatedFields = createWebsiteFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Please enter a valid details." };
  }

  // Check if domain already exists
  const existingWebsite = await db.query.websites.findFirst({
    where: (websites, { eq }) =>
      eq(websites.domain, validatedFields.data.domain),
  });
  if (existingWebsite) return { error: "This domain is already exist." };

  const domain = normalizeDomain(validatedFields.data.domain);

  try {
    // insert the new website
    await db.insert(schema.websites).values({
      userId: session.user.id,
      name: validatedFields.data.name,
      domain,
    });
  } catch (error) {
    return { error: "Failed to create new website." };
  }

  revalidateTag(`websites_${session.user.id}`);
}
