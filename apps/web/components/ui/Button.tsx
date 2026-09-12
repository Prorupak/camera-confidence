import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-on hover:bg-primary-hover active:bg-primary-active disabled:bg-border disabled:text-text-muted",
  secondary:
    "bg-surface text-text-primary border border-border hover:bg-background active:bg-border disabled:bg-border disabled:text-text-muted disabled:border-transparent",
  ghost:
    "bg-transparent text-text-primary hover:bg-background active:bg-border disabled:text-text-muted",
  destructive:
    "bg-transparent text-error border border-border hover:bg-primary-subtle active:bg-border disabled:text-text-muted disabled:border-transparent",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-body-sm",
  md: "h-11 px-5 text-body",
  lg: "h-13 px-7 text-body-lg",
};

/** Primary interactive control. Keep to one primary Button per screen — see design-system.md §20-21. */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors duration-base disabled:cursor-not-allowed cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    />
  );
}
