import { createContext, useContext } from "react";
import { Todos } from "./todo";
import { Currencies } from "./currency";

const store = {
  todoStore: new Todos(),
  currencyStore: new Currencies(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
