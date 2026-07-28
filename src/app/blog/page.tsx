import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, routes } from "@/resources";
import { generateSeoMetadata } from "@/utils/seo";
import { Column, Heading, Schema } from "@once-ui-system/core";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  if (!routes["/blog"]) {
    return {};
  }

  return generateSeoMetadata({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: "/images/og/rushikesh-home.jpg",
    path: blog.path,
    keywords: ["Rushikesh Amrutsamanvar blog", "mobility analytics writing"],
  });
}

export default function Blog() {
  if (!routes["/blog"]) {
    notFound();
  }

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image="/images/og/rushikesh-home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
