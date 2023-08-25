import { useStore } from "./stores";
import { CryptoService } from "./services";
import { useMountFetch } from "./hooks/fetch";
import { TradeForm } from "./components/trade/trade";
import { OrderCard } from "./components/order/order";

function useBootstrap() {
  const { coinsStore } = useStore();

  const data = useMountFetch(async () => {
    if (coinsStore.coins.length) {
      return Promise.resolve(coinsStore.coins);
    }
    const coins = await CryptoService.Coins.index();

    coinsStore.setCoins(coins);

    return coins;
  }, []);

  return data;
}

function App() {
  const { isLoading } = useBootstrap();

  const {
    state: orders,
    isLoading: isLoadingOrders,
    execute: getOrders,
  } = useMountFetch(CryptoService.Orders.index.bind(CryptoService.Orders), []);

  return (
    <div className="h-screen w-screen overflow-auto bg-slate-800 text-white p-5">
      {isLoading ? "Loading..." : <TradeForm onTrade={() => getOrders()} />}

      <section className="grid grid-cols-3 gap-4 mt-8">
        {isLoadingOrders ? (
          <b>Loading orders...</b>
        ) : (
          orders.map((order) => <OrderCard order={order} key={order.id} />)
        )}
      </section>
    </div>
  );
}

export default App;
