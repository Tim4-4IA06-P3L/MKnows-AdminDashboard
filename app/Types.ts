export interface StrapiFile {
  id: number,
  documentId: string,
  name: string,
  url: string,
  mime: string,
  ext: string,
  width: number,
  height: number,
  related: (Bootcamp | Training)[]
}

export interface Category {
  id: number,
  documentId: string,
  Category: string,
  programs: Bootcamp[]
}

export interface Bootcamp {
  id: number,
  documentId: string,
  Title: string,
  Level: string,
  Category: Category,
  Description: string
  Thumbnail: StrapiFile,
  Document: StrapiFile
}

export interface Training {
  id: number,
  documentId: string,
  Title: string,
  TrainingType: string,
  NewTraining: boolean,
  Thumbnail: StrapiFile,
  Document: StrapiFile,
}

export interface Schedule {
  id: number,
  documentId: string,
  Name: string,
  Company: string,
  Position: string,
  Office_Number: string,
  WhatsApp_Number: string,
  Email: string,
  Training_Type: string,
}