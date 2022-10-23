import React from "react";
import styles from "./index.module.css";
import { H2, Paragraph } from "../common";

export const Delivery = () => (
  <div className={styles.wrapper}>
    <div className={styles.titleWapper}>
      <H2>ABOUT DELIVERY</H2>
    </div>

    <div className={styles.inner}>
      <Paragraph textAlignCenter>
        Pick up the goods from our warehouse for free, or use courier service on
        the territory of the city and its environs for $35. Mail delivery is
        available throughout Europe. Contact us to learn more about delivery.
      </Paragraph>
    </div>
  </div>
);
