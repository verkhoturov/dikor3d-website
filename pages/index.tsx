import Head from "next/head";
import Link from "next/link";
import { Container } from "../components/container";
import Layout from "../components/layout";

export default function Index({ catalogList }) {
  // console.log("catalogList", catalogList);

  return (
    <Layout>
      <Head>
        <title>Dikor catalog</title>
      </Head>
      <Container>
        <p>main</p>
        <Link href="/catalog">
          <a>catalog</a>
        </Link>
      </Container>
    </Layout>
  );
}
