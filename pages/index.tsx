import Head from "next/head";
import { GetStaticProps } from "next";
import { getMainPageContent } from "../lib/api";
import { MainPageContent } from "../lib/types";
import { Page } from "../components/page";
import { Section } from "../components/common";
import { HeaderSlider } from "../components/header-slider";
// import { MainHero } from "../components/main-hero";
import { Advantages } from "../components/advantages";
import { ProductCatalog } from "../components/product-catalog";
import { OurProduction } from "../components/our-production";
import { Conditions } from "../components/conditions";
import { RequestHero } from "../components/request-hero";

interface MainPageProps {
  mainPageContent: MainPageContent;
}

export default function Index(props: MainPageProps) {
  return (
    <Page>
      <Head>
        <title>Dikor</title>
        <meta
          name="description"
          content="КУПИТЬ 3D ПАНЕЛИ С ДОСТАВКОЙ ПО ЕВРОПЕ. 3D панели с готовым покрытием от производителя Dikor. Заказать 3D панели с доставкой по  всей Европе:  ☎️ +373 (76) 740995"
        ></meta>
      </Head>
      {/* <MainHero /> */}
      <Section noPadding style={{ padding: 0 }}>
        <HeaderSlider slides={props.mainPageContent.headerSlider.slides} />
      </Section>
      <Section>
        <Advantages />
      </Section>
      <Section>
        <ProductCatalog />
      </Section>
      <Section>
        <OurProduction />
      </Section>
      <Section>
        <Conditions />
      </Section>
      <Section>
        <RequestHero />
      </Section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mainPageContent = await getMainPageContent();

  return {
    props: { mainPageContent },
    revalidate: 30,
  };
};
