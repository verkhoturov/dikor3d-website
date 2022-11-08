import { CatalogItem, Category } from "./types";

const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export const getCatalogList = async (
  category: Category
): Promise<CatalogItem[]> => {
  const res = await fetch(`${API_URL}/posts?categories=${category}`);
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
    imgLink: acf.image.sizes.large,
    additionalImgLink_1: acf.additional_image_1
      ? acf.additional_image_1.sizes.large
      : null,
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

  const { id, acf, content, title, categories } = data[0];

  const additionalImgLink_1 = acf.additional_image_1
    ? acf.additional_image_1.sizes.large
    : "";
  const additionalImgLink_2 = acf.additional_image_2
    ? acf.additional_image_2.sizes.large
    : "";

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
    imgLink: acf.image.sizes.large,
    additionalImgLink_1,
    additionalImgLink_2,
    priceMDL: acf.price,
    priceEUR: acf.price_eur,
    category: categories[0],
  };

  return product;
};
