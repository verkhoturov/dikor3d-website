import Head from "next/head";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// import { Delivery } from "../../components/delivery";
import {
  // Hero,
  Section,
} from "../../components/common";
import { Page } from "../../components/page";
import { Catalog } from "../../components/catalog";
import { getCatalogList } from "../../lib/api";
import { CatalogItem, Category } from "../../lib/types";

interface CatalogPageProps {
  catalogList: CatalogItem[];
}

export default function CatalogClassicPage({ catalogList }: CatalogPageProps) {
  const router = useRouter();
  const isLoading = router.isFallback;

  return (
    <Page>
      <Head>
        <title>Dikor classic catalog</title>
        <meta
          name="description"
          content="КУПИТЬ 3D ПАНЕЛИ С ДОСТАВКОЙ ПО ЕВРОПЕ. 3D панели с готовым покрытием от производителя Dikor. Заказать 3D панели с доставкой по  всей Европе:  ☎️ +373 (76) 740995"
        ></meta>
      </Head>
      {/* <Hero title="Lifestyle accessories created to bring you the joy of usage" /> */}
      <Section isGrayBg>
        <Catalog list={catalogList} isLoading={isLoading} />
      </Section>
      {/* <Section>
        <Delivery />
      </Section>*/}
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const catalogList = await getCatalogList(Category.CLASSIC);

  return {
    props: { catalogList },
    revalidate: 30,
  };
};
