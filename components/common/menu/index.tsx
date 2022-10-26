import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import logoImg from "./img/dikor.png";
import instaImg from "./img/instagram.png";

import { useRouter } from "next/router";
import { useLang } from "../../../utils/useLang";

const LangSwitch = () => {
  const router = useRouter();
  const locale = router.locale;

  const getLangName = (locale: string) => {
    if (locale === "en") return "Eng";
    if (locale === "ru") return "Rus";
    if (locale === "ro") return "Rom";
    return "Rus";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectedLang}>
        <span className={styles.lang}>{getLangName(locale)}</span>
      </div>
      <div className={styles.listLang}>
        {locale !== "en" && (
          <Link href="/" locale="en">
            <a>
              <span className={styles.lang}>Eng</span>
            </a>
          </Link>
        )}
        {locale !== "ru" && (
          <Link href="/" locale="ru">
            <a>
              <span className={styles.lang}>Rus</span>
            </a>
          </Link>
        )}
        {locale !== "ro" && (
          <Link href="/" locale="ro">
            <a>
              <span className={styles.lang}>Rom</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export const Menu: React.FC = () => {
  const router = useRouter();
  const t = useLang(router.locale);

  return (
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
              <a>{t.menu.main}</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/catalog">
              <a>{t.menu.catalog}</a>
            </Link>
          </li>
        </ul>
        <LangSwitch />
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
};
