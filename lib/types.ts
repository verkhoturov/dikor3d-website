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
  imgLink: string;
  additionalImgLink_1?: string;
  additionalImgLink_2?: string;
  price: string;
}
