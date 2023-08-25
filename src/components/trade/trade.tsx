import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Amount } from "../../models/Amount";
import { Order } from "../../models/Order";
import { useOrder, usePrices, useTrade } from "./hooks";
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

  const { trade, order, amount, price } = useTrade(currencyPair, mode);

  function onCurrencyPairSelection(pair: CurrencyPair) {
    setMode(Modes.buy);
    setCurrencyPair(pair);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trade();
  }

  useEffect(() => {
    if (order) props.onTrade?.(order);
  }, [order]);

  return (
    <form onSubmit={onSubmit}>
      <PickCurrencyPair onSelect={onCurrencyPairSelection} />

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
  );
});
