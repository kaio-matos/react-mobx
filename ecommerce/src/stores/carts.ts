import { makeAutoObservable } from "mobx";
import { Cart } from "../services/commerce/carts/resources/cart";

export class Carts {
  carts: Cart[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCarts(carts: Cart[]) {
    this.carts = [...new Set(carts)];
  }

  addCart(cart: Cart) {
    this.carts.push(cart);
    this.carts = [...new Set(this.carts)];
  }
}
