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
  const handleDownload = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(href);

      if (!response.ok) {
        window.location.href = href;
        return;
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch {
      window.location.href = href;
    }
  };

  if (asButton) {
    return (
      <Button href={href} download={fileName} onClick={handleDownload} {...button}>
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
