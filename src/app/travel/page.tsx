import { Column, Schema } from "@once-ui-system/core";

import { travelGallery, travelPlaces } from "@/app/travel/data";
import TravelView from "@/components/travel/TravelView";
import { about, baseURL, person, travel } from "@/resources";
import { generateSeoMetadata } from "@/utils/seo";

export async function generateMetadata() {
  return generateSeoMetadata({
    title: travel.title,
    description: travel.description,
    baseURL: baseURL,
    image: "/images/og/rushikesh-home.jpg",
    path: travel.path,
    keywords: ["Rushikesh Amrutsamanvar travel", "travel gallery", "visited places map"],
  });
}

export default function TravelPage() {
  return (
    <Column maxWidth="xl" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={travel.title}
        description={travel.description}
        path={travel.path}
        image="/images/og/rushikesh-home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <TravelView places={travelPlaces} photos={travelGallery} />
    </Column>
  );
}
