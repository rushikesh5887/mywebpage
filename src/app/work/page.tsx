import { teaching } from "@/app/teaching/content";
import { DownloadLink } from "@/components";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { generateSeoMetadata } from "@/utils/seo";
import { Button, Column, Flex, Heading, Row, Schema, Text } from "@once-ui-system/core";
import styles from "./page.module.css";

const workSignals = [
  {
    label: "Problem",
    detail: "What challenge the project addressed and why it was worth solving.",
  },
  {
    label: "Method",
    detail: "How I approached the modeling, automation, or analytical workflow.",
  },
  {
    label: "Scale",
    detail: "The size, complexity, or real-world context involved in the work.",
  },
  {
    label: "Outcome",
    detail: "What improved, what was produced, or what was validated.",
  },
  {
    label: "Tools",
    detail: "The stack used across the workflow, not just a list of software names.",
  },
  {
    label: "Why it mattered",
    detail: "Why the result was useful for research, policy, operations, or practice.",
  },
];

export async function generateMetadata() {
  return generateSeoMetadata({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: "/images/og/rushikesh-home.jpg",
    path: work.path,
    keywords: [
      "Rushikesh Amrutsamanvar projects",
      "traffic trajectory extraction",
      "mobility machine learning",
      "geospatial data pipelines",
    ],
  });
}

export default function Work() {
  const cvLink = withBasePath("/documents/cv.pdf");
  const recruiterQuickViewLink = withBasePath("/documents/recruiter-quick-view.txt");

  return (
    <Column maxWidth="m" paddingTop="24" gap="40">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image="/images/og/rushikesh-home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="20" horizontal="center" align="center">
        <Text variant="label-strong-m" onBackground="brand-weak">
          Selected Work
        </Text>
        <Heading variant="display-strong-m" align="center">
          Case studies that show how I turn complex data into usable analytical systems.
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "52rem" }}
        >
          This page shows how I work in practice. Each project summarizes a real-world problem, the workflow I built to solve it, the tools I used, the scale of the data, the outcome of the work, and why it mattered. These are evidence of how I scope problems, build workflows, handle messy data, and deliver outputs that others can trust and use.
        </Text>
        <Row gap="12" wrap horizontal="center">
          <DownloadLink
            href={cvLink}
            fileName="cv.pdf"
            asButton
            button={{ variant: "secondary", prefixIcon: "download" }}
          >
            Download CV
          </DownloadLink>
          <DownloadLink
            href={recruiterQuickViewLink}
            fileName="recruiter-quick-view.txt"
            asButton
            button={{ variant: "secondary", prefixIcon: "document" }}
          >
            Recruiter Quick View
          </DownloadLink>
          <Button href={teaching.path} variant="secondary" prefixIcon="book">
            Teaching & Mentoring
          </Button>
        </Row>
      </Column>

      <section className={styles.lookForSection}>
        <Column className={styles.lookForIntro} gap="12">
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            What To Look For
          </Text>
          <Heading as="h2" variant="heading-strong-l" className={styles.heading}>
            These are not just project summaries.
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            They are evidence of how I scope problems, build workflows, handle messy data, and
            deliver outputs that others can trust and use.
          </Text>
        </Column>
        <div className={styles.signalGrid}>
          {workSignals.map((signal) => (
            <article key={signal.label} className={styles.signalCard}>
              <Text
                variant="label-strong-s"
                onBackground="brand-weak"
                className={styles.signalLabel}
              >
                {signal.label}
              </Text>
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
                className={styles.signalDetail}
              >
                {signal.detail}
              </Text>
            </article>
          ))}
        </div>
      </section>

      <Projects />

      <section className={styles.contactSection}>
        <Column gap="12" className={styles.contactIntro}>
          <Text variant="label-strong-s" onBackground="brand-weak" className={styles.eyebrow}>
            Open to Opportunities
          </Text>
          <Heading as="h2" variant="heading-strong-l">
            Interested in working together?
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.introText}>
            I am open to data science, geospatial analytics, and mobility-focused roles, along
            with selected research and consulting collaborations.
          </Text>
        </Column>
        <Row gap="12" wrap>
          <Button href={`mailto:${person.email}`} variant="primary" prefixIcon="email">
            Contact Me
          </Button>
          <DownloadLink
            href={cvLink}
            fileName="cv.pdf"
            asButton
            button={{ variant: "secondary", prefixIcon: "download" }}
          >
            Download CV
          </DownloadLink>
          <DownloadLink
            href={recruiterQuickViewLink}
            fileName="recruiter-quick-view.txt"
            asButton
            button={{ variant: "secondary", prefixIcon: "document" }}
          >
            Recruiter Quick View
          </DownloadLink>
          <Button href="/about" variant="secondary" prefixIcon="person">
            More About Me
          </Button>
        </Row>
      </section>
    </Column>
  );
}
