import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { LangSwitcher } from "../lang-switcher";
import { useLang } from "../../../utils/useLang";

import styles from "./index.module.css";
import logoImg from "./img/dikor.png";
import instaImg from "./img/instagram.png";

export const Menu: React.FC = () => {
  const router = useRouter();
  const t = useLang(router.locale);

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
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/">
              <a>{t.menu.main}</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/catalog">
              <a>{t.menu.catalog}</a>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.socAndLangWrapper}>
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
    </header>
  );
};
