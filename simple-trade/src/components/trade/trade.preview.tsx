import { observer } from "mobx-react-lite";
import { Amount } from "../../models/Amount";
import { CoinPrice } from "../../models/CoinPrice";

export const TradePreview = observer(function TradePreview(props: {
  price: CoinPrice;
  amount: Amount;
}) {
  return (
    <>
      <p>
        Estimate Current Price:{" "}
        <span className="text-green-400">
          {props.price.current_price.formatted}
        </span>
      </p>
      <p>
        Estimate Amount:{" "}
        <span className="text-green-400">
          {
            new Amount(
              props.amount.currency,
              props.amount.value / props.price.current_price.value
            ).formatted
          }
        </span>
      </p>
    </>
  );
});
