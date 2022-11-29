import { CatalogItem, Category, MainPageContent } from "./types";

const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export const getCatalogList = async (
  category: Category
): Promise<CatalogItem[]> => {
  const res = await fetch(
    `${API_URL}/posts?categories=${category}&per_page=100`
  );
  const data = await res.json();

  if (!data.length || data.errors) {
    console.error(data.errors);
    throw new Error("Failed to fetch catalog list");
  }

  const list: CatalogItem[] = data
    .map(({ id, slug, title, acf }, index) => ({
      id,
      order: acf.order ? +acf.order : index + 1000,
      slug,
      name: {
        ru: acf.title_rus,
        ro: acf.title_rom,
        en: title.rendered,
      },
      galleryImgUrls: acf.gallery.map(({ sizes }) => sizes.large),
      price: {
        ru: `${acf.price} mdl`,
        ro: `${acf.price} mdl`,
        en: `${acf.price_eur} eur`,
      },
      category,
    }))
    .sort((a, b) => a.order - b.order);

  return list;
};

export const getProduct = async (slug: string): Promise<CatalogItem> => {
  const res = await fetch(`${API_URL}/posts?slug=${slug}`);
  const data = await res.json();

  if (!data.length || data.errors) {
    console.error(data.errors);
    throw new Error("Failed to fetch product data");
  }

  const { id, acf, content, title, categories } = data[0];

  const product = {
    id,
    slug,
    content: {
      ru: acf.description_rus,
      ro: acf.description_rom,
      en: content.rendered,
    },
    name: {
      ru: acf.title_rus,
      ro: acf.title_rom,
      en: title.rendered,
    },
    galleryImgUrls: acf.gallery.map(({ sizes }) => sizes.large),
    price: {
      ru: `${acf.price} mdl`,
      ro: `${acf.price} mdl`,
      en: `${acf.price_eur} eur`,
    },
    category: categories[0],
  };

  return product;
};

export const getMainPageContent = async (): Promise<MainPageContent> => {
  const res = await fetch(`${API_URL}/pages?slug=main`);
  const data = await res.json();

  if (data.errors || !data.length) {
    console.error(data.errors);
    throw new Error("Failed to fetch main page content");
  }

  const pageContent: MainPageContent = {
    headerSlider: {
      slides: data[0].acf.content.map(({ slide }) => ({
        title: {
          ru: slide.title_ru,
          en: slide.title_en,
          ro: slide.title_rom,
        },
        subtitle: {
          ru: slide.subtitle_ru,
          en: slide.subtitle_en,
          ro: slide.subtitle_rom,
        },
        imgUrl: slide.image.url,
      })),
    },
  };

  return pageContent;
};
