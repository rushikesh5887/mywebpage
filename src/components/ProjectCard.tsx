"use client";

import Image from "next/image";
import { useState } from "react";

import { ProjectBadgeStrip } from "@/components/ProjectBadgeStrip";
import { withBasePath } from "@/utils/paths";
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  IconButton,
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
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
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
  const imageCount = carouselItems.length;
  const zoomedImage = zoomedImageIndex !== null ? carouselItems[zoomedImageIndex] : null;
  const canBrowseZoomedImages = imageCount > 1;

  const showPreviousImage = () => {
    setZoomedImageIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex - 1 + imageCount) % imageCount,
    );
  };

  const showNextImage = () => {
    setZoomedImageIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex + 1) % imageCount,
    );
  };

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
        <div className={styles.figureFrame}>
          <Carousel sizes="(max-width: 960px) 100vw, 960px" items={carouselItems} />
          {imageCount > 0 && (
            <IconButton
              type="button"
              icon="zoomIn"
              variant="secondary"
              size="m"
              tooltip="Zoom image"
              className={styles.zoomTrigger}
              aria-label={`Zoom image for ${title}`}
              onClick={() => setZoomedImageIndex(0)}
            />
          )}
        </div>
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

      {zoomedImage && (
        <dialog
          className={styles.zoomLightbox}
          aria-label={`${title} image preview`}
          onCancel={(event) => {
            event.preventDefault();
            setZoomedImageIndex(null);
          }}
          open
        >
          <button
            type="button"
            className={styles.zoomBackdrop}
            aria-label="Close image preview"
            onClick={() => setZoomedImageIndex(null)}
          />
          <div className={styles.zoomPanel}>
            <IconButton
              type="button"
              icon="close"
              variant="secondary"
              size="m"
              tooltip="Close"
              className={`${styles.zoomControl} ${styles.zoomClose}`}
              aria-label="Close image preview"
              onClick={() => setZoomedImageIndex(null)}
            />
            {canBrowseZoomedImages && (
              <IconButton
                type="button"
                icon="chevronLeft"
                variant="secondary"
                size="m"
                tooltip="Previous image"
                className={`${styles.zoomControl} ${styles.zoomPrevious}`}
                aria-label="Previous project image"
                onClick={showPreviousImage}
              />
            )}
            <div className={styles.zoomImageWrap}>
              <Image
                src={zoomedImage.slide}
                alt={zoomedImage.alt}
                fill
                sizes="100vw"
                className={styles.zoomImage}
              />
            </div>
            {canBrowseZoomedImages && (
              <IconButton
                type="button"
                icon="chevronRight"
                variant="secondary"
                size="m"
                tooltip="Next image"
                className={`${styles.zoomControl} ${styles.zoomNext}`}
                aria-label="Next project image"
                onClick={showNextImage}
              />
            )}
            <div className={styles.zoomCaption}>
              <strong>{title}</strong>
              {canBrowseZoomedImages && (
                <span>
                  {(zoomedImageIndex ?? 0) + 1} / {imageCount}
                </span>
              )}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
