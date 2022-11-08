import Head from "next/head";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Section } from "../../components/common";
import { Page } from "../../components/page";
import { Catalog } from "../../components/catalog";
import { getCatalogList } from "../../lib/api";
import { CatalogItem, Category } from "../../lib/types";

interface CatalogPageProps {
  catalogList: CatalogItem[];
}

export default function CatalogPremiumPage({ catalogList }: CatalogPageProps) {
  const router = useRouter();
  const isLoading = router.isFallback;

  return (
    <Page>
      <Head>
        <title>Dikor premium catalog</title>
      </Head>
      <Section isGrayBg>
        <Catalog list={catalogList} isLoading={isLoading} />
      </Section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const catalogList = await getCatalogList(Category.PREMIUM);

  return {
    props: { catalogList },
    revalidate: 30,
  };
};
