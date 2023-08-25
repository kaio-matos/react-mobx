import { Amount } from "../../../models/Amount";
import { CoinPrice } from "../../../models/CoinPrice";
import { Currency } from "../../../models/Currency";
import { Http } from "../http";
import { CoinResource, CoinSimpleResource } from "./types";

export class Coins extends Http {
  async index() {
    const { data: coins } = await this.http.get<CoinSimpleResource[]>(
      "coins/list"
    );

    return coins;
  }

  async get(id: string) {
    const { data: coin } = await this.http.get<CoinResource>(`coins/${id}`, {
      params: {
        tickers: false,
        market_data: false,
        community_data: false,
        developer_data: false,
        localization: false,
      },
    });

    return new Currency({
      code: coin.id,
      decimal_digits: 8,
      name: coin.name,
      name_plural: coin.name,
      rounding: 0,
      symbol: coin.symbol,
      symbol_native: coin.symbol,
      id: coin.id,
    });
  }

  async getPrice(base_currency: Currency, quote_currency: Currency) {
    // const { data: prices } = await this.http.get<CoinPriceResource[]>(
    //   "coins/markets",
    //   {
    //     params: {
    //       ids: base_currency.id,
    //       vs_currency: quote_currency.id,
    //     },
    //   }
    // );

    return new CoinPrice({
      id: crypto.randomUUID(),
      current_price: new Amount(quote_currency, Math.random() * 100),
      last_updated: new Date().toUTCString(),
    });
  }
}
