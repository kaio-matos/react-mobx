import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Amount } from "../../models/Amount";
import { Order } from "../../models/Order";
import { useOrder, usePrices } from "./hooks";
import { TradeModePicker } from "./trade.mode-picker";
import { TradePreview } from "./trade.preview";
import { CurrencyPair, Modes } from "./types";
import { PickCurrencyPair } from "./trade.pick-currency-pair";
import { TradeInputAmount } from "./trade.input-amount";

export const TradeForm = observer(function TradeForm(props: {
  onTrade?: (order: Order) => void;
}) {
  const [mode, setMode] = useState(Modes.picking);
  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>();
  const [amount, setAmount] = useState<Amount>();

  const { order, createOrder } = useOrder();
  const { price, getPrice } = usePrices();

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
    if (order) props.onTrade?.(order);
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

        <TradeModePicker mode={mode} onSelect={setMode} />

        {amount && (
          <div className="flex flex-col mt-5 gap-4">
            <TradeInputAmount
              label="Amount:"
              amount={amount}
              onChange={(v) => {
                amount.value = v;
              }}
            />

            <div className=" bg-slate-700 p-4 rounded">
              {price && <TradePreview price={price} amount={amount} />}
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
    </div>
  );
});
