import { createContext, useContext } from "react";
import { Coins } from "./coins";

const store = {
  coinsStore: new Coins(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
