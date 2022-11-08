import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classnames from "classnames";
import { CatalogItem } from "../../lib/types";
import { useLang } from "../../utils/useLang";
import { getProductNameByLang } from "../../utils/getProductNameByLang";
import { getPathByCategory } from "../../utils/getPathByCategory";
import { getPriceByLang } from "../../utils/getPriceByLang";

import styles from "./index.module.css";

interface CatalogProps {
  list: CatalogItem[];
  isLoading: boolean;
}

const Item: React.FC<CatalogItem> = ({
  slug,
  name,
  imgLink,
  priceMDL,
  priceEUR,
  additionalImgLink_1,
  category,
}) => {
  const router = useRouter();
  const locale = router.locale;
  const t = useLang(locale);

  const itemName = getProductNameByLang(locale, name);
  const parentCatalog = getPathByCategory(category);
  const price = getPriceByLang(priceMDL, priceEUR, locale);
  const href = `/${parentCatalog}/${slug}`;

  if (!slug) return <div className={styles.item}></div>;
  return (
    <Link href={href}>
      <a className={styles.item}>
        <div
          className={classnames(styles.mainImgWrapper, {
            [styles.mainImgWrapperHover]: !!additionalImgLink_1,
          })}
        >
          <Image
            className={styles.img}
            src={imgLink}
            alt={itemName}
            width={386}
            height={390}
            layout="responsive"
          />
        </div>
        {additionalImgLink_1 && (
          <div className={styles.additionalImgWrapper}>
            <Image
              className={styles.img}
              src={additionalImgLink_1}
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
              {price} <span>/ {t.common.amount} </span>
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
            name={{ en: "", rus: "", rom: "" }}
            imgLink=""
            priceMDL=""
            priceEUR=""
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
