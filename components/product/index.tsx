import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { CatalogItem } from "../../lib/types";

export const Product: React.FC<{
  product: CatalogItem;
  isLoading?: boolean;
}> = ({ product, isLoading }) => {
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        <Image
          // loader={() => imgLink}
          className={styles.img}
          src={imgLink}
          alt={name} 
          width={500}
          height={600}
          layout="responsive"
        />
      </div>
      <div className={styles.descWrapper}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.price}>
          {price} р. <span>/ шт </span>
        </p>

        <Link href={`/catalog`}>
          <a className={styles.linkBtn}>Купить</a>
        </Link>
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </div>
    </div>
  );
};

export const Back = () => (
  <Link href="/catalog">
    <a>
      <span className={styles.backBtn}>Назад в каталог</span>
    </a>
  </Link>
);
