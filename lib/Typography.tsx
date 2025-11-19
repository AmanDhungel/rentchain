// lib/typography.tsx
import React from "react";
import clsx from "clsx";
import { JSX } from "react";

export const typography = {
  /* Page headings */
  h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight",
  h2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug",
  h3: "text-xl sm:text-2xl md:text-3xl font-semibold leading-snug",

  /* Section / card titles */
  title: "text-lg sm:text-xl md:text-2xl font-semibold tracking-tight",

  /* Body text */
  body: "text-sm sm:text-base md:text-lg leading-relaxed",

  /* Lead / intro paragraph */
  lead: "text-base sm:text-lg md:text-xl leading-relaxed font-medium text-gray-700",

  /* Muted / small text */
  small: "text-xs sm:text-sm md:text-sm leading-snug text-gray-500",

  /* Uppercase utility for labels */
  label:
    "text-xs sm:text-sm tracking-widest uppercase font-medium text-gray-600",

  /* Fluid / clamp example (arbitrary values) */
  fluidHeadline:
    "text-[clamp(1.25rem,4vw,3rem)] sm:text-[clamp(1.5rem,3.6vw,3.5rem)] font-bold leading-tight",

  /* Inline emphasis */
  strong: "font-semibold",
} as const;

export type Variant = keyof typeof typography;

/** simple className merge utility (uses clsx) */
export const cx = (...args: any[]) => clsx(...args);

/** Generic Text component that maps `variant` -> className */
export const Text: React.FC<
  React.PropsWithChildren<{
    variant?: Variant;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    id?: string;
  }>
> = ({ variant = "body", as = "p", className, children, ...rest }) => {
  const Component = as as any;
  return (
    <Component className={cx(typography[variant], className)} {...rest}>
      {children}
    </Component>
  );
};

/** Convenience named components */
export const H1: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
  ...rest
}) => (
  <h1 className={cx(typography.h1, className)} {...(rest as any)}>
    {children}
  </h1>
);

export const H2: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
  ...rest
}) => (
  <h2 className={cx(typography.h2, className)} {...(rest as any)}>
    {children}
  </h2>
);

export const H3: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
  ...rest
}) => (
  <h3 className={cx(typography.h3, className)} {...(rest as any)}>
    {children}
  </h3>
);

export const Lead: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className, ...rest }) => (
  <p className={cx(typography.lead, className)} {...(rest as any)}>
    {children}
  </p>
);

export const Small: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className, ...rest }) => (
  <small className={cx(typography.small, className)} {...(rest as any)}>
    {children}
  </small>
);

/** Default export (optional) */
const Typography = {
  typography,
  Text,
  H1,
  H2,
  H3,
  Lead,
  Small,
  cx,
};

export default Typography;
