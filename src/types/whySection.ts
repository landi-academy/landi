type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  bodyLeft: any;
  image: Image;
  bodyRight: any;
};