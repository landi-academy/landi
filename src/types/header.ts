type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

type NavigationMenuItem = {
  label: string;
  link: string;
};

export type Header = {
  _id: string;
  logo: Image;
  menuItems: NavigationMenuItem[];
};