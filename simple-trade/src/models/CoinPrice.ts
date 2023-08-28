import { makeAutoObservable } from "mobx";
import { Amount } from "./Amount";

export class CoinPrice {
  id: string;
  current_price: Amount;
  last_updated: string;

  constructor(data: {
    id: string;
    current_price: Amount;
    last_updated: string;
  }) {
    this.id = data.id;
    this.current_price = data.current_price;
    this.last_updated = data.last_updated;

    makeAutoObservable(this);
  }
}
