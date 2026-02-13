import { Link } from "react-router-dom";
import React from "react";

type Variant = "solid" | "outline" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "outline",
  external,
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-xl transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(34,34,59,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

  const styles: Record<Variant, string> = {
    solid:
      "bg-[var(--nav)] text-white hover:opacity-90 shadow-sm border border-transparent",
    outline:
      "border border-[var(--text)] bg-transparent hover:bg-[rgba(34,34,59,0.08)]",
    ghost: "bg-transparent hover:bg-[rgba(246,246,246,0.55)]",
  };

  const cls = `${base} ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={cls} to={href}>
      {children}
    </Link>
  );
}
