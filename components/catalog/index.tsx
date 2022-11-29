import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classnames from "classnames";
import { CatalogItem, Category } from "../../lib/types";
import { useLang } from "../../utils/useLang"; 

import styles from "./index.module.css";

const getPathByCategory = (category: Category) => {
  if (category === Category.CLASSIC) return "catalog-classic";
  if (category === Category.PLATINUM) return "catalog-platinum";
  if (category === Category.PREMIUM) return "catalog-premium";
  if (category === Category.SHINE) return "catalog-shine";
};

interface CatalogProps {
  list: CatalogItem[];
  isLoading: boolean;
}

const Item: React.FC<CatalogItem> = ({
  slug,
  name,
  price,
  category,
  galleryImgUrls,
}) => {
  const router = useRouter();
  const locale = router.locale;
  const t = useLang(locale);

  const itemName = name[locale];
  const fullPrice = price[locale];
  const parentCatalog = getPathByCategory(category);
  const href = `/${parentCatalog}/${slug}`;
  const primaryImg = galleryImgUrls[0];
  const secondaryImg = galleryImgUrls[1];

  if (!slug) return <div className={styles.item}></div>;
  return (
    <Link href={href}>
      <a className={styles.item}>
        <div
          className={classnames(styles.mainImgWrapper, {
            [styles.mainImgWrapperHover]: !!secondaryImg,
          })}
        >
          <Image
            className={styles.img}
            src={primaryImg}
            alt={itemName}
            width={386}
            height={390}
            layout="responsive"
          />
        </div>
        {secondaryImg && (
          <div className={styles.additionalImgWrapper}>
            <Image
              className={styles.img}
              src={secondaryImg}
              alt={itemName}
              width={386}
              height={390}
              layout="responsive"
            />
          </div>
        )}
        <div className={styles.desc}>
          <div>
            <p className={styles.name}>{itemName}</p>
            <p className={styles.price}>
              {fullPrice} <span>/ {t.common.amount} </span>
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export const Catalog: React.FC<CatalogProps> = ({ list, isLoading }) => {
  if (isLoading)
    return (
      <div className={styles.wrapper}>
        {[1, 2, 3].map((item) => (
          <Item
            key={item}
            id={item}
            slug=""
            name={{ en: "", ru: "", ro: "" }}
            galleryImgUrls={[]}
            price={{ en: "", ru: "", ro: "" }}
            category={1}
          />
        ))}
      </div>
    );

  if (!list.length && !isLoading) return null;

  return (
    <div className={styles.wrapper}>
      {list.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};
