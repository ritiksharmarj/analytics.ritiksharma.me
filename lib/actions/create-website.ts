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

type ActionResponse = {
  success: boolean;
  error?: string;
  type?: "all" | "domain";
};

export async function createWebsiteAction(
  values: createWebsiteFormSchemaType,
): Promise<ActionResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { success: false, error: "Unauthorized access" };

  const validatedFields = createWebsiteFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      success: false,
      type: "all",
      error: "Please enter a valid details.",
    };
  }

  const domain = normalizeDomain(validatedFields.data.domain);

  // Check if domain already exists
  const existingWebsite = await db.query.websites.findFirst({
    where: (websites, { eq }) => eq(websites.domain, domain),
  });
  if (existingWebsite)
    return {
      success: false,
      type: "domain",
      error: "Domain is already exist.",
    };

  try {
    // insert the new website
    await db.insert(schema.websites).values({
      userId: session.user.id,
      name: validatedFields.data.name,
      domain,
    });

    revalidateTag(`websites_${session.user.id}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create new website." };
  }
}
