import { autorun, makeAutoObservable } from "mobx";
import { CoinSimpleResource } from "../../services/crypto/coins/types";

export class Coins {
  coins: CoinSimpleResource[] = [];

  constructor() {
    makeAutoObservable(this);

    const coins = localStorage.getItem("stores.coins");
    this.setCoins(coins ? (JSON.parse(coins) as CoinSimpleResource[]) : []);

    autorun(() => {
      localStorage.setItem("stores.coins", JSON.stringify(this.coins));
    });
  }

  setCoins(coins: CoinSimpleResource[]) {
    this.coins = coins;
  }

  addCoin(coin: CoinSimpleResource) {
    this.coins.push(coin);
    return coin;
  }

  findCoin(coin_id: string) {
    const coin = this.coins.find(({ id }) => id === coin_id);

    if (!coin) {
      throw new Error("Please make sure to use a valid currency code");
    }

    return coin;
  }
}
