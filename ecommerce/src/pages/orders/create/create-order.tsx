import { observer } from "mobx-react-lite";
import { useCart } from "../../../hooks/features/cart/cart";
import { useParams } from "@tanstack/react-router";
import { useOrder } from "../../../hooks/features/order/order";
import {
  PaymentMethod,
  createPayment,
} from "../../../services/commerce/orders/resources/payment";
import { useState } from "react";

export const CreateOrder = observer(function CreateOrder() {
  const { id } = useParams();
  const { cart, loading: loadingCart } = useCart(Number(id));
  const { createOrder, loading: loadingOrder } = useOrder();
  const loading = { ...loadingCart, ...loadingOrder };

  const [payment, setPayment] = useState(createPayment({ method: "cash" }));

  return (
    <div className="p-8">
      {loading.order}

      {loading.cart || !cart ? (
        <p>Loading Cart...</p>
      ) : (
        <>
          <label className="flex gap-2">
            Payment Method:
            <select
              disabled
              className="text-slate-600"
              onChange={(ev) =>
                (payment.method = ev.target
                  .value as PaymentMethod[keyof PaymentMethod])
              }
              value={payment.method}
            >
              {PaymentMethod.getValues().map((value) => (
                <option value={value} key={value}>
                  {PaymentMethod.getName(value)}
                </option>
              ))}
            </select>
          </label>

          <button
            className="bg-blue-500 p-4 rounded"
            disabled={loading.order}
            onClick={() =>
              createOrder({
                cart,
                payment: payment.toResource,
              })
            }
          >
            Order
          </button>
        </>
      )}
    </div>
  );
});
