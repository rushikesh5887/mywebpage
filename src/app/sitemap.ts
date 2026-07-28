import { baseURL, routes as routesConfig } from "@/resources";
import { canonicalUrl } from "@/utils/seo";
import { getPosts } from "@/utils/utils";

export const dynamic = "force-static";

export default async function sitemap() {
  const blogs = routesConfig["/blog"]
    ? getPosts(["src", "app", "blog", "posts"]).map((post) => ({
        url: canonicalUrl(baseURL, `/blog/${post.slug}`),
        lastModified: post.metadata.publishedAt,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      }))
    : [];

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: canonicalUrl(baseURL, `/work/${post.slug}`),
    lastModified: post.metadata.publishedAt,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: canonicalUrl(baseURL, route),
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "/" ? ("monthly" as const) : ("yearly" as const),
    priority: route === "/" ? 1 : route === "/publications" || route === "/work" ? 0.9 : 0.6,
  }));

  return [...routes, ...blogs, ...works];
}
