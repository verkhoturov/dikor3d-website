import React from "react";
import Image from "next/image";
import { H2, Paragraph, Button } from "../common";
import { FeedbackModal } from "../feedback";

import prodImg from "./img/prod.jpeg";

import styles from "./index.module.css";

export const OurProduction = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgCol}>
        <Image
          className={styles.img}
          src={prodImg.src}
          alt="Наше производство"
          width={678}
          height={430}
          layout="responsive"
        />
      </div>

      <div className={styles.descCol}>
        <div className={styles.titleWapper}>
          <H2>Наше производство</H2>
        </div>

        <Paragraph>
          Мы изготавливаеи и представляем именно ту продукцию, которая сейчас во
          всем мире находится на пике популярности ремонта и отделки. Данный вид
          отделки регулярно попадает в проекты ведущих дизайнеров и архитекторов
          во всем мире!
        </Paragraph>

        <Paragraph>
          Мы производим 3д плиты на заказы по индивидуальным чертежам. Это может
          быть любая геометрия, либо художественный рисунок любой сложности
        </Paragraph>

        <Button onClick={() => setShowModal(true)}>Связаться с нами</Button>
      </div>

      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
