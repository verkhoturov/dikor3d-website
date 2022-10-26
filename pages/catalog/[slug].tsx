import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { Page } from "../../components/page";
import { Section } from "../../components/common";
import { Product, Back } from "../../components/product";
import { getCatalogList, getProduct } from "../../lib/api";

export default function Post({ product }) {
  const router = useRouter();

  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Page>
      <Head>
        <title>Dikor | {product?.name}</title>
        <meta property="og:image" content={product?.imgLink} />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
      </Head>
      <Section noPadding style={{ marginTop: -80, paddingTop: 40 }}>
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
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const catalogList = await getCatalogList();

  return {
    paths: catalogList.map(({ slug }) => `/catalog/${slug}`) || [],
    fallback: true,
  };
};
