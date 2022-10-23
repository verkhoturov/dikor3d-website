import { CatalogItem } from "./types";

const API_URL = process.env.WORDPRESS_REST_API_URL;

export const getCatalogList = async (): Promise<CatalogItem[]> => {
  const res = await fetch(`${API_URL}/posts`);
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to fetch catalog list");
  }

  const list: CatalogItem[] = data.map(({ id, slug, title, acf }) => ({
    id,
    slug,
    name: title.rendered,
    imgLink: acf.image.sizes.large,
    additionalImgLink_1: acf.additional_image_1
      ? acf.additional_image_1.sizes.large
      : null,
    price: acf.price,
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

  const { id, acf, content, title } = data[0];

  const additionalImgLink_1 = acf.additional_image_1
    ? acf.additional_image_1.sizes.large
    : "";
  const additionalImgLink_2 = acf.additional_image_2
    ? acf.additional_image_2.sizes.large
    : "";

  const product = {
    id,
    slug,
    content: content.rendered,
    name: title.rendered,
    imgLink: acf.image.sizes.large,
    additionalImgLink_1,
    additionalImgLink_2,
    price: acf.price,
  };

  return product;
};
