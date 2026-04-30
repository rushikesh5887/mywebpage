import { Text } from "@once-ui-system/core";

import { person } from "@/resources";
import type { BasePageConfig } from "@/types";

type TeachingSection = {
  title: string;
  intro?: React.ReactNode;
  items: Array<{
    title: string;
    description: React.ReactNode;
    tags?: string[];
  }>;
};

type TeachingMaterial = {
  slug: string;
  title: string;
  description: React.ReactNode;
  href: string;
  tags?: string[];
};

type TeachingPage = BasePageConfig & {
  intro: React.ReactNode;
  materialsIntro?: React.ReactNode;
  materials: TeachingMaterial[];
  sections: TeachingSection[];
};

const teaching: TeachingPage = {
  path: "/teaching",
  label: "Teaching",
  title: `Teaching - ${person.name}`,
  description: `Teaching, mentoring, and technical enablement work by ${person.name}`,
  intro: (
    <>
      Teaching is part of my current role, but I present it here as evidence of something broader:
      the ability to turn technical material into structured, usable learning for people with
      different backgrounds. In industry, that translates directly into onboarding, stakeholder
      communication, mentoring, internal enablement, and building trust around data work.
    </>
  ),
  materialsIntro: (
    <>
      A small selection of real teaching assets that show how I structure explanations, practical
      exercises, and student-facing reference material across quantitative and data-focused
      courses.
    </>
  ),
  materials: [
    {
      slug: "statistics-slides",
      title: "Statistics Slide Deck",
      description: (
        <>
          Lecture material for applied statistics, designed to make probability, sampling, and
          inference easier to connect to business-facing decision making.
        </>
      ),
      href: `mailto:${person.email}?subject=Teaching%20materials%20request`,
      tags: ["PDF", "Statistics", "Applied Quant"],
    },
    {
      slug: "sql-data-management-slides",
      title: "SQL And Data Management Slides",
      description: (
        <>
          Student-facing slides that introduce database concepts, relational thinking, and the
          foundations needed before hands-on SQL work.
        </>
      ),
      href: `mailto:${person.email}?subject=Teaching%20materials%20request`,
      tags: ["PDF", "SQL", "Database Concepts"],
    },
    {
      slug: "sql-practice-tutorial",
      title: "SQL Practice Tutorial",
      description: (
        <>
          A guided exercise set built for practice and reinforcement, helping students move from
          explanation to actual query-writing.
        </>
      ),
      href: `mailto:${person.email}?subject=Teaching%20materials%20request`,
      tags: ["PDF", "Exercises", "Hands-On Practice"],
    },
    {
      slug: "linear-algebra-slides",
      title: "Linear Algebra And Numerical Mathematics Slides",
      description: (
        <>
          Course slides built to make abstract mathematical ideas more approachable through worked
          examples, visual structure, and computational context.
        </>
      ),
      href: `mailto:${person.email}?subject=Teaching%20materials%20request`,
      tags: ["PDF", "Linear Algebra", "Numerical Methods"],
    },
  ],
  sections: [
    {
      title: "Current Focus",
      items: [
        {
          title: "Lecturer, International School of Management Hamburg",
          description: (
            <>
              I currently teach applied quantitative subjects for business and data-oriented
              cohorts, designing classes that balance conceptual clarity with hands-on work and
              practical interpretation.
            </>
          ),
          tags: ["Since 2025", "Teaching", "Curriculum Design"],
        },
      ],
    },
    {
      title: "How I Teach",
      items: [
        {
          title: "Concepts Through Real Tasks",
          description: (
            <>
              I structure lessons around the kinds of questions analysts and decision-makers
              actually face: what the data means, how much uncertainty matters, what a model can or
              cannot support, and how to explain results clearly.
            </>
          ),
          tags: ["Interpretation", "Decision Support", "Communication"],
        },
        {
          title: "Practical Learning Assets",
          description: (
            <>
              My teaching workflow goes beyond lectures. It includes examples, assignments, code,
              grading structures, and course notes that help students practice independently and
              revisit difficult ideas later.
            </>
          ),
          tags: ["Assignments", "Slides", "Code Examples"],
        },
        {
          title: "Mixed Technical Backgrounds",
          description: (
            <>
              I often teach students with different levels of mathematical and coding confidence, so
              I design material that remains rigorous while still being approachable for newer
              learners.
            </>
          ),
          tags: ["Scaffolding", "Mentoring", "Classroom Facilitation"],
        },
      ],
    },
    {
      title: "Why This Matters In Industry",
      items: [
        {
          title: "Enablement Is A Delivery Skill",
          description: (
            <>
              Teams do better when technical work can be explained, adopted, and used by others.
              Teaching strengthens the same capabilities needed for stakeholder alignment, internal
              training, mentoring, and cross-functional collaboration.
            </>
          ),
          tags: ["Stakeholder Communication", "Mentoring", "Adoption"],
        },
        {
          title: "Teaching Clarifies Thinking",
          description: (
            <>
              Explaining models, data quality, assumptions, and limitations in a classroom setting
              reinforces the discipline required to communicate analytical work responsibly in
              professional environments.
            </>
          ),
          tags: ["Analytical Clarity", "Model Communication", "Trust"],
        },
      ],
    },
    {
      title: "Courses And Materials",
      intro: (
        <>
          The material behind these courses includes slides, assignments, code examples, grading
          workflows, and classroom exercises developed or adapted for real teaching delivery.
        </>
      ),
      items: [
        {
          title: "Statistics",
          description: (
            <>
              Taught business-focused statistics with emphasis on probability, sampling, inference,
              interpretation, and data-driven decision making for students who need usable
              analytical thinking, not just theory.
            </>
          ),
          tags: ["Probability", "Inference", "Business Context"],
        },
        {
          title: "Machine Learning & Artificial Intelligence Techniques",
          description: (
            <>
              Built classes around the machine-learning pipeline, model intuition, evaluation, and
              practical examples so students can connect AI concepts to real analytical workflows.
            </>
          ),
          tags: ["ML Pipeline", "Model Evaluation", "Applied AI"],
        },
        {
          title: "SQL And Data Handling Support",
          description: (
            <>
              Prepared and used structured SQL learning materials, exercises, and reference code to
              help students move from database basics to query logic and practical data operations.
            </>
          ),
          tags: ["SQL", "Query Logic", "Hands-On Practice"],
        },
        {
          title: "Linear Algebra And Quantitative Foundations",
          description: (
            <>
              Developed and adapted supporting materials that make abstract mathematical ideas more
              approachable through visual explanation, worked examples, and computational context.
            </>
          ),
          tags: ["Linear Algebra", "Numerical Thinking", "Visual Explanation"],
        },
      ],
    },
  ],
};

export { teaching };
export type { TeachingMaterial, TeachingPage, TeachingSection };
