import React from "react";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";
import { LangSwitcher } from "../lang-switcher";

import styles from "./index.module.css";

import logoImg from "./img/dikor.png";
import instaImg from "./img/instagram.png";

const Burger = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className={classnames(styles.burgerWrapper, {
      [styles.burgerWrapperOpen]: isOpen,
    })}
  >
    <div className={styles.burgerLine}></div>
  </button>
);

const List = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/catalog-premium">
          <a>Premium</a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/catalog-shine">
          <a>Shine</a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/catalog-platinum">
          <a>Platinum</a>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="/catalog-classic">
          <a>Classic</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export const Menu: React.FC = () => {
  const [openMobileMenu, setOpenMobileMenu] = React.useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <a>
            <Image
              className={styles.logo}
              src={logoImg}
              alt="Dikor logo"
              width="90"
              height="35"
              layout="responsive"
            />
          </a>
        </Link>
      </div>

      <div className={styles.desktopMenuWrapper}>
        <List />
      </div>

      <div className={styles.contactsWrapper}>
        <a href="tel:+37376740995">{`+ 373 (767) 409 95`}</a>
        <a
          href="tel:+40745472526"
          className={styles.hideAtMob}
        >{`+40 (745) 472 526`}</a>
      </div>

      <div
        className={styles.socAndLangWrapper}
        onClick={() => setOpenMobileMenu(false)}
      >
        <LangSwitcher />

        <Link href="/">
          <a>
            <Image
              className={styles.socLogo}
              src={instaImg}
              alt="Dikor instagram"
            />
          </a>
        </Link>
      </div>

      <div className={styles.mobileMenuWrapper}>
        <Burger
          isOpen={openMobileMenu}
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
        />

        {openMobileMenu && (
          <div className={styles.mobileMenu}>
            <List />
          </div>
        )}
      </div>
    </header>
  );
};
