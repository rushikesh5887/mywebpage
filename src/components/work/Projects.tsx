import { ProjectCard } from "@/components";
import { person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";

const preferredProjectOrder = [
  "Carbon_Modeling",
  "Lateral_movement_decisions",
  "Extraction_and_analysis_of_microscopic_traffic_data",
  "Staggered_following",
] as const;

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"], { includeContent: false });

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    const aPriority = preferredProjectOrder.indexOf(
      a.slug as (typeof preferredProjectOrder)[number],
    );
    const bPriority = preferredProjectOrder.indexOf(
      b.slug as (typeof preferredProjectOrder)[number],
    );

    if (aPriority !== -1 || bPriority !== -1) {
      if (aPriority === -1) return 1;
      if (bPriority === -1) return -1;
      return aPriority - bPriority;
    }

    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          avatars={
            post.metadata.team
              ?.map((member) => ({
                src:
                  member.avatar ||
                  (member.name === person.name || member.name.includes(person.firstName)
                    ? person.avatar
                    : ""),
              }))
              .filter((member) => member.src) || []
          }
          link={post.metadata.link || ""}
          domain={post.metadata.domain}
          focus={post.metadata.focus}
          scale={post.metadata.scale}
          techStack={post.metadata.techStack || []}
        />
      ))}
    </Column>
  );
}
