import React from "react";
import { H2, Paragraph, Button } from "../common";
import { FeedbackModal } from "../feedback";

import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";

import styles from "./index.module.css";

interface ItemProps {
  desc: string | React.ReactNode;
  iconLink?: string;
}

const Item: React.FC<ItemProps> = ({ desc, iconLink }) => {
  return (
    <li className={styles.item}>
      <i
        className={styles.icon}
        style={iconLink ? { backgroundImage: `url(${iconLink})` } : {}}
      ></i>
      <Paragraph>{desc}</Paragraph>
    </li>
  );
};

export const Conditions = () => {
  const router = useRouter();
  const t = useLang(router.locale);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className={styles.titleWapper}>
      <div className={styles.titleWapper}>
        <H2>{t.conditions.title}</H2>
      </div>
      <div className={styles.subtitleWapper}>
        <h3>{t.conditions.subtitle}</h3>
      </div>

      <ul className={styles.list}>
        <Item desc={t.conditions.list.item1} />
        <Item desc={t.conditions.list.item2} />
        <Item desc={t.conditions.list.item3} />

        <Item desc={t.conditions.list.item4} />
        <Item desc={t.conditions.list.item5} />
        <Item desc={t.conditions.list.item6} />
      </ul>

      <div className={styles.btnWrapper}>
        <Button onClick={() => setShowModal(true)}>{t.common.request}</Button>
      </div>

      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
