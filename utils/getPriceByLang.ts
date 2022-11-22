export const getPriceByLang = (
  priceMDL: string | undefined,
  priceEUR: string,
  locale: string,
) => {
  if (locale === "en") return `${priceEUR} eur`;
  if (locale === "ru") return `${priceMDL} mdl`;
  if (locale === "ro") return `${priceMDL} mdl`;
};
