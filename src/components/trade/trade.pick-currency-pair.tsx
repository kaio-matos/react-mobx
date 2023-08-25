import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch";
import { Currency } from "../../models/Currency";
import { CryptoService } from "../../services";
import { useStore } from "../../stores";
import { CurrencyPair } from "./types";

export const PickCurrencyPair = observer(function PickCurrencyPair(props: {
  currencyPair: CurrencyPair | null;
  onSelect: (pair: CurrencyPair) => void;
  isSelecting: () => void;
}) {
  const [baseCurrency, setBaseCurrency] = useState<Currency | undefined>(
    props?.currencyPair?.base_currency
  );
  const [quoteCurrency, setQuoteCurrency] = useState<Currency | undefined>(
    props?.currencyPair?.quote_currency
  );

  const { coinsStore } = useStore();
  const half = coinsStore.coins.slice(0, 20); // todo: lazy select

  const { execute: getCurrency, isLoading: isGettingCurrency } = useFetch(
    CryptoService.Coins.get.bind(CryptoService.Coins),
    null
  );

  const setBaseCurrencyId = async (id: string) => {
    const coin = await getCurrency(id);

    if (coin) {
      setBaseCurrency(coin);
    }
  };

  const setQuoteCurrencyId = async (id: string) => {
    const coin = await getCurrency(id);

    if (coin) {
      setQuoteCurrency(coin);
    }
  };

  useEffect(() => {
    props.isSelecting();
  }, [isGettingCurrency]);

  useEffect(() => {
    if (baseCurrency && quoteCurrency) {
      props.onSelect({
        base_currency: baseCurrency,
        quote_currency: quoteCurrency,
      });
    }
  }, [baseCurrency, quoteCurrency]);

  useEffect(() => {
    setBaseCurrency(props.currencyPair?.base_currency);
    setQuoteCurrency(props.currencyPair?.quote_currency);
  }, [props.currencyPair]);

  return (
    <section>
      <div>
        <p>Buying:</p>
        <select
          className="text-black w-44"
          onChange={(ev) => setBaseCurrencyId(ev.target.value)}
          value={baseCurrency?.id ?? ""}
        >
          <option value="" />

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
          value={quoteCurrency?.id ?? ""}
        >
          <option value="" />

          {half.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} | {coin.symbol}
            </option>
          ))}
        </select>
      </div>

      {isGettingCurrency && <b>Loading...</b>}
    </section>
  );
});
