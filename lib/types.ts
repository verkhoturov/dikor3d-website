export enum Category {
  CLASSIC = 6,
  PLATINUM = 5,
  SHINE = 4,
  PREMIUM = 3,
  uncategorized = 1,
}

export interface MultiLanguageContent {
  ru: string;
  ro: string;
  en: string;
}

export interface CatalogItem {
  id: number;
  order?: number;
  slug: string;
  name: MultiLanguageContent;
  content?: MultiLanguageContent;
  galleryImgUrls: string[];
  price: MultiLanguageContent;
  category: Category;
}

export interface MainPageContent {
  headerSlider: {
    slides: {
      title: {
        ru: string;
        en: string;
        ro: string;
      };
      subtitle: {
        ru: string;
        en: string;
        ro: string;
      };
      imgUrl: string;
    }[];
  };
}
