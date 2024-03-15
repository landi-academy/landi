type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

type footerMenuItems = {
  label: string;
  link: string;
};

type footerSocialMedia = {
  icon: Image;
  label: string;
  link: string;
};

export type Footer = {
  _id: string;
  footerTitle: string;
  footerLogo: Image;
  footerMenuItems: footerMenuItems[];
  footerSocialMedia: footerSocialMedia[];
};