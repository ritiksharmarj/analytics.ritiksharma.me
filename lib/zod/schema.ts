import { z } from "zod";

export const createWebsiteFormSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be kept empty." }).trim(),
  domain: z.string().min(1, { message: "Domain cannot be kept empty." }).trim(),
});

export type createWebsiteFormSchemaType = z.infer<
  typeof createWebsiteFormSchema
>;
