import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Travel, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Rushikesh",
  lastName: "Amrutsamanvar",
  name: "Dr. Rushikesh Amrutsamanvar",
  role: "Applied Data Scientist Mobility, Geospatial Analytics, and Urban Systems",
  avatar: "/images/RBD_1.jpg",
  email: "rushikesh.amrut@gmail.com",
  location: "Europe/Berlin",
  languages: ["English [Native]", "German [B2+]", "Marathi [Native]", "Hindi [Native]"],
  hardSkills: [
    "Python",
    "SQL",
    "GeoPandas",
    "Pandas",
    "scikit-learn",
    "MATLAB",
    "R",
    "SPSS",
    "QGIS",
    "VISSIM",
    "Power BI",
    "Git",
    "LaTeX",
  ],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Insights on data science, urban systems, and transportation analytics.</>,
};

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/dr-rushikesh-amrutsamanvar-30849349/",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/rushikesh5887",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/rushikesh-home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>I turn complex mobility data into models, tools, and decisions.</>,
  featured: {
    display: false,
    title: <>Featured work</>,
    href: "/work",
  },
  subline: (
    <>
      Applied data science, geospatial analytics, and quantitative modeling for mobility and urban
      systems. I work from messy raw data through to analysis-ready workflows, predictive models,
      and decision-support outputs.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Germany`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <Text as="p">
          I am an applied data scientist focused on mobility, geospatial analytics, and urban
          systems. My work turns complex real-world data into usable models, workflows, and
          decision-support tools for research, planning, and operations.
        </Text>
        <Text as="p">
          Throughout my career, I have engaged in various interdisciplinary areas, including traffic trajectory extraction, analytics, behavioral modeling, large-scale geospatial analysis, and multi-city emissions benchmarking. In these domains, I focus on developing analytical systems that convert challenging data into reliable evidence that people can understand and act upon.
        </Text>
      </>
    ),
  },
  strengths: {
    display: true,
    title: "Core Competencies",
    items: [
      "Applied Data Science",
      "Urban Analytics",
      "Transportation Systems Modeling",
      "Geospatial Analytics",
      "Data Pipelines and Automation",
      "Machine Learning and Statistical Modeling",
      "Interdisciplinary Research",
    ],
  },
  toolkit: {
    display: true,
    title: "Toolkit",
    items: [
      "Python",
      "SQL",
      "GeoPandas",
      "Pandas",
      "scikit-learn",
      "MATLAB",
      "R",
      "SPSS",
      "QGIS",
      "VISSIM",
      "Power BI",
      "Git",
      "LaTeX",
    ],
  },
  references: {
    display: true,
    note: <>References available on request.</>,
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "International School of Management, Hamburg",
        timeframe: "01/2025 - Present",
        role: "Lecturer",
        achievements: [
          <>
            Designed and taught applied courses in statistics and machine learning for business and
            data-focused student cohorts, with an emphasis on practical reasoning, interpretation,
            and decision-making rather than formula memorization.
          </>,
          <>
            Built and adapted teaching materials, exercises, and examples that connect
            quantitative concepts to real-world datasets, coding workflows, and business-facing
            problem solving.
          </>,
          <>
            Supported curriculum development across adjacent subjects including AI, SQL, and
            quantitative foundations, helping students move from conceptual understanding to
            hands-on analytical work.
          </>,
          <>
            Received strong student feedback, with an average course rating of 4.8/5.
          </>,
        ],
        images: [],
      },
      {
        company: "Technische Universitat Dresden, Germany",
        timeframe: "08/2022 - 08/2024",
        role: "Postdoctoral Research Associate, Chair of Transport Modeling and Simulation",
        achievements: [
          <>
            Built scenario-based carbon-emissions models across 45 global cities to support travel
            demand management and transport investment decisions.
          </>,
          <>
            Processed and integrated complex geospatial datasets with more than 10 million data
            points using Python, GeoPandas, OSMnx, OpenStreetMap, and QGIS.
          </>,
          <>
            Automated end-to-end data processing, visualization, and modeling workflows in Python
            and R, improving analytical efficiency by 40%.
          </>,
          <>
            Developed a comparative emissions database for 45 cities and collaborated with
            interdisciplinary teams on publications and research proposals.
          </>,
          <>
            Coordinated interdisciplinary and multi-institutional research grant proposals, acting
            as the primary point of contact between partner institutions and aligning contributions,
            timelines, and project strategy.
          </>,
        ],
        images: [],
      },
      {
        company: "Indian Institute of Technology Madras, India",
        timeframe: "07/2013 - 03/2021",
        role: "Doctoral Researcher, Department of Civil Engineering",
        achievements: [
          <>
            Developed statistical, mathematical, and machine learning models to explain
            motorcycle-navigation behavior at a microscopic level using naturalistic traffic data.
          </>,
          <>
            Collected, curated, and analyzed large-scale traffic datasets from fixed and mobile
            sensors, then automated data processing, feature engineering, and modeling workflows in
            MATLAB and R.
          </>,
          <>
            Benchmarked methods including Random Forest, XGBoost, and neural networks for real-world
            class-imbalance problems in transportation research.
          </>,
          <>
            Contributed to collaborative research on real-time traffic state estimation using
            nonlinear filtering methods, including Unscented Kalman Filter implementations for
            heterogeneous urban traffic.
          </>,
          <>
            Co-developed a novel image-based traffic data extraction tool for disordered mixed
            traffic that improved workflow efficiency by 500% and contributed to more than 10
            research publications.
          </>,
          <>
            Guided collaborative thesis work across departments on mixed-traffic modeling,
            simulation, and vehicle behavior analysis.
          </>,
        ],
        images: [],
      },
      {
        company: "Central Road Research Institute, New Delhi, India",
        timeframe: "06/2012 - 06/2013",
        role: "Visiting Researcher",
        achievements: [
          <>
            Conducted master&apos;s thesis research on travel time reliability of Indian urban roads
            using field-collected corridor data.
          </>,
          <>
            Designed and executed field data-collection protocols, including license-plate-based
            travel time surveys, to evaluate reliability across urban road sections.
          </>,
          <>
            Applied statistical analysis and ANN-based modeling in `MATLAB` and `SPSS` to study
            relationships between travel time, speed, traffic volume, and vehicle composition.
          </>,
          <>
            Managed survey teams across 5 Indian cities, collaborated with CRRI researchers, and
            contributed to the first Indian Highway Capacity Manual.
          </>,
          <>
            The work later led to a Springer book chapter on empirical travel time reliability
            assessment of Indian urban roads.
          </>,
        ],
        images: [],
      },
    ],
  },
  awards: {
    display: true,
    title: "Awards & Recognition",
    items: [
      {
        title: "Government of India Scholarship Support",
        details: [
          <>
            Awarded competitive Government of India scholarship funding for the Ph.D. program,
            approximately EUR 16K, with an acceptance rate below 5%.
          </>,
          <>
            Awarded competitive Government of India scholarship funding for the Master&apos;s
            program, approximately EUR 2K, with an acceptance rate below 5%.
          </>,
        ],
      },
      {
        title: "Best Research Paper & Presentation Award",
        details: [
          <>
            Received the Best Research Paper & Presentation Award at the 10th Urban Mobility India
            and CODATU XVII Conference, Hyderabad, India, in November 2017.
          </>,
          <>
            Received the Best Presentation Award at the 6th Conference on Advances in Control and
            Optimization of Dynamical Systems (ACODS), Chennai, India, in February 2020.
          </>,
          <>
            Served as an official contributor to Indo-HCM through the Central Road Research
            Institute (CSIR-CRRI), Government of India, during 2012-2013.
          </>,
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Indian Institute of Technology Madras, India",
        description: <>Ph.D. in Transportation Systems Engineering, 2013 - 2021.</>,
      },
      {
        name: "NIT Surat, India",
        description: <>M.Tech. in Transportation Engineering and Planning, 2011 - 2013.</>,
      },
      {
        name: "Shivaji University, India",
        description: <>B.E. in Civil Engineering, 2005 - 2009.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Data Science and Data Pipelines",
        description: (
          <>
            Building end-to-end workflows for cleaning, transforming, validating, and modeling
            structured, spatial, image-based, and sensor-derived datasets.
          </>
        ),
        tags: [
          { name: "Python" },
          { name: "SQL" },
          { name: "R" },
          { name: "MATLAB" },
          { name: "scikit-learn" },
          { name: "NumPy" },
          { name: "pandas" },
        ],
        images: [],
      },
      {
        title: "Geospatial and Urban Analytics",
        description: (
          <>
            Analyzing travel behavior, road networks, and city-scale mobility systems through
            geospatial data engineering, spatial analysis, and large-scale urban data integration.
          </>
        ),
        tags: [
          { name: "GeoPandas" },
          { name: "pandas" },
          { name: "NumPy" },
          { name: "OSMnx" },
          { name: "NetworkX" },
          { name: "OpenStreetMap" },
          { name: "QGIS" },
          { name: "R" },
        ],
        images: [],
      },
      {
        title: "Behavior Modeling, Machine Learning, and Simulation",
        description: (
          <>
            Modeling driving and rider behavior under complex traffic conditions using statistical,
            mathematical, machine learning, and simulation-based approaches for transportation
            research and applied analytics.
          </>
        ),
        tags: [
          { name: "Behavior Modeling" },
          { name: "Traffic Flow Analysis" },
          { name: "Microscopic Traffic Data" },
          { name: "Machine Learning" },
          { name: "Feature Engineering" },
          { name: "Simulation Modeling" },
          { name: "Kalman Filtering" },
        ],
        images: [],
      },
      {
        title: "Visualization and Decision Support",
        description: (
          <>
            Creating interpretable dashboards, simulation studies, publication-ready outputs, and
            evidence-backed reporting for transport planning, policy, and research.
          </>
        ),
        tags: [
          { name: "Power BI" },
          { name: "VISSIM" },
          { name: "SPSS" },
          { name: "Git" },
          { name: "LaTeX" },
        ],
        images: [],
      },
    ],
  },
  coordination: {
    display: true,
    title: "Selected Coordination and Partnership Experience",
    items: [
      {
        title: "International Grant Development and Partner Coordination",
        timeframe: "TU Dresden",
        points: [
          <>
            Contributed to the preparation of major collaborative grant proposals, including a
            Synergy Grant and an IRTG proposal, involving partner universities across Europe and the
            United States.
          </>,
          <>
            Supported interdisciplinary coordination during proposal development by aligning inputs
            from researchers across institutions, helping shape timelines, technical contributions,
            and strategic framing.
          </>,
          <>
            Gained hands-on experience in international research collaboration at the interface of
            data, mobility, and urban systems, even when proposals did not ultimately receive
            funding.
          </>,
        ],
      },
      {
        title: "SUPRA Project and Institutional Collaboration",
        timeframe: "NIT Surat / CRRI / Multi-IIT collaboration",
        points: [
          <>
            Worked within the SUPRA institutional project, coordinating with NIT Surat, the Central
            Road Research Institute, and a broader network that involved seven IITs.
          </>,
          <>
            Contributed to the development of the Indian Highway Capacity Manual through
            institution-linked applied research and technical collaboration.
          </>,
          <>
            Was selected into this multi-institutional effort and contributed to interdisciplinary
            outputs that connected academic analysis with national-level transport practice.
          </>,
        ],
      },
      {
        title: "Grant Reporting, Research Communication, and Interdisciplinary Guidance",
        timeframe: "IIT Madras and collaborative research settings",
        points: [
          <>
            Supported preparation of technical reports for multiple grant applications developed by
            my professor and contributed to progress documentation linked to ongoing research work.
          </>,
          <>
            Presented progress reports and research updates, strengthening my experience in formal
            communication, reporting, and coordination around funded and proposed research
            activities.
          </>,
          <>
            Guided interdisciplinary student and collaborative research work and contributed to
            publication-oriented outputs emerging from cross-domain technical projects.
          </>,
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing on data science, mobility, and urban systems",
  description: `Articles and notes by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Selected research and analytics projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `Selected images from ${person.name}'s portfolio`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
  ],
};

const travel: Travel = {
  path: "/travel",
  label: "Travel",
  title: `Travel – ${person.name}`,
  description: `World map and travel gallery featuring places visited by ${person.name}`,
};

export { person, social, newsletter, home, about, blog, work, gallery, travel };
