import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Currency } from "../../models/Currency";
import { useStore } from "../../stores";
import { useFetch, useMountFetch } from "../../hooks/fetch";
import { CryptoService } from "../../services";
import { Coin } from "../../services/crypto/coins/types";
import { Amount } from "../../models/Amount";

enum Modes {
  picking = "picking",
  buy = "buy",
  sell = "sell",
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
    CryptoService.Coins.get.bind(CryptoService.Coins),
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

export const TradeAmountInput = observer(function TradeAmountInput(props: {
  amount: Amount;
  onChange: (v: number) => void;
}) {
  const toFixed = (n: number) =>
    Number(n.toFixed(props.amount.currency.decimal_digits));

  const [value, setValue] = useState(String(toFixed(props.amount.value)));
  const [isFocused, setFocus] = useState(false);

  useEffect(() => {
    props.onChange(toFixed(Number(value)));
  }, [value]);

  useEffect(() => {
    if (Number(value) === props.amount.value) return;

    setValue(String(props.amount.value));
  }, [props.amount.value]);

  function updateAmount(value: string) {
    value = value.replace(",", ".");

    const isValidAmount = (v: string) => {
      const n = Number(v);

      if (isNaN(n)) return false;
      const decimal_digits = v.split(".")[1]?.length ?? 0;

      if (decimal_digits > props.amount.currency.decimal_digits) return false;

      return true;
    };

    if (!isValidAmount(value)) return;
    setValue(value);
  }

  return (
    <input
      type="text"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={isFocused ? value : props.amount.formatted}
      className="text-black"
      onChange={(e) => updateAmount(e.target.value)}
    />
  );
});

export const TradeForm = observer(function TradeForm() {
  const [mode, setMode] = useState(Modes.picking);

  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>();
  const [amount, setAmount] = useState<Amount>();

  const {
    state: orders,
    isLoading: isLoadingOrders,
    execute: getOrders,
  } = useMountFetch(CryptoService.Orders.index.bind(CryptoService.Orders), []);

  const { state: order, execute: createOrder } = useFetch(
    CryptoService.Orders.create.bind(CryptoService.Orders),
    null
  );

  const { state: price, execute: getPrice } = useFetch(
    CryptoService.Coins.getPrice.bind(CryptoService.Coins),
    null
  );

  useEffect(() => {
    if (currencyPair?.base_currency && currencyPair?.quote_currency) {
      setAmount(new Amount(currencyPair.base_currency, 0));
      if (mode === Modes.buy) {
        getPrice(currencyPair.base_currency, currencyPair.quote_currency);
      } else if (mode === Modes.sell) {
        getPrice(currencyPair.quote_currency, currencyPair.base_currency);
      }
    }
  }, [currencyPair]);

  useEffect(() => {
    getOrders();
  }, [order]);

  const buy = async () => {
    if (!currencyPair?.base_currency || !currencyPair?.quote_currency) return;
    if (!amount) return;
    if (!price) return;
    if (mode !== Modes.buy) return;

    await createOrder({
      base_currency: currencyPair.base_currency,
      quote_currency: currencyPair.quote_currency,
      amount: amount.value,
      price: price.current_price.value,
      side: mode,
    });
  };

  const sell = async () => {
    if (!currencyPair?.base_currency || !currencyPair?.quote_currency) return;
    if (!amount) return;
    if (!price) return;
    if (mode !== Modes.sell) return;

    await createOrder({
      base_currency: currencyPair.base_currency,
      quote_currency: currencyPair.quote_currency,
      price: price.current_price.value,
      amount: amount.value,
      side: mode,
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (mode === Modes.buy) {
            buy();
          } else if (mode === Modes.sell) {
            sell();
          }
        }}
      >
        <PickCurrencyPair
          onSelect={(pair) => {
            setMode(Modes.buy);
            setCurrencyPair(pair);
          }}
        />

        {amount && (
          <div className="flex flex-col mt-5 gap-4">
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 mt-4 self-start bg-blue-400 rounded ${
                  mode === Modes.buy && "bg-blue-700"
                }`}
                type="button"
                onClick={() => setMode(Modes.buy)}
              >
                Buy
              </button>
              {/* <button
                className={`px-4 py-2 mt-4 self-start bg-blue-400 rounded ${
                  mode === Modes.sell && "bg-blue-700"
                }`}
                type="button"
                onClick={() => setMode(Modes.sell)}
              >
                Sell
              </button> */}
            </div>

            <div>
              <p>Amount: </p>

              <TradeAmountInput
                amount={amount}
                onChange={(v) => {
                  amount.value = v;
                }}
              />
            </div>

            <div className=" bg-slate-700 p-4 rounded">
              {price && (
                <>
                  <p>
                    Estimate Current Price:{" "}
                    <span className="text-green-400">
                      {price.current_price.formatted}
                    </span>
                  </p>
                  <p>
                    Estimate Amount:{" "}
                    <span className="text-green-400">
                      {
                        new Amount(
                          amount.currency,
                          amount.value / price.current_price.value
                        ).formatted
                      }
                    </span>
                  </p>
                </>
              )}
            </div>

            <button
              className="px-4 py-2 self-start mt-4 bg-blue-400 rounded"
              type="submit"
            >
              Confirm
            </button>
          </div>
        )}
      </form>

      <section className="grid grid-cols-3 gap-4 mt-8">
        {isLoadingOrders ? (
          <b>Loading orders...</b>
        ) : (
          orders.map((order) => (
            <article className="bg-slate-500 rounded p-6" key={order.id}>
              <h2 className="text-2xl font-semibold">
                {order.amount.formatted}
              </h2>

              {order.side === "buy" ? (
                <>
                  <p>Bought: {order.base_currency.name}</p>
                  <p>Selled: {order.quote_currency.name}</p>
                </>
              ) : (
                <>
                  <p>Bought: {order.quote_currency.name}</p>
                  <p>Selled: {order.base_currency.name}</p>
                </>
              )}
              <p>
                Price: <b className="text-green-400">{order.price.formatted}</b>
              </p>
              <p>
                Amount:{" "}
                <b className="text-green-400">
                  {
                    new Amount(
                      order.amount.currency,
                      order.amount.value / order.price.value
                    ).formatted
                  }
                </b>
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
});
