"use client";

import { useState } from "react";

import { Button, IconButton, Row, Text } from "@once-ui-system/core";

type FooterContactProps = {
  email: string;
  compact?: boolean;
};

export function FooterContact({ email, compact = false }: FooterContactProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch {
      setIsCopied(false);
    }
  };

  if (compact) {
    return isRevealed ? (
      <IconButton
        size="l"
        href={`mailto:${email}`}
        icon="email"
        variant="secondary"
        tooltip={email}
      />
    ) : (
      <IconButton
        size="l"
        icon="email"
        variant="secondary"
        tooltip="Contact"
        onClick={handleReveal}
      />
    );
  }

  return (
    <Row gap="8" vertical="center" wrap>
      {!isRevealed ? (
        <Button size="s" variant="secondary" prefixIcon="email" onClick={handleReveal}>
          Contact
        </Button>
      ) : (
        <>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {email}
          </Text>
          <Button size="s" variant="secondary" href={`mailto:${email}`}>
            Email Me
          </Button>
          <Button size="s" variant="tertiary" onClick={handleCopy}>
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </>
      )}
    </Row>
  );
}
