import { makeAutoObservable } from "mobx";
import { Amount } from "./Amount";

export class Todo {
  id: number;
  title: string;
  price: Amount;

  constructor(id: number, title: string, price: Amount) {
    this.id = id;
    this.title = title;
    this.price = price;
    makeAutoObservable(this);
  }
}
