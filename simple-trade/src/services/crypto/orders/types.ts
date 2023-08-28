export interface CurrencyResource {
  code: string;
  decimal_digits: number;
  name: string;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
  id: string;
  min_order_amount: number;
}

export interface OrderResource {
  id: string;
  price: number;
  base_currency: CurrencyResource;
  quote_currency: CurrencyResource;
  side: "buy" | "sell";
  amount: number;
  created_at: string;
}
