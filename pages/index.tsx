import Head from "next/head";
import Link from "next/link";
import { Page } from "../components/page";

export default function Index() {
  return (
    <Page>
      <Head>
        <title>Dikor catalog</title>
      </Head>
      <p>main</p>
      <Link href="/catalog">
        <a>catalog</a>
      </Link>
    </Page>
  );
}
