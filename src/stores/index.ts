import { createContext, useContext } from "react";
import { Todos } from "./todo";

const store = {
  todoStore: new Todos(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
