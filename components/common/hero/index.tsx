import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import classnames from "classnames";
import { H1 } from "../index";
import { Button } from "../button";

interface ContainerProps {
  children: React.ReactNode;
  tagName?: "header" | "section" | "div";
  className: string;
  style?: React.CSSProperties;
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
  button?: {
    text: string;
    onClick: () => void;
  };
  height?: number;
}> = ({
  title,
  subtitle,
  bgImg,
  height = 560,
  isWhiteText,
  tag = "header",
  button,
}) => {
  return (
    <Container
      className={classnames(styles.wrapper, {
        [styles.wrapperBg]: !!bgImg,
        [styles.wrapperWhiteText]: isWhiteText,
      })}
      tagName={tag}
    >
      <div className={styles.bgImg}>
        <div className={styles.bgImgInner}>
          <Image
            src={bgImg}
            width={1198}
            height={height}
            // layout="responsive"
          />
        </div>
      </div>
      <div className={styles.inner}>
        <H1>{title}</H1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {button && <Button onClick={button.onClick}>{button.text}</Button>}
      </div>
    </Container>
  );
};
