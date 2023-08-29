import { makeAutoObservable } from "mobx";

interface IProductCartResource {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface ICartResource {
  id: number;
  products: IProductCartResource[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export class Cart {
  id: number;
  products: IProductCartResource[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;

  private constructor(data: ICartResource) {
    this.id = data.id;
    this.products = data.products;
    this.total = data.total;
    this.discountedTotal = data.discountedTotal;
    this.userId = data.userId;
    this.totalProducts = data.totalProducts;
    this.totalQuantity = data.totalQuantity;

    makeAutoObservable(this);
  }

  static create(data: ICartResource) {
    return new Cart(data);
  }
}
