"use client";

import type { ComponentProps, ReactNode } from "react";

import { Button } from "@once-ui-system/core";

type ButtonStyleProps = Pick<
  ComponentProps<typeof Button>,
  "variant" | "prefixIcon" | "suffixIcon" | "size" | "fillWidth" | "className"
>;

type DownloadLinkProps = {
  href: string;
  fileName: string;
  children: ReactNode;
  className?: string;
  asButton?: boolean;
  button?: ButtonStyleProps;
};

export function DownloadLink({
  href,
  fileName,
  children,
  className,
  asButton = false,
  button,
}: DownloadLinkProps) {
  const buttonClassName = [button?.className, className].filter(Boolean).join(" ") || undefined;

  if (asButton) {
    return (
      <Button href={href} download={fileName} {...button} className={buttonClassName}>
        {children}
      </Button>
    );
  }

  return (
    <a href={href} download={fileName} className={className}>
      {children}
    </a>
  );
}
