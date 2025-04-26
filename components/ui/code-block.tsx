import { highlight } from "sugar-high";

export const CodeBlock = ({ code }: { code: string }) => {
  const html = highlight(code);

  return (
    <pre className="overflow-x-auto rounded-sm bg-muted p-4 text-sm">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};
