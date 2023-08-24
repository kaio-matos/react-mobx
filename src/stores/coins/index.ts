import { autorun, makeAutoObservable } from "mobx";
import { CoinSimple } from "../../services/crypto/coins/types";

export class Coins {
  coins: CoinSimple[] = [];

  constructor() {
    makeAutoObservable(this);

    const coins = localStorage.getItem("stores.coins");
    this.setCoins(coins ? (JSON.parse(coins) as CoinSimple[]) : []);

    autorun(() => {
      localStorage.setItem("stores.coins", JSON.stringify(this.coins));
    });
  }

  setCoins(coins: CoinSimple[]) {
    this.coins = coins;
  }

  addCoin(coin: CoinSimple) {
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
