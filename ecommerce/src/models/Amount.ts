import { makeAutoObservable } from "mobx";

interface IAmountModel {
  value: number;
  currency?: string;
}

export class Amount {
  private _value: number;
  private _currency: string;

  private constructor(data: IAmountModel) {
    this._value = data.value;
    this._currency = data.currency ?? "USD";
    makeAutoObservable(this);
  }

  static create(data: IAmountModel) {
    return new Amount(data);
  }

  get formatted() {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: this._currency,
    }).format(this._value);
  }

  get value() {
    return this._value;
  }

  set value(v: number) {
    this._value = v;
  }
}
