import React from "react";
import { H2, Paragraph, Button } from "../common";
import { FeedbackModal } from "../feedback";

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
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className={styles.titleWapper}>
      <div className={styles.titleWapper}>
        <H2>
          Условия для <br />
          наших покупателей
        </H2>
      </div>
      <div className={styles.subtitleWapper}>
        <h3>
          Мы гарантируем тщательный и индивидуальный
          <br />
          подход к каждому нашему клиенту
        </h3>
      </div>

      <ul className={styles.list}>
        <Item desc="Выезд на объект дизайнера, подробная консультация, подбор коллекции, замер" />
        <Item desc="Возможность изготовления любого дизайна ЗD панелей по вашему предпочтению" />
        <Item desc="Каждый элемент имеет собственнуюгерметичную упаковку" />

        <Item desc="Гарантия качества материалов, натуральность и экологическая чистота" />
        <Item desc="Доставка по Молдове за 48 часов, транспортной компанией ”новая почта”" />
        <Item desc="У всей нашей продукции есть сертификация" />
      </ul>


      <div className={styles.btnWrapper}>
          <Button onClick={() => setShowModal(true)}>
          Связаться с менеджером
          </Button>
        </div>

      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
