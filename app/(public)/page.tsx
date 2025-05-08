import PeerlistLaunchpadIcon from "@/components/icons/peerlist-launchpad";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";
import { ROUTES } from "@/lib/routes";
import hero from "@/public/hero.png";
import { GitBranchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GoogleSignIn } from "./google-sign-in";

const features = [
  {
    title: "Privacy Focused",
    description:
      "No cookies or invasive tracking. Respect user privacy by default.",
  },
  {
    title: "Lightweight Script",
    description:
      "Our tiny script (~1.2kB) won't slow down your website's performance.",
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

const scriptSnippet = `<script defer src="https://analytics.ritiksharma.me/script.js"></script>`;

export default async function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 my-16 space-y-12">
      <div>
        <h1 className="text-2xl font-medium capitalize">
          Lightweight Google Analytics Alternative
        </h1>
        <p className="text-muted-foreground mt-4">
          Understand your website traffic with essential insights. No cookies,
          no personal data collection, just the stats that matter.
        </p>
      </div>

      <div className="flex gap-2 flex-col md:flex-row">
        <GoogleSignIn />
        <Button variant="outline" asChild>
          <a
            href="https://github.com/ritiksharmarj/analytics.ritiksharma.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranchIcon /> Open Source
          </a>
        </Button>
      </div>

      <div className="md:-mx-4">
        <Image
          src={hero}
          alt="hero"
          width={1024}
          height={576}
          className="rounded-md"
          quality={100}
          placeholder="blur"
        />
      </div>

      <div>
        <h2 className="mb-5 text-xl font-medium md:mb-4">Features</h2>
        <div className="space-y-7 md:space-y-4">
          {features.map((feature) => (
            <div key={feature.title}>
              <h3>{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5 md:space-y-4">
        <h2 className=" text-xl font-medium">Easy integration in seconds</h2>

        <p className="text-sm text-muted-foreground">
          To add analytics to your website, add the following script tag to the{" "}
          <Code text="&lt;head&gt;...&lt;/head&gt;" className="text-xs" />{" "}
          section of your website's HTML.
        </p>

        <CodeBlock code={scriptSnippet} />
      </div>

      <div className="text-sm flex gap-4">
        <Link
          href={ROUTES.DOCS}
          className="underline-offset-4 underline hover:decoration-2"
        >
          Documentation
        </Link>
        <a
          href="https://github.com/ritiksharmarj/analytics.ritiksharma.me"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 underline hover:decoration-2"
        >
          GitHub
        </a>
        <a
          href="https://x.com/ritiksharmarj"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 underline hover:decoration-2"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}
