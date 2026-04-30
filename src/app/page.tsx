import Image from "next/image";
import Link from "next/link";

import { Column, IconButton, Meta, RevealFx, Schema } from "@once-ui-system/core";

import { FooterContact } from "@/components";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, home, person, social } from "@/resources";

import styles from "./page.module.css";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

const socialLinks = social.filter((item) => item.essential && item.name !== "Email");
const resumeLink = "/documents/cv.pdf";
const heroHeadline = "Applied data scientist for mobility, urban systems, and decision-ready analytics.";

const impactMetrics = [
  {
    value: "45",
    label: "Cities benchmarked",
    detail: "Comparative emissions modeling across diverse urban contexts.",
  },
  {
    value: "10M+",
    label: "Spatial records handled",
    detail: "Large-scale geospatial engineering and analytics workflows.",
  },
  {
    value: "40%",
    label: "Workflow efficiency gain",
    detail: "Automation across Python and R workflows that reduced manual effort.",
  },
  {
    value: "4.8/5",
    label: "Teaching feedback",
    detail: "Clear communication and technical mentoring alongside analytical delivery.",
  },
];

const focusAreas = [
  {
    title: "Build Reliable Analytical Workflows",
    description:
      "I turn raw traffic, travel, and urban data into structured pipelines teams can trust and reuse.",
  },
  {
    title: "Model Spatial and Mobility Systems",
    description:
      "I combine geospatial processing, networks, and city-scale modeling to explain emissions, movement, and operations.",
  },
  {
    title: "Translate Analysis Into Decisions",
    description:
      "I package analysis into dashboards, models, and evidence that planners and operating teams can act on.",
  },
];

const caseStudySignals = [
  "These case studies show how I define the problem, build the workflow, and deliver a usable result.",
  "The strongest examples combine geospatial engineering, modeling, and decision support.",
  "Together they show applied industry value, not only research depth.",
];

const experienceHighlights = about.work.experiences.slice(0, 3).map((experience) => ({
  company: experience.company,
  timeframe: experience.timeframe,
  role: experience.role,
}));

export default function Home() {
  return (
    <Column className={styles.page}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <RevealFx translateY={4}>
        <section className={styles.heroSection}>
          <div className={styles.heroBackdrop} />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                Applied Data Scientist | Geospatial Analytics | Mobility Systems
              </p>
              <h1 className={styles.heroTitle}>{heroHeadline}</h1>
              <p className={styles.heroText}>
                I build data pipelines, predictive models, and geospatial workflows that help teams
                turn complex real-world data into decisions they can use with confidence.
              </p>

              <div className={styles.heroActions}>
                <Link href="/work" className={`${styles.primaryButton} ${styles.workButton}`}>
                  View Selected Work
                </Link>
                <a
                  href={resumeLink}
                  className={`${styles.secondaryButton} ${styles.cvButton}`}
                  download
                >
                  Download CV
                </a>
              </div>

              <div className={styles.impactPanel}>
                <div className={styles.impactHeader}>
                  <p className={styles.cardKicker}>Selected Impact</p>
                  <span>Fast proof of scale, delivery, and communication range.</span>
                </div>
                <div className={styles.impactGrid}>
                  {impactMetrics.map((item) => (
                    <article key={item.label} className={styles.impactCard}>
                      <strong>{item.value}</strong>
                      <h3>{item.label}</h3>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.profilePanel}>
              <div className={styles.profileCard}>
                <div className={styles.imageWrap}>
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 34vw"
                    className={styles.profileImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.profileBody}>
                  <p className={styles.profileLabel}>Based in {person.location}</p>
                  <h2>{person.name}</h2>
                  <p className={styles.profileSummary}>
                    Applied data scientist focused on mobility, geospatial analytics, and urban
                    systems with experience spanning delivery, research, and teaching.
                  </p>
                  <div className={styles.profileContactRow}>
                    {socialLinks.map((item) => (
                      <IconButton
                        key={item.name}
                        href={item.link}
                        icon={item.icon}
                        variant="secondary"
                        size="l"
                        tooltip={item.name}
                      />
                    ))}
                    <div className={styles.contactRevealWrap}>
                      <FooterContact email={person.email} compact />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.storyCard}>
                <p className={styles.cardKicker}>Toolkit Snapshot</p>
                <div className={styles.skillCloud}>
                  {person.hardSkills?.slice(0, 10).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <article className={styles.timelineCard}>
                <p className={styles.cardKicker}>Experience at a Glance</p>
                <h2>Recent Experience</h2>
                <div className={styles.timelineList}>
                  {experienceHighlights.map((item) => (
                    <div key={`${item.company}-${item.timeframe}`} className={styles.timelineItem}>
                      <span>{item.timeframe}</span>
                      <h3>{item.role}</h3>
                      <p>{item.company}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </RevealFx>

      <RevealFx translateY={8} delay={0.2}>
        <section className={styles.section}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>What I Bring</p>
            <h2>Technical depth focused on useful outcomes.</h2>
            <p>
              I work best where data is messy, context matters, and the output needs to be both
              rigorous and practical.
            </p>
          </div>

          <div className={styles.capabilityGrid}>
            {focusAreas.map((item) => (
              <article key={item.title} className={styles.capabilityCard}>
                <p className={styles.cardKicker}>Focus Area</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </RevealFx>

      <RevealFx translateY={12} delay={0.25}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Applied Work Highlights</p>
              <h2>Projects that show how I turn complex data into usable decisions.</h2>
              <div className={styles.caseStudyList}>
                {caseStudySignals.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <Link href="/work" className={styles.inlineLink}>
              Review all case studies
            </Link>
          </div>
          <Projects range={[1, 3]} />
        </section>
      </RevealFx>
    </Column>
  );
}
