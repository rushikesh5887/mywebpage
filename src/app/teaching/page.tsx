import { Column, Heading, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { about, baseURL, person } from "@/resources";
import { generateSeoMetadata } from "@/utils/seo";

import { teaching } from "./content";

export async function generateMetadata() {
  return generateSeoMetadata({
    title: teaching.title,
    description: teaching.description,
    baseURL: baseURL,
    image: "/images/og/rushikesh-home.jpg",
    path: teaching.path,
    keywords: [
      "Rushikesh Amrutsamanvar teaching",
      "statistics lecturer",
      "machine learning teaching",
      "SQL teaching",
    ],
  });
}

export default function TeachingPage() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="40">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={teaching.title}
        description={teaching.description}
        path={teaching.path}
        image="/images/og/rushikesh-home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="20" horizontal="center" align="center">
        <Text variant="label-strong-m" onBackground="brand-weak">
          Teaching And Mentoring
        </Text>
        <Heading variant="display-strong-m" align="center">
          Technical teaching that strengthens my value in industry-facing data roles.
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "52rem" }}
        >
          {teaching.intro}
        </Text>
      </Column>

      <Column fillWidth gap="xl" marginBottom="40">
        {teaching.sections.map((section) => (
          <Column key={section.title} fillWidth gap="20">
            <Column gap="8">
              <Heading as="h2" variant="heading-strong-l">
                {section.title}
              </Heading>
              {section.intro && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {section.intro}
                </Text>
              )}
            </Column>

            <Column fillWidth gap="20">
              {section.items.map((item) => (
                <Column
                  key={item.title}
                  fillWidth
                  padding="20"
                  radius="xl"
                  border="neutral-alpha-medium"
                  background="page"
                  gap="12"
                >
                  <Heading as="h3" variant="heading-strong-m">
                    {item.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                  {item.tags && item.tags.length > 0 && (
                    <Row wrap gap="8">
                      {item.tags.map((tag) => (
                        <Tag key={`${item.title}-${tag}`} size="l">
                          {tag}
                        </Tag>
                      ))}
                    </Row>
                  )}
                </Column>
              ))}
            </Column>
          </Column>
        ))}

        {teaching.materials.length > 0 && (
          <Column fillWidth gap="20">
            <Column gap="8">
              <Heading as="h2" variant="heading-strong-l">
                Selected Materials
              </Heading>
              {teaching.materialsIntro && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {teaching.materialsIntro}
                </Text>
              )}
            </Column>

            <Column fillWidth gap="20">
              {teaching.materials.map((item) => (
                <Column
                  key={item.title}
                  fillWidth
                  padding="20"
                  radius="xl"
                  border="neutral-alpha-medium"
                  background="page"
                  gap="12"
                >
                  <Heading as="h3" variant="heading-strong-m">
                    {item.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                  <SmartLink href={item.href} suffixIcon="arrowUpRightFromSquare">
                    Detailed teaching materials available on request
                  </SmartLink>
                  {item.tags && item.tags.length > 0 && (
                    <Row wrap gap="8">
                      {item.tags.map((tag) => (
                        <Tag key={`${item.title}-${tag}`} size="l">
                          {tag}
                        </Tag>
                      ))}
                    </Row>
                  )}
                </Column>
              ))}
            </Column>
          </Column>
        )}
      </Column>
    </Column>
  );
}
