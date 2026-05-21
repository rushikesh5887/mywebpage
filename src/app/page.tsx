import Image from "next/image";
import Link from "next/link";

import { Column, IconButton, Meta, RevealFx, Schema } from "@once-ui-system/core";

import { FooterContact } from "@/components";
import { VisitorLocationMap } from "@/components/VisitorLocationMap";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, home, person, social } from "@/resources";
import { withBasePath } from "@/utils/paths";

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
const resumeLink = withBasePath("/documents/cv.pdf");
const recruiterQuickViewLink = withBasePath("/documents/recruiter-quick-view.txt");
const heroHeadline =
  "Data scientist building geospatial, mobility, and urban analytics for planning and operations.";

const impactMetrics = [
  {
    value: "45",
    label: "Cities compared",
    detail: "Urban emissions and mobility benchmarking across global city contexts.",
  },
  {
    value: "10M+",
    label: "Spatial records processed",
    detail: "Large-scale geospatial engineering, cleaning, and analysis workflows.",
  },
  {
    value: "40%",
    label: "Workflow time reduced",
    detail: "Python and R automation that cut repeated manual analysis work.",
  },
  {
    value: "3",
    label: "Role tracks covered",
    detail: "Delivery, research, and teaching experience brought into one applied profile.",
  },
];

const focusAreas = [
  {
    title: "Build Reliable Analytical Workflows",
    description:
      "I turn messy traffic, travel, and urban data into structured workflows that teams can trust, repeat, and extend.",
  },
  {
    title: "Model Spatial and Mobility Systems",
    description:
      "I combine geospatial processing, transport data, and city-scale modeling to explain emissions, movement, and operations.",
  },
  {
    title: "Translate Analysis Into Decisions",
    description:
      "I package results into models, dashboards, and evidence that planners, operators, and analysts can act on.",
  },
];

const roleFit = [
  "Data Scientist (Mobility and Urban Analytics)",
  "Geospatial Data Scientist / Geospatial Analyst",
  "Applied Research Data Scientist",
];

const caseStudySignals = [
  "Each project shows the problem, workflow, and decision value.",
  "Core strengths: geospatial engineering, modeling, and automation.",
  "Built to match data science and mobility analytics roles.",
];

const experienceHighlights = about.work.experiences.slice(0, 3).map((experience) => ({
  company: experience.company,
  timeframe: experience.timeframe,
  role: experience.role,
}));

const testimonials = [
  {
    quote:
      "Rushikesh contributed significantly to rapid traffic-network planning research, including carbon-emission analytics, and demonstrated strong modeling depth, emerging-method adoption, and steady professional growth.",
    name: "Prof. Dr. S. Travis Waller",
    role: "Chair of Transport Modelling and Simulation, TU Dresden",
    linkedIn: "https://tu-dresden.de/bu/verkehr/ivs/tms/die-professur/inhaber-in",
  },
  {
    quote:
      "Rushikesh quickly built the knowledge needed for city-scale sustainability and carbon-sensitivity research, took ownership of topics, and brought clarity to the next steps.",
    name: "Sai Chand, Ph.D.",
    role: "Assistant Professor, TRIPC, IIT Delhi",
    linkedIn: "https://tripc.iitd.ac.in/people/faculty",
  },
];

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
                Data Scientist | Geospatial Analytics | Mobility and Urban Systems
              </p>
              <h1 className={styles.heroTitle}>{heroHeadline}</h1>
              <p className={styles.heroText}>
                I turn complex spatial, transport, and urban data into reliable models, scalable
                workflows, and decision-ready outputs.
              </p>
              <div className={styles.roleFitPanel}>
                <p className={styles.cardKicker}>Role Fit</p>
                <div className={styles.roleFitChips}>
                  {roleFit.map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </div>
                <p className={styles.roleFitMeta}>
                  Open to roles in Germany and Europe (remote/hybrid/onsite).
                </p>
              </div>

              <div className={styles.heroActions}>
                <Link href="/work" className={`${styles.primaryButton} ${styles.workButton}`}>
                  View Selected Work
                </Link>
                <a
                  href={`mailto:${person.email}`}
                  className={`${styles.secondaryButton} ${styles.cvButton}`}
                >
                  Contact Me
                </a>
                <a
                  href={resumeLink}
                  className={`${styles.secondaryButton} ${styles.cvButton}`}
                  download
                >
                  Download CV
                </a>
                <a
                  href={recruiterQuickViewLink}
                  className={`${styles.secondaryButton} ${styles.cvButton}`}
                  download
                >
                  Recruiter Quick View
                </a>
              </div>

              <div className={styles.impactPanel}>
                <div className={styles.impactHeader}>
                  <p className={styles.cardKicker}>Selected Impact</p>
                  <span>Quick evidence of scale, applied delivery, and recruiter role fit.</span>
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
                    src={withBasePath(person.avatar)}
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
                    Applied data scientist with experience across industry delivery, research, and
                    teaching, focused on geospatial analytics, mobility systems, and urban data.
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
            <h2>Technical depth that stays tied to practical outcomes.</h2>
            <p>
              I do my best work where data is messy, context matters, and outputs must be both
              rigorous and usable.
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
              <h2>Projects that show how I turn complex data into usable analytical products.</h2>
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
          <Projects />
        </section>
      </RevealFx>

      <RevealFx translateY={12} delay={0.3}>
        <section className={`${styles.section} ${styles.visitorMapSection}`}>
          <VisitorLocationMap />
        </section>
      </RevealFx>

      <RevealFx translateY={12} delay={0.32}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Testimonials</p>
              <h2>What collaborators say</h2>
            </div>
          </div>
          <div className={styles.testimonialMarquee} aria-label="Rolling testimonials">
            <div className={styles.testimonialTrack}>
              {[...testimonials, ...testimonials].map((item, index) => (
                <article key={`${item.name}-${index}`} className={styles.testimonialCard}>
                  <p>{item.quote}</p>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                  <a
                    href={item.linkedIn}
                    className={styles.testimonialLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Profile
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </RevealFx>

      <RevealFx translateY={12} delay={0.35}>
        <section className={styles.section}>
          <article className={styles.ctaCard}>
            <p className={styles.cardKicker}>Open to Opportunities</p>
            <h2>Let&apos;s build useful data products for mobility and urban systems.</h2>
            <p>
              I am open to Data Scientist, Geospatial Analytics, and Mobility Analytics roles where
              I can combine rigorous modeling, practical delivery, and real-world decision impact.
            </p>
            <div className={styles.heroActions}>
              <a
                href={`mailto:${person.email}`}
                className={`${styles.primaryButton} ${styles.workButton}`}
              >
                Contact Me
              </a>
              <Link href="/about" className={`${styles.secondaryButton} ${styles.cvButton}`}>
                More About Me
              </Link>
            </div>
            <div className={styles.ctaList}>
              <span>Full-time roles</span>
              <span>Research collaborations</span>
              <span>Consulting projects</span>
            </div>
          </article>
        </section>
      </RevealFx>
    </Column>
  );
}
