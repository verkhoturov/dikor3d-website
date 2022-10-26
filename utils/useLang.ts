import { en } from "../locales/en";
import { ru } from "../locales/ru";
import { ro } from "../locales/ro";

export const useLang = (locale?: string) => {
  if (locale === "en") return en;
  if (locale === "ru") return ru;
  if (locale === "ro") return ro;
  return ru;
};
