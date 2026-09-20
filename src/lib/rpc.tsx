import React from "react";

// Standalone replacement for TanStack Start's useServerFn — our license calls
// are plain HTTPS requests to the cloud license API, so we just pass them through.
export function useServerFn<T extends (...args: never[]) => unknown>(fn: T): T {
  return fn;
}

// Minimal Link replacement (plain anchor) for the standalone SPA build.
export const Link: React.FC<
  { to: string; children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ to, children, ...rest }) => (
  <a href={to} {...rest}>
    {children}
  </a>
);
