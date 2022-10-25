import React from "react";
import styles from "./index.module.css";
import classnames from "classnames";
import { H1 } from "../index";

interface ContainerProps {
  children: React.ReactNode;
  tagName?: "header" | "section" | "div";
  className: string;
  style: React.CSSProperties;
}

const Container = ({ children, tagName, className, style }: ContainerProps) => {
  if (tagName === "header")
    return (
      <header className={className} style={style}>
        {children}
      </header>
    );
  if (tagName === "section")
    return (
      <section className={className} style={style}>
        {children}
      </section>
    );
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export const Hero: React.FC<{
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  bgImg?: string;
  isWhiteText?: boolean;
  tag?: "header" | "section" | "div";
}> = ({ title, subtitle, bgImg, isWhiteText, tag = "header" }) => {
  return (
    <Container
      className={classnames(styles.wrapper, {
        [styles.wrapperBg]: !!bgImg,
        [styles.wrapperWhiteText]: isWhiteText,
      })}
      style={bgImg ? { backgroundImage: `url(${bgImg})` } : {}}
      tagName={tag}
    >
      <div className={styles.inner}>
        <H1>{title}</H1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </Container>
  );
};
