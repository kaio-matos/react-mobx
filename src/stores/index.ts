import { createContext, useContext } from "react";
import { Currencies } from "./currency";
import { Coins } from "./coins";

const store = {
  currencyStore: new Currencies(),
  coinsStore: new Coins(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
