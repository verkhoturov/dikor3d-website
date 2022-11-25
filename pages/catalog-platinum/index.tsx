import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Section } from "../../components/common";
import { Page } from "../../components/page";
import { Catalog } from "../../components/catalog";
import { getCatalogList } from "../../lib/api";
import { CatalogItem, Category } from "../../lib/types";
import { useLang } from "../../utils/useLang";
import { Meta } from "../../components/common/meta";
import platinumImg from "../../components/product-catalog/img/platinum.jpg";

interface CatalogPageProps {
  catalogList: CatalogItem[];
}

export default function CatalogPlatinumPage({ catalogList }: CatalogPageProps) {
  const router = useRouter();
  const isLoading = router.isFallback;
  const t = useLang(router.locale);

  return (
    <Page>
      <Meta
        title={`Dikor | ${t.seo.collections.platinum.title}`}
        description={t.seo.collections.platinum.desc}
        OGImage={platinumImg.src}
        link={"https://www.dikor3d.com/catalog-platinum"}
        isCatalogPage
      />
      <h1 className="visually-hidden">{t.seo.collections.platinum.title}</h1>
      <Section isGrayBg>
        <Catalog list={catalogList} isLoading={isLoading} />
      </Section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const catalogList = await getCatalogList(Category.PLATINUM);

  return {
    props: { catalogList },
    revalidate: 30,
  };
};
