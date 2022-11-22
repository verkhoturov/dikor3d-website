import React from "react";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { OrderModal } from "../order";
import { Page } from "../page";
import { Section } from "../common";
import { CatalogItem, MultiLanguageContent } from "../../lib/types";
import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";
import { getProductNameByLang } from "../../utils/getProductNameByLang";
import { getPriceByLang } from "../../utils/getPriceByLang";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Meta, SchemaProduct } from "../common/meta";

const getContentByLang = (
  locale: string,
  name: MultiLanguageContent,
  content: MultiLanguageContent
) => {
  if (locale === "en") return { name: name.en, desc: content.en };
  if (locale === "ru") return { name: name.rus, desc: content.rus };
  if (locale === "ro") return { name: name.rom, desc: content.rom };
  return { name: name.rus, desc: content.rus };
};

export const Product: React.FC<{
  product: CatalogItem;
  isLoading?: boolean;
}> = ({ product, isLoading }) => {
  const router = useRouter();
  const locale = router.locale;
  const t = useLang(locale);

  const [showModal, setShowModal] = React.useState(false);

  if (isLoading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.gallery}></div>
        <div className={styles.descWrapper}>
          <h2 className={styles.name}>{t.common.loading}...</h2>
        </div>
      </div>
    );

  const { name, content, priceMDL, priceEUR, galleryImgUrls } = product;
  const productContent = getContentByLang(locale, name, content);
  const price = getPriceByLang(priceMDL, priceEUR, locale);

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        <Swiper
          className={styles.mySwiper}
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {galleryImgUrls.map((imgUrl, i) => (
            <SwiperSlide key={i}>
              <Image
                className={styles.img}
                src={imgUrl}
                alt={productContent.name}
                width={500}
                height={600}
                layout="responsive"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.descWrapper}>
        <h2 className={styles.name}>{productContent.name}</h2>
        <p className={styles.price}>
          {price} <span>/ {t.common.amount} </span>
        </p>

        <button className={styles.btn} onClick={() => setShowModal(true)}>
          {t.common.order}
        </button>
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: productContent.desc }}
        ></p>
      </div>

      {showModal && (
        <OrderModal
          onClose={() => setShowModal(false)}
          product={productContent}
        />
      )}
    </div>
  );
};

export const Back = () => {
  const router = useRouter();
  const t = useLang(router.locale);
  const parentCatalog = router.asPath.split("/")[1];

  return (
    <Link href={`/${parentCatalog}`}>
      <a>
        <span className={styles.backBtn}>{t.common.back}</span>
      </a>
    </Link>
  );
};

export const ProductPageContent = ({ product }: { product: CatalogItem }) => {
  const router = useRouter();

  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />;
  }

  if(!product) return null;

  const parentCatalog = router.asPath.split("/")[1];

  const productName = getProductNameByLang(router.locale, product?.name);
  const fullPrice = getPriceByLang(
    product?.priceMDL,
    product.priceEUR,
    router.locale
  );
  const currency = fullPrice.split(" ")[1];
  const priceAmount = fullPrice.split(" ")[0];
  const productContent = getContentByLang(
    router.locale,
    product.name,
    product.content
  );
  const title = productName ? `Dikor | ${productName}` : "Dikor";

  return (
    <Page>
      <Meta
        title={title}
        OGImage={product ? product.galleryImgUrls[0] : undefined}
      />
      <SchemaProduct
        name={productName}
        desc={productContent.desc.replace(/<(.|\n)*?>/g, '')}
        currency={currency}
        price={priceAmount}
        slug={product.slug}
        images={[product.galleryImgUrls[0], product.galleryImgUrls[1]]}
        catalog={parentCatalog}
      />
      <Section noPadding style={{ paddingTop: 20 }}>
        <Back />
        <Product product={product} isLoading={router.isFallback} />
      </Section>
    </Page>
  );
};
