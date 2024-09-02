import React from "react";
import Link from "next/link";
import classnames from "classnames";
import styles from "./index.module.css";
import { ArrowIcon } from "./img/arrow";
import { useRouter } from "next/router";

export const LangSwitcher = () => {
  const router = useRouter();
  const locale = router.locale;
  const pathname = router.asPath;

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

        <div
          className={classnames(styles.iconWrapper, {
            [styles.iconWrapperOpen]: isOpen,
          })}
        >
          <ArrowIcon />
        </div>
      </div>

      {isOpen && (
        <div className={styles.listLang}>
          {locale !== "en" && (
            <Link href={`/${pathname}`} locale="en" legacyBehavior>
              <a onClick={() => setIsOpen(false)}>
                <span className={styles.lang}>Eng</span>
              </a>
            </Link>
          )}
          {locale !== "ru" && (
            <Link href={`/${pathname}`} locale="ru" legacyBehavior>
              <a onClick={() => setIsOpen(false)}>
                <span className={styles.lang}>Rus</span>
              </a>
            </Link>
          )}
          {locale !== "ro" && (
            <Link href={`/${pathname}`} locale="ro" legacyBehavior>
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
