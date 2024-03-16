export type SanityAssetReference = {
    _ref: string;
};

export type SanityImage = {
    _key: string;
    alt?: string;
    asset: SanityAssetReference; // Указываем, что asset это ссылка
};

export type ReviewsPictures = {
    _type: "reviewsPictures";
    _id: string;
    images: SanityImage[]; // Массив объектов изображений
};