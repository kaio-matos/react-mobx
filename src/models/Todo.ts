import { makeAutoObservable } from "mobx";
import { Currency } from "./Currency";

export class Todo {
  id: number;
  title: string;
  price: Currency;

  constructor(id: number, title: string, price: Currency) {
    this.id = id;
    this.title = title;
    this.price = price;
    makeAutoObservable(this);
  }
}
