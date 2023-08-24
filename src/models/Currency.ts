import { makeAutoObservable } from "mobx";

export class Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  name_plural: string;

  constructor(data: {
    code: string;
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    name_plural: string;
    id: string;
  }) {
    this.id = data.id;
    this.code = data.code;
    this.symbol = data.symbol;
    this.name = data.name;
    this.symbol_native = data.symbol_native;
    this.decimal_digits = data.decimal_digits;
    this.rounding = data.rounding;
    this.name_plural = data.name_plural;

    makeAutoObservable(this);
  }
}
