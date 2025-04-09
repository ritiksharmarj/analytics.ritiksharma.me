ALTER TABLE "websites" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_domain_unique" UNIQUE("domain");