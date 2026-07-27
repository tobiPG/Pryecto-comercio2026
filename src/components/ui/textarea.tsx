import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-32 w-full rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
