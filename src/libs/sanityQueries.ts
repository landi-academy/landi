import { groq } from "next-sanity";

export const getHeaderQuery = groq`*[_type == "header"][0] {
  _id,
  logo,
  "menuItems": menuItems[]{
    "label": label,
    "link": link,
  }
}`;