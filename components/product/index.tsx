import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { CatalogItem, MultiLanguageContent } from "../../lib/types";
import { useRouter } from "next/router";

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

  if (isLoading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.gallery}></div>
        <div className={styles.descWrapper}>
          <h2 className={styles.name}> Загрузка...</h2>
        </div>
      </div>
    );

  const { name, content, price, imgLink } = product;
  const productContent = getContentByLang(locale, name, content);

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        <Image
          // loader={() => imgLink}
          className={styles.img}
          src={imgLink}
          alt={productContent.name}
          width={500}
          height={600}
          layout="responsive"
        />
      </div>
      <div className={styles.descWrapper}>
        <h2 className={styles.name}>{productContent.name}</h2>
        <p className={styles.price}>
          {price} р. <span>/ шт </span>
        </p>

        <Link href={`/catalog`}>
          <a className={styles.linkBtn}>Купить</a>
        </Link>
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: productContent.desc }}
        ></p>
      </div>
    </div>
  );
};

export const Back = () => (
  <Link href="/catalog">
    <a>
      <span className={styles.backBtn}>Назад</span>
    </a>
  </Link>
);
