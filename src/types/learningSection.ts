type Image = {
  _key: string;
  _ref: string;
  _type: string;
  url: string;
};

type SubMenuItem = {
  _key?: string;
  subLabel: string;
}

type MenuItem = {
  _key?: string;
  label: string;
  subMenu: SubMenuItem[];
}

export type LearningSection = {
  _id: string; 
  _type: 'learningSection';
  title: string;
  description: string;
  theoryList: MenuItem[];
  practiceList: MenuItem[];
  certificateList: MenuItem[];
  imageTheory: Image;
  imagePractice: Image;
  imageCertificate: Image;
  images: Image[];
}