import { makeAutoObservable } from "mobx";

import { Currency } from "./Currency";
import { Amount } from "./Amount";

export class Order {
  readonly id: string;
  readonly price: Amount;
  readonly base_currency: Currency;
  readonly quote_currency: Currency;
  readonly side: "buy" | "sell";
  readonly amount: Amount;
  readonly created_at: string;

  constructor(data: {
    id: string;
    price: number;
    base_currency: Currency;
    quote_currency: Currency;
    side: "buy" | "sell";
    amount: number;
    created_at: string;
  }) {
    this.id = data.id;
    this.base_currency = data.base_currency;
    this.quote_currency = data.quote_currency;
    this.side = data.side;
    if (data.side === "buy") {
      this.amount = new Amount(data.base_currency, data.amount);
      this.price = new Amount(data.quote_currency, data.price);
    } else {
      this.amount = new Amount(data.quote_currency, data.amount);
      this.price = new Amount(data.base_currency, data.price);
    }
    this.created_at = data.created_at;

    makeAutoObservable(this);
  }
}
