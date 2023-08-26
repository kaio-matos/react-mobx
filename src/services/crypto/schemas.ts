import { z } from "zod";

export const CurrencySchema = z.object({
  code: z.string(),
  decimal_digits: z.number(),
  name: z.string(),
  name_plural: z.string(),
  rounding: z.number(),
  symbol: z.string(),
  symbol_native: z.string(),
  id: z.string(),
  min_order_amount: z.number(),
});
