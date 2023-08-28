import { observer } from "mobx-react-lite";
import { Amount } from "../../models/Amount";
import { Order } from "../../models/Order";

export const OrderCard = observer(function OrderCard({
  order,
}: {
  order: Order;
}) {
  return (
    <article className="bg-slate-500 rounded p-6">
      <h2 className="text-2xl font-semibold">{order.amount.formatted}</h2>

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
  );
});
