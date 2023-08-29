import { createContext, useContext } from "react";
import { Auth } from "./auth";
import { Carts } from "./carts";

const store = {
  Auth: new Auth(),
  Carts: new Carts(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
