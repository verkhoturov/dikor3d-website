import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// import { Delivery } from "../../components/delivery";
import {
  // Hero,
  Section,
} from "../../components/common";
import { Page } from "../../components/common/page";
import { Catalog } from "../../components/catalog";
import { getCatalogList } from "../../lib/api";
import { CatalogItem, Category } from "../../lib/types";
import { useLang } from "../../utils/useLang";
import { Meta, SchemaProduct } from "../../components/common/meta";

interface CatalogPageProps {
  catalogList: CatalogItem[];
}

export default function CatalogClassicPage({ catalogList }: CatalogPageProps) {
  const router = useRouter();
  const isLoading = router.isFallback;
  const t = useLang(router.locale);

  return (
    <Page>
      <Meta
        title={`Dikor | ${t.seo.collections.classic.title}`}
        description={t.seo.desc}
        OGImage={catalogList[0].galleryImgUrls[0]}
        link={"https://www.dikor3d.com/catalog-classic"}
        isCatalogPage
      />
      {/* <Hero title="Lifestyle accessories created to bring you the joy of usage" /> */}
      <h1 className="visually-hidden">{t.seo.collections.classic.title}</h1>
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
