"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Button,
  Column,
  DropdownWrapper,
  Fade,
  Flex,
  Line,
  Row,
  ToggleButton,
} from "@once-ui-system/core";

import { publications } from "@/app/publications/content";
import { teaching } from "@/app/teaching/content";
import { about, display, gallery, person, routes, travel, work } from "@/resources";
import styles from "./Header.module.scss";
import { ThemeToggle } from "./ThemeToggle";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const isMoreRoute =
    pathname.startsWith("/teaching") || pathname.startsWith("/gallery") || pathname.startsWith("/travel");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/publications"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="document"
                      href="/publications"
                      label={publications.label}
                      selected={pathname.startsWith("/publications")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="document"
                      href="/publications"
                      selected={pathname.startsWith("/publications")}
                    />
                  </Row>
                </>
              )}
              {(routes["/teaching"] || routes["/gallery"] || routes["/travel"]) && (
                <DropdownWrapper
                  isOpen={isMoreOpen}
                  onOpenChange={setIsMoreOpen}
                  closeAfterClick
                  placement="bottom-end"
                  className={styles.moreDropdown}
                  trigger={
                    <ToggleButton
                      prefixIcon="globe"
                      label="More"
                      selected={isMoreRoute || isMoreOpen}
                      className={styles.moreTrigger}
                      aria-expanded={isMoreOpen}
                      aria-haspopup="menu"
                    />
                  }
                  dropdown={
                    <Column className={styles.moreMenu} padding="4" gap="4">
                      {routes["/teaching"] && (
                        <Button
                          variant={pathname.startsWith("/teaching") ? "primary" : "secondary"}
                          size="s"
                          prefixIcon="book"
                          href="/teaching"
                          fillWidth
                          horizontal="start"
                        >
                          {teaching.label}
                        </Button>
                      )}
                      {routes["/travel"] && (
                        <Button
                          variant={pathname.startsWith("/travel") ? "primary" : "secondary"}
                          size="s"
                          prefixIcon="globe"
                          href="/travel"
                          fillWidth
                          horizontal="start"
                        >
                          {travel.label}
                        </Button>
                      )}
                      {routes["/gallery"] && (
                        <Button
                          variant={pathname.startsWith("/gallery") ? "primary" : "secondary"}
                          size="s"
                          prefixIcon="gallery"
                          href="/gallery"
                          fillWidth
                          horizontal="start"
                        >
                          {gallery.label}
                        </Button>
                      )}
                    </Column>
                  }
                />
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
