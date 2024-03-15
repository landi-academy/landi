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
  "bullestList": bullestList[]{
    _key,
    text,
  },
  name,
  profession,
  textButton,
}`;