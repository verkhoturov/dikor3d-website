import { CatalogItem, Category } from "./types";

const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export const getCatalogList = async (
  category: Category
): Promise<CatalogItem[]> => {
  const res = await fetch(
    `${API_URL}/posts?categories=${category}&per_page=100`
  );
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to fetch catalog list");
  }

  const list: CatalogItem[] = data.map(({ id, slug, title, acf }) => ({
    id,
    slug,
    name: {
      rus: acf.title_rus,
      rom: acf.title_rom,
      en: title.rendered,
    },
    galleryImgUrls: acf.gallery.map(({ sizes }) => sizes.large),
    priceMDL: acf.price,
    priceEUR: acf.price_eur,
    category,
  }));

  return list;
};

export const getProduct = async (slug: string): Promise<CatalogItem> => {
  const res = await fetch(`${API_URL}/posts?slug=${slug}`);
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to fetch product data");
  }

  if (!data.length) {
    console.error(data.errors);
    throw new Error("Failed to fetch product data");
  }

  const { id, acf, content, title, categories } = data[0];

  const product = {
    id,
    slug,
    content: {
      rus: acf.description_rus,
      rom: acf.description_rom,
      en: content.rendered,
    },
    name: {
      rus: acf.title_rus,
      rom: acf.title_rom,
      en: title.rendered,
    },
    galleryImgUrls: acf.gallery.map(({ sizes }) => sizes.large),
    priceMDL: acf.price,
    priceEUR: acf.price_eur,
    category: categories[0],
  };

  return product;
};
