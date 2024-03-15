export type ImageAssetReference = {
    _ref: string;
    _type: 'reference';
};

export type ImageFile = {
    _type: 'image';
    asset: ImageAssetReference;
};

export type Image = {
    _key: string;
    url?: string; // URL теперь опциональный, поскольку мы будем использовать _ref для получения URL
    file: ImageFile;
    alt: string;
};

export type ReviewsPictures = {
    _type: "reviewsPictures";
    _id: string;
    images: Image[];
};
