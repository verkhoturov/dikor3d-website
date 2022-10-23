import React from "react";
import styles from "./index.module.css";
import classnames from "classnames";
import { H1 } from "../index";

export const Hero: React.FC<{
  title: string;
  subtitle?: string;
  bgImg?: string;
}> = ({ title, subtitle, bgImg }) => (
  <header
    className={classnames(styles.wrapper, { [styles.wrapperBg]: !!bgImg })}
    style={bgImg ? { backgroundImage: `url(${bgImg})` } : {}}
  >
    <div className={styles.inner}>
      <H1>{title}</H1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  </header>
);
