import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Order } from "../../models/Order";
import { useTrade } from "./hooks";
import { TradeModePicker } from "./trade.mode-picker";
import { TradePreview } from "./trade.preview";
import { CurrencyPair, Modes } from "./types";
import { PickCurrencyPair } from "./trade.pick-currency-pair";
import { TradeInputAmount } from "./trade.input-amount";

export const TradeForm = observer(function TradeForm(props: {
  onTrade?: (order: Order) => void;
}) {
  const [mode, setMode] = useState(Modes.picking);
  const [currencyPair, setCurrencyPair] = useState<CurrencyPair | null>(null);

  const { trade, order, reset, amount, price, loading } = useTrade(
    currencyPair,
    mode
  );

  function onCurrencyPairSelection(pair: CurrencyPair) {
    setMode(Modes.buy);
    setCurrencyPair(pair);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trade();
  }

  function resetForm() {
    setMode(Modes.picking);
    reset();
    setCurrencyPair(null);
  }

  useEffect(() => {
    if (order) {
      props.onTrade?.(order);
      setMode(Modes.picking);
      resetForm();
    }
  }, [order]);

  return (
    <form onSubmit={onSubmit}>
      <PickCurrencyPair
        currencyPair={currencyPair}
        onSelect={onCurrencyPairSelection}
        isSelecting={() => setMode(Modes.picking)}
      />

      {mode !== Modes.picking && (
        <>
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

              <div className="bg-slate-700 p-4 rounded">
                {loading.price || !price ? (
                  <b>Loading Estimate Price...</b>
                ) : (
                  <TradePreview price={price} amount={amount} />
                )}
              </div>

              <button
                className="px-4 py-2 self-start mt-4 bg-blue-400 rounded disabled:bg-blue-200 disabled:text-slate-600 disabled:cursor-not-allowed"
                disabled={loading.order || loading.price}
                type="submit"
              >
                {loading.order ? "Loading Order..." : "Confirm"}
              </button>
            </div>
          )}
        </>
      )}
    </form>
  );
});
