import React from "react";
import Image from "next/legacy/image";
import { H2, Paragraph, Button } from "../common";
import { FeedbackModal } from "../feedback";

import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";

import prodImg from "./img/prod.jpeg";

import styles from "./index.module.css";

export const OurProduction = () => {
  const router = useRouter();
  const t = useLang(router.locale);
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgCol}>
        <Image
          className={styles.img}
          src={prodImg.src}
          alt={t.ourProdaction.title}
          width={678}
          height={430}
          layout="responsive"
        />
      </div>

      <div className={styles.descCol}>
        <div className={styles.titleWapper}>
          <H2>{t.ourProdaction.title}</H2>
        </div>

        <Paragraph>{t.ourProdaction.desc1}</Paragraph>
        <Paragraph>{t.ourProdaction.desc2}</Paragraph>

        <Button onClick={() => setShowModal(true)}>{t.common.request}</Button>
      </div>

      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
