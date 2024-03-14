import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiVersion: "2021-10-21",
  useCdn: process.env.NODE_ENV === "production",
  // token: process.env.SANITY_STUDIO_TOKEN,
});

// export default sanityClient;

const builder = ImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source)
}