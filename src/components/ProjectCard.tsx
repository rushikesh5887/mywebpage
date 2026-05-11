"use client";

import { ProjectBadgeStrip } from "@/components/ProjectBadgeStrip";
import { withBasePath } from "@/utils/paths";
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";

import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  domain?: string;
  focus?: string;
  scale?: string;
  techStack?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  avatars,
  link,
  domain,
  focus,
  scale,
  techStack,
}) => {
  const hasSummary = description?.trim().length > 0;
  const hasBadges = Boolean(domain || focus || scale || techStack?.length);
  const carouselItems = images.map((image) => ({
    slide: withBasePath(image),
    alt: title,
  }));
  const avatarItems = avatars?.map((avatar) => ({
    ...avatar,
    src: withBasePath(avatar.src),
  }));

  return (
    <div className={styles.projectCard}>
      <div className={styles.titleColumn}>
        {title && (
          <Column flex={5} gap="8" className={styles.titleBlock}>
            <SmartLink
              href={href}
              className={styles.titleLink}
              style={{ margin: "0", width: "fit-content", textDecoration: "none" }}
            >
              <Heading
                as="h2"
                wrap="balance"
                variant="heading-strong-xl"
                className={styles.titleHeading}
              >
                {title}
              </Heading>
            </SmartLink>
          </Column>
        )}
      </div>

      <div className={styles.figureColumn}>
        <Carousel sizes="(max-width: 960px) 100vw, 960px" items={carouselItems} />
      </div>

      {(avatarItems?.length > 0 || hasSummary || hasBadges || link) && (
        <Column gap="16" className={styles.infoColumn}>
          {avatarItems?.length > 0 && <AvatarGroup avatars={avatarItems} size="m" reverse />}
          {hasSummary && (
            <Column gap="8">
              <Text variant="label-strong-s" onBackground="brand-weak">
                Problem and Outcome
              </Text>
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            </Column>
          )}
          {hasBadges && (
            <Column gap="8">
              <Text variant="label-strong-s" onBackground="brand-weak">
                Method, Scale, and Tools
              </Text>
              <ProjectBadgeStrip
                domain={domain}
                focus={focus}
                scale={scale}
                techStack={techStack}
              />
            </Column>
          )}
          <Flex gap="24" wrap>
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="body-default-s">View publication</Text>
              </SmartLink>
            )}
          </Flex>
        </Column>
      )}
    </div>
  );
};
