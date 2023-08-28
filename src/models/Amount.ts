import { makeAutoObservable } from "mobx";
import { Currency } from "./Currency";

export class Amount {
  private _currency: Currency;
  private _value: number;

  constructor(currency: Currency, value: number) {
    this._currency = currency;
    this._value = value;
    makeAutoObservable(this);
  }

  // Exposed variables via getters and setters for better reactivity
  get value() {
    return this._value;
  }

  set value(v: number) {
    this._value = v;
  }

  get currency() {
    return this._currency;
  }

  set currency(currency: Currency) {
    this._currency = currency;
  }

  private get formatter() {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: this._currency.code,
      });
    } catch {
      // fallback
      return {
        format: (n: number) =>
          `${this._currency.symbol} ${n.toFixed(
            this._currency.decimal_digits
          )}`,
      };
    }
  }

  get formatted() {
    return this.formatter.format(this._value);
  }
}
