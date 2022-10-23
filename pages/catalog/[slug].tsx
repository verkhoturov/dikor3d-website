import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container } from "../../components/container";
import { Header } from "../../components/header";
import Layout from "../../components/layout";
import { getCatalogList, getProduct } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";

export default function Post({ product }) {
  const router = useRouter();
  // const morePosts = posts?.edges

  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article>
              <Head>
                <title>Next.js Blog Example with {CMS_NAME}</title>
                {/* <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                /> */}
              </Head>

              <p>{product.slug}</p>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const data = await getProduct(slug);

  return {
    props: {
      product: data,
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const catalogList = await getCatalogList();

  return {
    paths: catalogList.map(({ slug }) => `/catalog/${slug}`) || [],
    fallback: true,
  };
};
