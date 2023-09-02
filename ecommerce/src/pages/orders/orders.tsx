import { observer } from "mobx-react-lite";
import { Order } from "../../components/features/Order/order";
import { useOrders } from "../../hooks/features/order/order";

export const Orders = observer(function Orders() {
  const { orders, loading } = useOrders();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-10">Welcome to orders</h1>

      {loading.orders ? (
        <p>Loading orders...</p>
      ) : (
        <section className="flex flex-col gap-8">
          {orders.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </section>
      )}
    </div>
  );
});
