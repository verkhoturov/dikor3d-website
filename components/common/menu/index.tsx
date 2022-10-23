import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import logoImg from "./img/dikor.png";
import instaImg from "./img/instagram.png";

export const Menu: React.FC = () => (
  <header className={styles.header}>
    <Link href="/">
      <a>
        <Image
          className={styles.logo}
          src={logoImg}
          alt="Dikor logo"
          width="90"
          height="35"
        />
      </a>
    </Link>
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/">
            <a>Главная</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/catalog">
            <a>Каталог</a>
          </Link>
        </li>
      </ul>
    </nav>

    <Link href="/">
      <a>
        <Image
          className={styles.socLogo}
          src={instaImg}
          alt="Dikor instagram"
        />
      </a>
    </Link>
  </header>
);
