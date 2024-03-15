type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

export type Contact = {
  _id: string;
  contactTitle: string;
  contactDescription: string;
  contactImage: Image;
};