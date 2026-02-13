import { Link } from "react-router-dom";
import React from "react";

type Variant = "solid" | "outline" | "ghost";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  state?: unknown;
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  variant = "outline",
  external,
  className = "",
  state,
  onClick,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-sm transition cursor-pointer " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(34,34,59,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

  const styles: Record<Variant, string> = {
    solid:
      "bg-[var(--nav)] text-white hover:opacity-90 shadow-sm border border-transparent",
    outline:
      "border border-[var(--text)] bg-transparent hover:bg-[rgba(34,34,59,0.08)]",
    ghost: "bg-transparent hover:bg-[rgba(246,246,246,0.55)]",
  };

  const cls = `${base} ${styles[variant]} ${className}`;

  if (onClick) {
    return (
      <button className={cls} onClick={onClick}>
        {children}
      </button>
    );
  }

  if (!href) {
    throw new Error("Button requires either href or onClick prop");
  }

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={cls} to={href} state={state}>
      {children}
    </Link>
  );
}
