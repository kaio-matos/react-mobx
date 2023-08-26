import { makeAutoObservable } from "mobx";
import { Amount } from "./Amount";

export class Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  name_plural: string;

  min_order_amount: Amount;

  constructor(data: {
    code: string;
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    name_plural: string;
    id: string;
    min_order_amount: number;
  }) {
    this.id = data.id;
    this.code = data.code;
    this.symbol = data.symbol;
    this.name = data.name;
    this.symbol_native = data.symbol_native;
    this.decimal_digits = data.decimal_digits;
    this.rounding = data.rounding;
    this.name_plural = data.name_plural;
    this.min_order_amount = new Amount(this, data.min_order_amount);

    makeAutoObservable(this);
  }

  get object() {
    return {
      id: this.id,
      code: this.code,
      symbol: this.symbol,
      name: this.name,
      symbol_native: this.symbol_native,
      decimal_digits: this.decimal_digits,
      rounding: this.rounding,
      name_plural: this.name_plural,
      min_order_amount: this.min_order_amount.value,
    };
  }
}
