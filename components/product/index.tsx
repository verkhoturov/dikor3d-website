import React from "react";
import ErrorPage from "next/error";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { OrderModal } from "../order";
import { Page } from "../common/page";
import { Section } from "../common";
import { CatalogItem } from "../../lib/types";
import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Meta, SchemaProduct } from "../common/meta";

export const Product: React.FC<{
  name: string;
  desc: string;
  price: string;
  galleryImgUrls: string[];
  isLoading?: boolean;
}> = ({ name, desc, price, galleryImgUrls, isLoading }) => {
  const router = useRouter();
  const locale = router.locale;
  const t = useLang(locale);

  const [showModal, setShowModal] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  if (isLoading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.gallery}></div>
        <div className={styles.descWrapper}>
          <h2 className={styles.name}>{t.common.loading}...</h2>
        </div>
      </div>
    );

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
                alt={name}
                width={500}
                height={600}
                layout="responsive"
                unoptimized={isMobile}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.descWrapper}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.price}>
          {price} <span>/ {t.common.amount} </span>
        </p>

        <button className={styles.btn} onClick={() => setShowModal(true)}>
          {t.common.order}
        </button>
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: desc }}
        ></p>
      </div>

      {showModal && (
        <OrderModal onClose={() => setShowModal(false)} productName={name} />
      )}
    </div>
  );
};

export const Back = () => {
  const router = useRouter();
  const t = useLang(router.locale);
  const parentCatalog = router.asPath.split("/")[1];

  return (
    <Link href={`/${parentCatalog}`} legacyBehavior>
      <a>
        <span className={styles.backBtn}>{t.common.back}</span>
      </a>
    </Link>
  );
};

export const ProductPageContent = ({ product }: { product: CatalogItem }) => {
  const { isFallback, asPath, locale } = useRouter();

  if (!isFallback && !product) {
    return <ErrorPage statusCode={404} />;
  }

  if (!product) return null;

  const parentCatalog = asPath.split("/")[1];

  const productName = product.name[locale];
  const productDesc = product.content[locale];
  const fullPrice = product.price[locale];

  const [priceAmount, currency] = fullPrice.split(" ");

  return (
    <Page>
      <Meta
        title={productName ? `Dikor | ${productName}` : "Dikor"}
        OGImage={product ? product.galleryImgUrls[0] : undefined}
      />
      <SchemaProduct
        name={productName}
        desc={productDesc.replace(/<(.|\n)*?>/g, "")}
        currency={currency}
        price={priceAmount}
        slug={product.slug}
        images={[product.galleryImgUrls[0], product.galleryImgUrls[1]]}
        catalog={parentCatalog}
      />
      <Section noPadding style={{ paddingTop: 20 }}>
        <Back />
        <Product
          name={productName}
          desc={productDesc}
          price={fullPrice}
          galleryImgUrls={product.galleryImgUrls}
          isLoading={isFallback}
        />
      </Section>
    </Page>
  );
};
