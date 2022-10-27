import React from "react";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";
import styles from "./index.module.css";
import logoImg from "./img/dikor.png";
import instaImg from "./img/instagram.png";
import { ArrowIcon } from "./img/arrow";

import { useRouter } from "next/router";
import { useLang } from "../../../utils/useLang";

const LangSwitch = () => {
  const router = useRouter();
  const locale = router.locale;

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [wrapperRef, isOpen]);

  const getLangName = (locale: string) => {
    if (locale === "en") return "Eng";
    if (locale === "ru") return "Rus";
    if (locale === "ro") return "Rom";
    return "Rus";
  };

  return (
    <div className={styles.wrapperLang} ref={wrapperRef}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.selectedLang}>
        <span className={styles.lang}>{getLangName(locale)}</span>
      </div>

      <div
        className={classnames(styles.iconWrapper, {
          [styles.iconWrapperOpen]: isOpen,
        })}
      >
        <ArrowIcon />
      </div>

      {isOpen && (
        <div className={styles.listLang}>
          {locale !== "en" && (
            <Link href="/" locale="en">
              <a onClick={() => setIsOpen(false)}>
                <span className={styles.lang}>Eng</span>
              </a>
            </Link>
          )}
          {locale !== "ru" && (
            <Link href="/" locale="ru">
              <a onClick={() => setIsOpen(false)}>
                <span className={styles.lang}>Rus</span>
              </a>
            </Link>
          )}
          {locale !== "ro" && (
            <Link href="/" locale="ro">
              <a onClick={() => setIsOpen(false)}>
                <span className={styles.lang}>Rom</span>
              </a>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

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
        <LangSwitch />

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
