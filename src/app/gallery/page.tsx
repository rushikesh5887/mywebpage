import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";
import { generateSeoMetadata } from "@/utils/seo";
import { Flex, Schema } from "@once-ui-system/core";

export async function generateMetadata() {
  return generateSeoMetadata({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: "/images/og/rushikesh-home.jpg",
    path: gallery.path,
    keywords: ["Rushikesh Amrutsamanvar gallery", "portfolio gallery"],
  });
}

export default function Gallery() {
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image="/images/og/rushikesh-home.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView />
    </Flex>
  );
}
