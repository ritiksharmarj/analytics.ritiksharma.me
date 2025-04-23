import { ROUTES } from "@/lib/routes";
import type { Metadata } from "next";
import Link from "next/link";
import { highlight } from "sugar-high";

export const metadata: Metadata = {
  title: "Docs",
  openGraph: {
    title: "Docs",
    url: ROUTES.DOCS,
  },
};

const scriptSnippet = `<script defer src="https://analytics.ritiksharma.me/script.js"></script>`;
const nextSnippet = `<head>
<Script
  src="https://analytics.ritiksharma.me/script.js"
  strategy="afterInteractive"
/>
</head>`;

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 my-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Get started</h1>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Step 1 - Add website
        </h2>
        <p>
          To start tracking analytics for your website, first log in to your
          dashboard and{" "}
          <Link
            href={ROUTES.DASHBOARD}
            className="text-primary underline-offset-4 underline decoration-border hover:decoration-primary transition-colors"
          >
            add the website's domain.
          </Link>
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Step 2 - Add code snippet
        </h2>
        <p>
          To add analytics to your website, add the following script tag to the{" "}
          <Code text="&lt;head&gt;...&lt;/head&gt;" /> section of your website's
          HTML.
        </p>

        <CodeBlock code={scriptSnippet} />

        <p>
          Make sure to include the <Code text="async" /> or{" "}
          <Code text="defer" /> attribute. It allows your page to load without
          waiting for the script.
        </p>
        <p>
          Note: The script will only collect data when accessed from the domain
          you registered in Step 1. It will ignore data from development
          environments like <Code text="localhost" />
        </p>

        <p>
          For <span className="font-semibold">static websites</span>, the script
          must be included on every page you want to track.
        </p>
        <p>
          For <span className="font-semibold">single page applications</span>,
          add the analytics script to your HTML file or your application’s
          layout once. (e.g. Next.js)
        </p>

        <CodeBlock code={nextSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Step 3 - Check the script
        </h2>
        <p>
          Once you add the script to your site, reload the deployed site’s page
          with the script to ensure it sends the first page view.
        </p>
        <p>
          Go to the <Code text="dashboard/:siteId" /> to verify that the page
          view has been sent and is displayed on the charts.
        </p>
      </section>
    </div>
  );
}

const CodeBlock = ({ code }: { code: string }) => {
  const html = highlight(code);

  return (
    <pre className="overflow-x-auto rounded-sm bg-muted p-4 text-sm">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};

const Code = ({ text }: { text: string }) => {
  return (
    <code className="rounded-sm bg-card text-card-foreground px-1 py-0.5 font-mono text-sm border">
      {text}
    </code>
  );
};
