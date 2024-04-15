export type PdfFileType = {
  _type: 'reference';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

// export type VideoFileType = {
//   _type: 'reference';
//   asset: {
//     _ref: string;
//     _type: 'reference';
//   };
// };

export type Course = {
  title: string;
  slug: string;
  description: string;
  pdfFile: PdfFileType;
  videoUrl: string;
  videoId: string;
};