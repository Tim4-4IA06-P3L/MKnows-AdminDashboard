export interface Category {
  id: number,
  documentId: string,
  Category: string,
};

export interface Program {
  id: number,
  documentId: string,
  Title: string,
  Description: string,
  Level: string,
  Category: Category,
  Thumbnail: ImageFile,
  Document: PdfFile,
};

export interface PdfFile {
  id: number,
  documentId: string,
  name: string,
  url: string,
};

export interface ImageFormats {
  small: {
    ext: string,
    url: string,
    width: number,
    height: number,
  }
};

export interface ImageFile {
  id: number,
  documentId: string,
  name: string,
  formats: ImageFormats,
};

