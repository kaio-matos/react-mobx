import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Currency } from "../../models/Currency";
import { useStore } from "../../stores";
import { useFetch } from "../../hooks/fetch";
import { CryptoService } from "../../services";
import { Coin } from "../../services/crypto/coins/types";
import { Amount } from "../../models/Amount";

enum Modes {
  picking,
  buy,
}

interface CurrencyPair {
  base_currency: Currency;
  quote_currency: Currency;
}

const PickCurrencyPair = observer(function PickCurrencyPair(props: {
  onSelect: (pair: CurrencyPair) => void;
}) {
  const [baseCurrency, setBaseCurrency] = useState<Currency>();
  const [quoteCurrency, setQuoteCurrency] = useState<Currency>();

  const { coinsStore } = useStore();
  const half = coinsStore.coins.slice(0, 20); // todo: lazy select

  const { execute: getCoinDataById, isLoading } = useFetch(
    (id: string) => CryptoService.Coins.get(id),
    null
  );

  const createCurrencyFromCoin = (coin: Coin) =>
    new Currency({
      code: coin.id,
      decimal_digits: 8,
      name: coin.name,
      name_plural: coin.name,
      rounding: 0,
      symbol: coin.symbol,
      symbol_native: coin.symbol,
      id: coin.id,
    });

  const setBaseCurrencyId = async (id: string) => {
    const coin = await getCoinDataById(id);

    if (coin) {
      setBaseCurrency(createCurrencyFromCoin(coin));
    }
  };

  const setQuoteCurrencyId = async (id: string) => {
    const coin = await getCoinDataById(id);

    if (coin) {
      setQuoteCurrency(createCurrencyFromCoin(coin));
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
          className="text-black"
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
          className="text-black"
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

export const TradeAmountInput = observer(function TradeAmountInput(props: {
  amount: Amount;
  onChange: (v: number) => void;
}) {
  const [value, setValue] = useState(String(props.amount.value));
  const [isFocused, setFocus] = useState(false);

  useEffect(() => {
    props.onChange(Number(value));
  }, [value]);

  useEffect(() => {
    setValue(String(props.amount.value));
  }, [props.amount.value]);

  return (
    <input
      type="text"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={isFocused ? value : props.amount.formatted}
      className="text-black"
      onChange={(e) => {
        let value = e.target.value;
        value = value.replace(",", ".");

        setValue(value);
      }}
    />
  );
});

export const TradeForm = observer(function TradeForm() {
  const [mode, setMode] = useState(Modes.picking);

  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>();

  const [amount, setAmount] = useState<Amount>();

  useEffect(() => {
    if (currencyPair?.quote_currency) {
      setAmount(new Amount(currencyPair.base_currency, 0));
    }
  }, [currencyPair]);

  return (
    <div>
      <PickCurrencyPair
        onSelect={(pair) => {
          setMode(Modes.buy);
          setCurrencyPair(pair);
        }}
      />

      {currencyPair && amount && (
        <div className="mt-5">
          <p>Amount: </p>
          <TradeAmountInput
            amount={amount}
            onChange={(v) => {
              setAmount(new Amount(amount.currency, v));
            }}
          />
        </div>
      )}
    </div>
  );
});
