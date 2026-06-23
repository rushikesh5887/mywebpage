"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";

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

  const handleDownload = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const link = document.createElement("a");

    link.href = new URL(href, window.location.href).href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (asButton) {
    return (
      <Button type="button" onClick={handleDownload} {...button} className={buttonClassName}>
        {children}
      </Button>
    );
  }

  return (
    <a href={href} download={fileName} className={className} onClick={handleDownload}>
      {children}
    </a>
  );
}
