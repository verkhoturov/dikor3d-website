import React from "react";
import Link from "next/link";
import Image from "next/image";
import { H2, Paragraph } from "../common";

import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";

import itemImg_1 from "./img/item-1.png";
import itemImg_3 from "./img/item-2.png";
import itemImg_2 from "./img/item-3.png";

import styles from "./index.module.css";

interface ItemProps {
  content: { main: string | React.ReactNode; desc: string | React.ReactNode };
  imgLink: string;
  href: string;
  isMobile: boolean;
}

const Item: React.FC<ItemProps> = ({ content, imgLink, href, isMobile }) => {
  const router = useRouter();
  const t = useLang(router.locale);

  return (
    <div
      className={styles.item}
      onClick={() => (isMobile ? router.push(href) : {})}
    >
      <Image
        className={styles.img}
        src={imgLink}
        alt="Dikor catalog"
        width={386}
        height={390}
        layout="responsive"
      />

      <div className={styles.content}>
        <Paragraph>
          <span>{content.main}</span>{" "}
          <span className={styles.desc}>{content.desc}</span>
        </Paragraph>

        <Link href={href}>
          <a>{t.productCatalog.link}</a>
        </Link>
      </div>
    </div>
  );
};

export const ProductCatalog = () => {
  const router = useRouter();
  const t = useLang(router.locale);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  console.log("isMobile", isMobile);

  return (
    <>
      <div className={styles.titleWapper}>
        <H2>{t.productCatalog.title}</H2>
      </div>

      <div className={styles.inner}>
        <Item
          imgLink={itemImg_1.src}
          content={t.productCatalog.card1}
          href="/catalog-premium"
          isMobile={isMobile}
        />
        <Item
          imgLink={itemImg_2.src}
          content={t.productCatalog.card2}
          href="/catalog-shine"
          isMobile={isMobile}
        />
        <Item
          imgLink={itemImg_3.src}
          content={t.productCatalog.card3}
          href="/catalog-platinum"
          isMobile={isMobile}
        />
      </div>
    </>
  );
};
