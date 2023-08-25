import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Amount } from "../../models/Amount";

export const TradeInputAmount = observer(function TradeAmountInput(props: {
  amount: Amount;
  label?: string;
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
    <div className="flex flex-col gap-2">
      {props.label && <label>{props.label}</label>}

      <input
        type="text"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={isFocused ? value : props.amount.formatted}
        className="bg-white rounded p-2 text-black"
        onChange={(e) => updateAmount(e.target.value)}
      />
    </div>
  );
});
