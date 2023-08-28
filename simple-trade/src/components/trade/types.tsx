import { Currency } from "../../models/Currency";

export enum Modes {
  picking = "picking",
  buy = "buy",
  sell = "sell",
}

export interface CurrencyPair {
  base_currency: Currency;
  quote_currency: Currency;
}
