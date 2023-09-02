import { observer } from "mobx-react-lite";
import { Order as OrderClass } from "../../../services/commerce/orders/resources/order";

export const Order = observer(function Order({ order }: { order: OrderClass }) {
  return (
    <article>
      <h1 className="text-2xl font-bold">
        Ordered in {order.created_at.toDateString()}
      </h1>

      <hr />

      <div className="flex flex-col">
        <p>Products:</p>

        <div>
          {order.cart.products.map((product) => (
            <div className="flex flex-col gap-2" key={product.id}>
              <div className="flex justify-between">
                <span>{product.title}</span>
                <span>{product.price.formatted}</span>
              </div>
              <div className="flex justify-between">
                <span>{product.total.formatted}</span>
                <span>{product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
});
