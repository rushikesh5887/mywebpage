import { about, baseURL, person } from "@/resources";
import { generateSeoMetadata } from "@/utils/seo";
import {
  Column,
  Heading,
  Line,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import { publications } from "./content";

export async function generateMetadata() {
  return generateSeoMetadata({
    title: publications.title,
    description: publications.description,
    baseURL: baseURL,
    image: "/images/og/rushikesh-home.jpg",
    path: publications.path,
    keywords: [
      "Rushikesh Amrutsamanvar publications",
      "Transportation Letters Rushikesh Amrutsamanvar",
      "road traffic carbon emissions global cities",
      "powered two wheelers mixed traffic",
    ],
  });
}

export default function PublicationsPage() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={publications.path}
        title={publications.title}
        description={publications.description}
        image="/images/og/rushikesh-home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="16" horizontal="center">
        <Heading variant="heading-strong-xl" align="center">
          Publications, projects, and applied problem-solving.
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          align="center"
          wrap="balance"
          style={{ maxWidth: "44rem" }}
        >
          {publications.intro}
        </Text>
      </Column>

      {publications.sections.map((section) => (
        <Column key={section.title} fillWidth gap="20">
          <Column fillWidth gap="8">
            <Row fillWidth horizontal="between" vertical="center" wrap gap="12">
              <Heading as="h2" variant="heading-strong-l">
                {section.title}
              </Heading>
              <Tag size="l">{section.items.length} entries</Tag>
            </Row>
            <Line />
          </Column>

          <Column fillWidth gap="16">
            {section.items.map((item, index) => (
              <Column
                key={`${section.title}-${index}`}
                fillWidth
                gap="12"
                padding="20"
                background="page"
                border="neutral-alpha-medium"
                radius="xl"
                style={{ backdropFilter: "blur(var(--static-space-1))" }}
              >
                <Text variant="body-strong-m" wrap="balance">
                  {index + 1}. {item.title}
                </Text>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {item.authors}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  <strong>{item.venue}</strong> {item.details}
                </Text>
                {item.href && (
                  <Row fitWidth>
                    <SmartLink href={item.href} suffixIcon="arrowUpRightFromSquare">
                      View publication
                    </SmartLink>
                  </Row>
                )}
                {item.institutions && item.institutions.length > 0 && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    <strong>Collaborating institutions:</strong> {item.institutions.join(", ")}
                  </Text>
                )}
              </Column>
            ))}
          </Column>
        </Column>
      ))}
    </Column>
  );
}
