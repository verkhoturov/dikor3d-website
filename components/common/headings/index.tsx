import React from "react";
import styles from "./index.module.css";
import classnames from "classnames";

export const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className={styles.pageTitle}>{children}</h1>
);

export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className={styles.h2}>{children}</h2>
);

export const Paragraph: React.FC<{
  children: React.ReactNode;
  textAlignCenter?: boolean;
}> = ({ children, textAlignCenter }) => (
  <p className={classnames(styles.p, { [styles.pCenter]: textAlignCenter })}>
    {children}
  </p>
);
