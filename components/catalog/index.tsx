import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classnames from "classnames";
import { CatalogItem } from "../../lib/types";
import { getProductNameByLang } from "../../utils/getProductNameByLang";

import styles from "./index.module.css";

interface CatalogProps {
  list: CatalogItem[];
  isLoading: boolean;
}

const Item: React.FC<CatalogItem> = ({
  slug,
  name,
  imgLink,
  price,
  additionalImgLink_1,
}) => {
  const router = useRouter();
  const locale = router.locale;

  const itemName = getProductNameByLang(locale, name);

  if (!slug) return <div className={styles.item}></div>;
  return (
    <Link href={`/catalog/${slug}`}>
      <a className={styles.item}>
        <div
          className={classnames(styles.mainImgWrapper, {
            [styles.mainImgWrapperHover]: !!additionalImgLink_1,
          })}
        >
          <Image
            className={styles.img}
            // loader={() => imgLink}
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
              // loader={() => additionalImgLink_1}
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
              {price} р. <span>/ шт </span>
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
        <Item
          id={0}
          slug=""
          name={{ en: "", rus: "", rom: "" }}
          imgLink=""
          price=""
        />
        <Item
          id={0}
          slug=""
          name={{ en: "", rus: "", rom: "" }}
          imgLink=""
          price=""
        />
        <Item
          id={0}
          slug=""
          name={{ en: "", rus: "", rom: "" }}
          imgLink=""
          price=""
        />
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
