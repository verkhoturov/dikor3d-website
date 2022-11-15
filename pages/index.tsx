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
import { Meta } from "../components/common/meta";

import { useRouter } from "next/router";
import { useLang } from "../utils/useLang";

interface MainPageProps {
  mainPageContent: MainPageContent;
}

export default function Index(props: MainPageProps) {
  const router = useRouter();
  const t = useLang(router.locale);

  return (
    <Page>
      <Meta description={t.seo.desc} />
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
