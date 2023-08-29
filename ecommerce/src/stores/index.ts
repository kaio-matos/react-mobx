import { createContext, useContext } from "react";
import { Auth } from "./auth";

const store = {
  Auth: new Auth(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
