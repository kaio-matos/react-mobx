import { Currency } from "../../../models/Currency";

export interface OrderResource {
  id: string;
  price: number;
  base_currency: Currency;
  quote_currency: Currency;
  side: "buy" | "sell";
  amount: number;
  created_at: string;
}
