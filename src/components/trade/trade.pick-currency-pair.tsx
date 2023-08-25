import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch";
import { Currency } from "../../models/Currency";
import { CryptoService } from "../../services";
import { useStore } from "../../stores";
import { CurrencyPair } from "./types";

export const PickCurrencyPair = observer(function PickCurrencyPair(props: {
  onSelect: (pair: CurrencyPair) => void;
}) {
  const [baseCurrency, setBaseCurrency] = useState<Currency>();
  const [quoteCurrency, setQuoteCurrency] = useState<Currency>();

  const { coinsStore } = useStore();
  const half = coinsStore.coins.slice(0, 20); // todo: lazy select

  const { execute: getCoinDataById, isLoading } = useFetch(
    CryptoService.Coins.get.bind(CryptoService.Coins),
    null
  );

  const setBaseCurrencyId = async (id: string) => {
    const coin = await getCoinDataById(id);

    if (coin) {
      setBaseCurrency(coin);
    }
  };

  const setQuoteCurrencyId = async (id: string) => {
    const coin = await getCoinDataById(id);

    if (coin) {
      setQuoteCurrency(coin);
    }
  };

  useEffect(() => {
    if (baseCurrency && quoteCurrency) {
      props.onSelect({
        base_currency: baseCurrency,
        quote_currency: quoteCurrency,
      });
    }
  }, [baseCurrency, quoteCurrency]);

  return (
    <section>
      <div>
        <p>Buying:</p>
        <select
          className="text-black w-44"
          onChange={(ev) => setBaseCurrencyId(ev.target.value)}
        >
          <option />

          {half.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} | {coin.symbol}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p>Selling:</p>
        <select
          className="text-black w-44"
          onChange={(ev) => setQuoteCurrencyId(ev.target.value)}
        >
          <option />

          {half.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} | {coin.symbol}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <b>Loading...</b>}
    </section>
  );
});
