type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

type Offer = {
  _key: string;
  _type: 'offer';
  text: string;
};

// Изменяем тип, теперь OffersList непосредственно является массивом объектов Offer
type OffersList = Offer[];

type Bullet = {
  _key: string;
  _type: 'bullet';
  text: string;
};

// По аналогии, если bulletsList тоже непосредственно является массивом
type BulletsList = Bullet[];

export type OfferSection = {
  _id: string;
  _type: 'offerSection';
  image: Image;
  title: string;
  description: string;
  offersList: OffersList; // Используем обновленный тип
  bulletsList: BulletsList;
  name: string;
  profession: string;
  textButton: string;
};