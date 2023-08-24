import { Http } from "../http";
import { Coin, CoinPrice, CoinSimple } from "./types";

export class Coins extends Http {
  async index() {
    const { data: coins } = await this.http.get<CoinSimple[]>("coins/list");

    return coins;
  }

  async get(id: string) {
    const { data: coin } = await this.http.get<Coin>(`coins/${id}`, {
      params: {
        tickers: false,
        market_data: false,
        community_data: false,
        developer_data: false,
        localization: false,
      },
    });

    return coin;
  }

  async getPrice(coin_id: string, currency_code: string) {
    const { data: prices } = await this.http.get<CoinPrice[]>("coins/markets", {
      params: {
        ids: coin_id,
        vs_currency: currency_code,
      },
    });

    return prices[0];
  }
}
