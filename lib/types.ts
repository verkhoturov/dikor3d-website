export enum Category {
  CLASSIC = 6,
  PLATINUM = 5,
  SHINE = 4,
  PREMIUM = 3,
  uncategorized = 1,
}

export interface MultiLanguageContent {
  rus: string;
  rom: string;
  en: string;
}

export interface CatalogItem {
  id: number;
  slug: string;
  name: MultiLanguageContent;
  content?: MultiLanguageContent;
  galleryImgUrls: string[];
  priceMDL: string;
  priceEUR: string;
  category: Category;
}