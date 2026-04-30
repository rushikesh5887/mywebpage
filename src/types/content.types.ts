import type { IconName } from "@/resources/icons";
import type { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Languages spoken */
  languages?: string[];
  /** Hard skills to highlight in the profile column */
  hardSkills?: string[];
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: React.ReactNode;
  /** Description of the newsletter */
  description: React.ReactNode;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Core strengths section shown in the profile sidebar */
  strengths: {
    /** Whether to display the strengths section */
    display: boolean;
    /** Title for the strengths section */
    title: string;
    /** Bullet items to highlight */
    items: string[];
  };
  /** Toolkit section */
  toolkit: {
    /** Whether to display the toolkit section */
    display: boolean;
    /** Title for the toolkit section */
    title: string;
    /** Bullet items to highlight */
    items: string[];
  };
  /** Optional professional references note */
  references?: {
    /** Whether to display the references note */
    display: boolean;
    /** Short note shown near contact actions */
    note: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Awards and recognition section */
  awards?: {
    /** Whether to display awards section */
    display: boolean;
    /** Title for the awards section */
    title: string;
    /** List of awards */
    items: Array<{
      /** Award title */
      title: string;
      /** Supporting details */
      details: React.ReactNode[];
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Coordination and partnership experience section */
  coordination?: {
    /** Whether to display the section */
    display: boolean;
    /** Title for the section */
    title: string;
    /** List of coordination and partnership entries */
    items: Array<{
      /** Entry title */
      title: string;
      /** Optional timeframe */
      timeframe?: string;
      /** Description bullets */
      points: React.ReactNode[];
    }>;
  };
}

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {}

/**
 * Publications page configuration.
 * @description Configuration for the Publications page, including grouped publication entries.
 */
export interface Publications extends BasePageConfig {
  /** Introductory text shown above the publication list */
  intro: React.ReactNode;
  /** Publication sections */
  sections: Array<{
    /** Section title */
    title: string;
    /** Publication entries in the section */
    items: Array<{
      /** Publication authors */
      authors: string;
      /** Publication title */
      title: string;
      /** Journal, conference, or publisher */
      venue: string;
      /** Publication details such as volume, pages, and year */
      details: string;
      /** Optional collaborating institutions for this publication */
      institutions?: string[];
      /** Optional external article link */
      href?: string;
      /** Optional PDF link */
      pdf?: string;
    }>;
  }>;
}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}

/**
 * Travel page configuration.
 * @description Configuration for the Travel page, including metadata and navigation label.
 */
export interface Travel extends BasePageConfig {}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
  }>;
}
