import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { CatalogItem } from "../../lib/types";

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
  if (!slug) return <div className={styles.item}></div>;
  return (
    <Link href={`/catalog/${slug}`}>
      <a className={styles.item}>
        <div className={styles.mainImgWrapper}>
          <Image
            className={styles.img}
            loader={() => imgLink}
            src={imgLink}
            alt={name}
            width={386}
            height={390}
            layout="responsive"
          />
        </div>
        {additionalImgLink_1 && (
          <div className={styles.additionalImgWrapper}>
            <Image
              className={styles.img}
              loader={() => additionalImgLink_1}
              src={additionalImgLink_1}
              alt={name}
              width={386}
              height={390}
              layout="responsive"
            />
          </div>
        )}
        <div className={styles.desc}>
          <div>
            <p className={styles.name}>{name}</p>
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
        <Item id={0} slug="" name="" imgLink="" price="" />
        <Item id={0} slug="" name="" imgLink="" price="" />
        <Item id={0} slug="" name="" imgLink="" price="" />
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
