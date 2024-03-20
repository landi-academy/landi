type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

export type WhySection = {
  _id: string;
  title: string;
  bodyLeft: any;
  image: Image;
  bodyRight: any;
  priceOld: string;
  priceNew: string;
};