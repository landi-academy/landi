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
  preTitle,
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

export const getLearningSectionQuery = groq`*[_type == "learningSection"][0] {
  _id,
  title,
  description,
  imageTheory,
  "theoryList": theoryList[]{
    _key,
    label,
    "subMenu": subMenu[]{
      _key,
      subLabel,
    },
  },
  imagePractice,
  "practiceList": practiceList[]{
    _key,
    label,
    "subMenu": subMenu[]{
      _key,
      subLabel,
    },
  },
  imageCertificate,
  "certificateList": certificateList[]{
    _key,
    label,
    "subMenu": subMenu[]{
      _key,
      subLabel,
    },
  },
  images,
}`;

export const getWhySectionQuery = groq`*[_type == "whySection"][0] {
  _id,
  title,
  bodyLeft,
  image,
  bodyRight,
  priceOld,
  priceNew,
}`;

export const getReviewsPicturesQuery = groq`*[_type == "reviewsPictures"][0] {
  _id,
  images[]{
    _key,
    alt,
    "asset": asset->
  }
}`;

export const getContactQuery = groq`*[_type == "contact"][0] {
  _id,
  contactTitle,
  contactDescription,
  "contactBulletList": contactBulletList[]{
    _key,
    label,
  },
  shortText,
  priceOld,
  priceNew,
  contactImage,
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