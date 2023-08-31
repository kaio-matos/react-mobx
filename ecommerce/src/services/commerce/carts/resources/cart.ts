import { makeAutoObservable } from "mobx";
import { Amount } from "../../../../models/Amount";

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
  products: {
    id: number;
    title: string;
    price: Amount;
    quantity: number;
    total: Amount;
    discountPercentage: number;
    discountedPrice: Amount;
  }[];
  total: Amount;
  discountedTotal: Amount;
  userId: number;
  totalProducts: number;
  totalQuantity: number;

  constructor(data: ICartResource) {
    this.id = data.id;
    this.products = data.products.map((product) => ({
      ...product,
      price: Amount.create({ value: product.price }),
      total: Amount.create({ value: product.total }),
      discountedPrice: Amount.create({ value: product.discountedPrice }),
    }));
    this.total = Amount.create({ value: data.total });
    this.discountedTotal = Amount.create({ value: data.discountedTotal });
    this.userId = data.userId;
    this.totalProducts = data.totalProducts;
    this.totalQuantity = data.totalQuantity;

    makeAutoObservable(this);
  }

  static create(data: ICartResource) {
    return new Cart(data);
  }
}
