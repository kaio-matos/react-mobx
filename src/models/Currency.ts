import { makeAutoObservable } from "mobx";

export class Currency {
  currency: string;
  value: number;

  constructor(currency: string, value: number) {
    this.currency = currency;
    this.value = value;
    makeAutoObservable(this);
  }

  get formatted() {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: this.currency,
    }).format(this.value);
  }
}
