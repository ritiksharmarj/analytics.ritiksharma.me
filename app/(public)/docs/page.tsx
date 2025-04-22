import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function DocsPage() {
  const scriptSnippet = `<script defer src="https://analytics.ritiksharma.me/script.js"></script>`;

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
          <code className="rounded-sm bg-card text-card-foreground px-1 py-0.5 font-mono text-sm border">
            &lt;head&gt;...&lt;/head&gt;
          </code>{" "}
          section of your website's HTML.
        </p>
        <pre className="overflow-x-auto rounded-sm bg-muted p-4">
          <code className="language-js text-sm">{scriptSnippet}</code>
        </pre>
        <p>
          Make sure to include the{" "}
          <code className="rounded-sm bg-card text-card-foreground px-1 py-0.5 font-mono text-sm border">
            defer
          </code>{" "}
          attribute. This allows your page content to load without waiting for
          the analytics script, ensuring better performance.
        </p>
        <p>
          Note: The script will only collect data when accessed from the domain
          you registered in Step 1. It will ignore data from development
          environments like{" "}
          <code className="rounded-sm bg-card text-card-foreground px-1 py-0.5 font-mono text-sm border">
            localhost
          </code>
          .
        </p>
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
          Go to the{" "}
          <code className="rounded-sm bg-card text-card-foreground px-1 py-0.5 font-mono text-sm border">
            dashboard/:siteId
          </code>{" "}
          to verify that the page view has been sent and is displayed on the
          charts.
        </p>
      </section>
    </div>
  );
}
