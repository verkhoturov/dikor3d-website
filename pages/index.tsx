import Head from "next/head";
import { Page } from "../components/page";
import { Section } from "../components/common";
import { MainHero } from "../components/main-hero";
import { Advantages } from "../components/advantages";
import { ProductCatalog } from "../components/product-catalog";
import { OurProduction } from "../components/our-production";
import { Conditions } from "../components/conditions";
import { RequestHero } from "../components/request-hero";

export default function Index() {
  return (
    <Page>
      <Head>
        <title>Dikor catalog</title>
      </Head>
      <MainHero />
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
