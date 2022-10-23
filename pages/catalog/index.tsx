import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Container } from "../../components/container";
import Layout from "../../components/layout";
import { getCatalogList } from "../../lib/api";

export default function Index({ catalogList }) {
  if (!catalogList) return null;

  return (
    <Layout>
      <Head>
        <title>Dikor catalog</title>
      </Head>
      <Container>
        {catalogList.length > 0 &&
          catalogList.map((pruduct, i) => (
            <p key={`${pruduct.slug}-${i}`}>
              <Link href={`/catalog/${pruduct.slug}`}>
                <a>{pruduct.slug}</a>
              </Link>
            </p>
          ))}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const catalogList = await getCatalogList();

  return {
    props: { catalogList },
  };
};
