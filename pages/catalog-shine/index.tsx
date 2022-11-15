import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Section } from "../../components/common";
import { Page } from "../../components/page";
import { Catalog } from "../../components/catalog";
import { getCatalogList } from "../../lib/api";
import { CatalogItem, Category } from "../../lib/types";
import { useLang } from "../../utils/useLang";
import { Meta } from "../../components/common/meta";

import shineImg from "../../components/product-catalog/img/shine.jpg";

interface CatalogPageProps {
  catalogList: CatalogItem[];
}

export default function CatalogShinePage({ catalogList }: CatalogPageProps) {
  const router = useRouter();
  const t = useLang(router.locale);

  const isLoading = router.isFallback;

  return (
    <Page>
      <Meta
        title="Dikor Shine catalog"
        description={t.seo.desc}
        OGImage={shineImg.src}
      />
      <Section isGrayBg>
        <Catalog list={catalogList} isLoading={isLoading} />
      </Section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const catalogList = await getCatalogList(Category.SHINE);

  return {
    props: { catalogList },
    revalidate: 30,
  };
};
