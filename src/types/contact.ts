type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

type BulletItem = {
  _key?: string;
  label: string;
}

export type Contact = {
  _id: string;
  contactTitle: string;
  contactDescription: string;
  contactBulletList: BulletItem[];
  shortText: string;
  priceOld: string;
  priceNew: string;
  contactImage: Image;
};