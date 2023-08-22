import { makeAutoObservable } from "mobx";
import { Currency } from "./Currency";

export class Amount {
  currency: Currency;
  value: number;

  constructor(currency: Currency, value: number) {
    this.currency = currency;
    this.value = value;
    makeAutoObservable(this);
  }

  private get formatter() {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: this.currency.code,
    });
  }

  get formatted() {
    return this.formatter.format(this.value);
  }
}
