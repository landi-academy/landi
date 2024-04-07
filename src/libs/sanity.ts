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

export function fileUrl(assetRef: any) {
  if (!assetRef) return null; // Проверяем, что _ref предоставлен

  // Исправленное регулярное выражение для обработки расширений, содержащих буквы и цифры
  const match = assetRef.match(/^(file)-([a-f0-9]+)-(\w+)$/);
  if (!match) return null; // Если формат не совпадает, возвращаем null

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  const assetId = match[2];
  const extension = match[3];
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}