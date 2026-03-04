import { Products } from "../mock";

import { Product, CategoryEnum } from '../types';

export function getProductsByCategory(
  category: CategoryEnum
): Promise<{ data: Product[] | [] }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isValid = Object.values(CategoryEnum).includes(category as any);

      if (isValid) {
        const filtered = Products.filter((item) => item.category === category);
        resolve({ data: filtered });
      } else {
         resolve({ data: Products });
      }
    }, 1000);
  })
}

export function getProductById(id: string): Promise<{ data: Product | undefined }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: Products.find((item) => item.id === id) });
    }, 700);
  })
}
