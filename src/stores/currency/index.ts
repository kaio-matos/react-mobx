import { makeAutoObservable } from "mobx";
import { Currency } from "../../models/Currency";

export class Currencies {
  currencies: Currency[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCurrency(currency: Currency) {
    this.currencies.push(currency);
    return currency;
  }

  findCurrency(currency_code: string) {
    const currency = this.currencies.find(({ code }) => code === currency_code);

    if (!currency) {
      throw new Error("Please make sure to use a valid currency code");
    }

    return currency;
  }
}
