import { IProductResource } from "./resources/cart";

export type tProducts = {
  products: IProductResource[];
  total: number;
  skip: number;
  limit: number;
};
