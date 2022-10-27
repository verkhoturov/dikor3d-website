import React from "react";
import classnames from "classnames";
import Image from "next/image";
import { H2, Paragraph, Button } from "../common"; 
import { FeedbackModal } from "../feedback";

import surfaceImg from "./img/surface.jpeg";
import cheapImg from "./img/cheap.png";
import ecoImg from "./img/eco.png";
import nocolorImg from "./img/nocolor.png";
import nodustImg from "./img/nodust.png";
import waterproofImg from "./img/waterproof.png";
import protectImg from "./img/protect.png";

import styles from "./index.module.css";

export const Advantages = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWapper}>
        <H2>
          Преимущества <br />
          нашей продукции
        </H2>
      </div>

      <div className={styles.listWrapper}>
        <div className={styles.listImgWrapper}>
          <Image
            className={styles.img}
            src={surfaceImg.src}
            alt="surface"
            width={188}
            height={188}
            layout="responsive"
          />
        </div>
        <ul className={styles.list}>
          <li className={classnames(styles.item, styles.itemWaterproof)}>
            <i
              className={styles.icon}
              style={{ backgroundImage: `url(${waterproofImg.src})` }}
            ></i>
            <Paragraph>Не боятся воды</Paragraph>
          </li>

          <li className={classnames(styles.item, styles.itemProtect)}>
            <i
              className={styles.icon}
              style={{ backgroundImage: `url(${protectImg.src})` }}
            ></i>
            <Paragraph>Защита от царапин</Paragraph>
          </li>

          <li className={classnames(styles.item, styles.itemNocolor)}>
            <i
              className={styles.icon}
              style={{ backgroundImage: `url(${nocolorImg.src})` }}
            ></i>
            <Paragraph>Не нужно краски</Paragraph>
          </li>

          <li className={classnames(styles.item, styles.itemCheap)}>
            <i
              className={styles.icon}
              style={{ backgroundImage: `url(${cheapImg.src})` }}
            ></i>
            <Paragraph>Дешевый монтаж</Paragraph>
          </li>

          <li className={classnames(styles.item, styles.itemNodust)}>
            <i
              className={styles.icon}
              style={{ backgroundImage: `url(${nodustImg.src})` }}
            ></i>
            <Paragraph>Не собирают пыль</Paragraph>
          </li>

          <li className={classnames(styles.item, styles.itemEco)}>
            <i
              className={styles.icon}
              style={{ backgroundImage: `url(${ecoImg.src})` }}
            ></i>
            <Paragraph>Экологически чистые</Paragraph>
          </li>
        </ul>
        <div className={styles.btnWrapper}>
          <Button onClick={() => setShowModal(true)} isSecondary>
            Заказать
          </Button>
        </div>
      </div>
      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

/*

.itemWaterproof 
.itemProtect
.itemNocolor
.itemCheap
.itemNodust
.itemEco


*/
