import { useFetch } from "../../hooks/fetch";
import { CryptoService } from "../../services";

export const useOrder = () => {
  const { state: order, execute: createOrder } = useFetch(
    CryptoService.Orders.create.bind(CryptoService.Orders),
    null
  );

  return { order, createOrder };
};

export const usePrices = () => {
  const { state: price, execute: getPrice } = useFetch(
    CryptoService.Coins.getPrice.bind(CryptoService.Coins),
    null
  );
  return { price, getPrice };
};
