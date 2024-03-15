import { groq } from "next-sanity";

export const getHeaderQuery = groq`*[_type == "header"][0] {
  _id,
  logo,
  "menuItems": menuItems[]{
    "label": label,
    "link": link,
  }
}`;

export const getOfferSectionQuery = groq`*[_type == "offerSection"][0] {
  _id,
  image,
  title,
  description,
  "offersList": offersList[]{
    _key,
    text,
  },
  "bulletsList": bulletsList[]{
    _key,
    text,
  },
  name,
  profession,
  textButton,
}`;

export const getAboutSectionQuery = groq`*[_type == "aboutSection"][0] {
  _id,
  roundImage,
  quote,
  title,
  description,
  image,
  name,
  profession,
  "aboutBullets": aboutBullets[]{
    _key,
    text,
  },
  shortText,
}`;

export const getWhySectionQuery = groq`*[_type == "whySection"][0] {
  _id,
  title,
  bodyLeft,
  image,
  bodyRight,
}`;

export const getReviewsPicturesQuery = groq`*[_type == "reviewsPictures"][0] {
  _id,
  images,
}`;

export const getFooterQuery = groq`*[_type == "footer"][0] {
  _id,
  footerTitle,
  footerLogo,
  "footerMenuItems": footerMenuItems[]{
    "label": label,
    "link": link,
  },
  "footerSocialMedia": footerSocialMedia[]{
    "icon": icon,
    "label": label,
    "link": link,
  },
  footerCopyRight
}`;