import currencies from "./assets/currencies.json";
import { useStore } from "./stores";
import { Currency } from "./models/Currency";
import { CryptoService } from "./services";
import { useMountFetch } from "./hooks/fetch";
import { TradeForm } from "./components/trade/trade";

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

  return (
    <div className="h-screen w-screen overflow-auto bg-slate-800 text-white p-5">
      {isLoading ? "Loading..." : <TradeForm />}
    </div>
  );
}

export default App;
