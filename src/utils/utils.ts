import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  heroImage?: string;
  images: string[];
  tag?: string;
  domain?: string;
  focus?: string;
  scale?: string;
  techStack?: string[];
  team: Team[];
  link?: string;
};

type GetPostsOptions = {
  includeContent?: boolean;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string, options: GetPostsOptions = {}) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const { includeContent = true } = options;
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    heroImage: data.heroImage || "",
    images: data.images || [],
    tag: data.tag || [],
    domain: data.domain || "",
    focus: data.focus || "",
    scale: data.scale || "",
    techStack: data.techStack || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content: includeContent ? content : "" };
}

function getMDXData(dir: string, options: GetPostsOptions = {}) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file), options);
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""], options: GetPostsOptions = {}) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir, options);
}
