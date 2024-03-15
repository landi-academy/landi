type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

type AboutBullet = {
  _type: 'object';
  text: string;
}

type AboutSection = {
  _type: 'aboutSection';
  roundImage: Image;
  quote: string;
  title: string;
  description: string;
  image: Image;
  name: string;
  profession: string;
  aboutBullets: AboutBullet[];
  shortText: string;
}
