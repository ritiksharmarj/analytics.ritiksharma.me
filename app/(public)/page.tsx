import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { BookOpenIcon, CheckCircle, GitBranchIcon } from "lucide-react";
import Link from "next/link";
import { GoogleSignIn } from "./google-sign-in";

// Feature items data
const features = [
  {
    title: "Privacy Focused",
    description:
      "No cookies or invasive tracking. Respect user privacy by default.",
  },
  {
    title: "Lightweight Script",
    description: "Our tiny script won't slow down your website's performance.",
  },
  {
    title: "Essential Metrics",
    description:
      "Focus on key data like page views, visitors, referrers, and more.",
  },
  {
    title: "Simple Interface",
    description:
      "Clean and intuitive dashboard to easily understand your data.",
  },
  {
    title: "Own Your Data",
    description:
      "Self-hostable solution giving you full control over your analytics.",
  },
  {
    title: "Easy Integration",
    description: "Add a simple script tag to your website and start tracking.",
  },
];

export default async function Home() {
  return (
    // Add a subtle background effect (mimicking Aurora) and ensure text contrast
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-center">
      {/* Subtle background gradient effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 grid place-items-center overflow-hidden"
      >
        <div className="absolute h-[300px] w-[600px] rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl filter" />
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Hero Section */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Lightweight Google Analytics Alternative
        </h1>
        <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:px-10">
          Understand your website traffic with essential insights. No cookies,
          no personal data collection, just the stats that matter.
        </p>

        {/* Call to Action Buttons */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-4">
          <GoogleSignIn />
          <Button variant="outline" asChild>
            <a
              href="https://github.com/ritiksharmarj/analytics.ritiksharma.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2" // Added flex for icon spacing
            >
              <GitBranchIcon className="size-4" /> Open Source
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href={ROUTES.DOCS} className="flex items-center gap-2">
              {" "}
              {/* Added flex */}
              <BookOpenIcon className="size-4" /> Documentation
            </Link>
          </Button>
        </div>

        {/* Feature Highlights - Using a Bento Grid inspired layout */}
        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              // Apply dynamic column span and common card styling
              className={cn(
                "relative flex flex-col gap-2 rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md",
              )}
            >
              {/* Optional: Add a subtle effect like Meteor or Glowing Border from Aceternity */}
              {/* <MeteorEffect /> */}
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 shrink-0 text-primary" />
                <h3 className="font-semibold text-card-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-20 text-sm text-muted-foreground">
          Ready to get started? Sign in or{" "}
          <Link
            href={ROUTES.DOCS}
            className="underline underline-offset-4 hover:text-primary"
          >
            check the docs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
