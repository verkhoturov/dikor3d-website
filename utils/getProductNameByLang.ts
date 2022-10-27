import { MultiLanguageContent } from "../lib/types";

export const getProductNameByLang = (
  locale: string,
  name?: MultiLanguageContent
) => {
  if (!name) return "";
  if (locale === "en") return name.en;
  if (locale === "ru") return name.rus;
  if (locale === "ro") return name.rom;
  return name.rus;
};
