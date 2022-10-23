const API_URL = process.env.WORDPRESS_REST_API_URL;

export async function getCatalogList() {
  const res = await fetch(`${API_URL}/posts`);
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to fetch catalog list");
  }

  const list = data.map(({ id, slug, title, acf }) => ({
    id,
    slug,
    name: title.rendered,
    imgLink: acf.image.sizes.large,
    additionalImgLink: acf.additional_image_1
      ? acf.additional_image_1.sizes.large
      : null,
    price: acf.price,
  }));

  return list;
}

export async function getProduct(slug: string) {
  const res = await fetch(`${API_URL}/posts?slug=${slug}`);
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to fetch product data");
  }

  return data[0];
}
