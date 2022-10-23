import React from "react";
import classnames from "classnames";
import styles from "./index.module.css";

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className={styles.mainContainer}>{children}</main>
);

export const TitleContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <header className={styles.titleContainer}>{children}</header>;

export const Section: React.FC<{
  children: React.ReactNode;
  isGrayBg?: boolean;
  noPadding?: boolean;
  style?: React.CSSProperties;
}> = ({ children, isGrayBg, noPadding, style }) => {
  if (isGrayBg)
    return (
      <section
        className={classnames(
          styles.sectionContainer,
          styles.sectionContainerGrayBg
        )}
      >
        <div className={styles.sectionInner}>{children}</div>
      </section>
    );
  return (
    <section
      className={classnames(styles.sectionContainer, {
        [styles.sectionPadding0]: noPadding,
      })}
      style={style}
    >
      {children}
    </section>
  );
};
