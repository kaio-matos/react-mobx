import { makeAutoObservable } from "mobx";

export class Currency {
  code: string;
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  name_plural: string;
  market_price: number;

  constructor(data: {
    code: string;
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    name_plural: string;
    market_price: number;
  }) {
    this.code = data.code;
    this.symbol = data.symbol;
    this.name = data.name;
    this.symbol_native = data.symbol_native;
    this.decimal_digits = data.decimal_digits;
    this.rounding = data.rounding;
    this.name_plural = data.name_plural;
    this.market_price = data.market_price;

    makeAutoObservable(this);
  }
}
