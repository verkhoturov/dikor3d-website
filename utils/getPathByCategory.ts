import { Category } from "../lib/types";

export const getPathByCategory = (category: Category) => {
  if (category === Category.CLASSIC) return "catalog-classic";
  if (category === Category.PLATINUM) return "catalog-platinum";
  if (category === Category.PREMIUM) return "catalog-premium";
  if (category === Category.SHINE) return "catalog-shine";
};
