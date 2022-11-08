import { GetStaticPaths, GetStaticProps } from "next";
import { ProductPageContent as Content } from "../../components/product";
import { getCatalogList, getProduct } from "../../lib/api";
import { CatalogItem, Category } from "../../lib/types";

export default function ProductPage({ product }: { product: CatalogItem }) {
  return <Content product={product} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const product = await getProduct(slug);

  return {
    props: {
      product,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const catalogList = await getCatalogList(Category.PREMIUM);

  return {
    paths: catalogList.map(({ slug }) => `/catalog-premium/${slug}`) || [],
    fallback: true,
  };
};
