import { cn } from "@/lib/utils";

export const Code = ({
  className,
  text,
  ...props
}: React.ComponentProps<"div"> & {
  text: string;
}) => {
  return (
    <code
      className={cn(
        "rounded-sm bg-card text-card-foreground px-1 py-0.5 font-mono text-sm border",
        className,
      )}
      {...props}
    >
      {text}
    </code>
  );
};
