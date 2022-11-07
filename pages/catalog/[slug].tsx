import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { Page } from "../../components/page";
import { Section } from "../../components/common";
import { Product, Back } from "../../components/product";
import { getCatalogList, getProduct } from "../../lib/api";
import { getProductNameByLang } from "../../utils/getProductNameByLang";
import { CatalogItem } from "../../lib/types";

export default function ProductPage({ product }: { product: CatalogItem }) {
  const router = useRouter();

  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />;
  }

  const productName = getProductNameByLang(router.locale, product?.name);
  const title = productName ? `Dikor | ${productName}` : "Dikor";

  return (
    <Page>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={product?.imgLink} />
      </Head>
      <Section noPadding style={{ paddingTop: 20 }}>
        <Back />
        <Product product={product} isLoading={router.isFallback} />
      </Section>
    </Page>
  );
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
  const catalogList = await getCatalogList();

  return {
    paths: catalogList.map(({ slug }) => `/catalog/${slug}`) || [],
    fallback: true,
  };
};
