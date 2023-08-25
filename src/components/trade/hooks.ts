import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/fetch";
import { CryptoService } from "../../services";
import { CurrencyPair, Modes } from "./types";
import { Amount } from "../../models/Amount";

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

export const useTrade = (
  currencyPair: CurrencyPair | undefined,
  mode: Modes
) => {
  const [amount, setAmount] = useState<Amount>();

  const { order, createOrder } = useOrder();
  const { price, getPrice } = usePrices();

  useEffect(() => {
    if (!currencyPair?.base_currency || !currencyPair?.quote_currency) return;

    setAmount(new Amount(currencyPair.base_currency, 0));

    switch (mode) {
      case Modes.buy:
        getPrice(currencyPair.base_currency, currencyPair.quote_currency);
        return;
      case Modes.sell:
        getPrice(currencyPair.quote_currency, currencyPair.base_currency);
        return;
    }
  }, [currencyPair]);

  const buy = async () => {
    if (!currencyPair?.base_currency || !currencyPair?.quote_currency) return;
    if (!amount) return;
    if (!price) return;
    if (mode !== Modes.buy) return;

    await createOrder({
      base_currency: currencyPair.base_currency,
      quote_currency: currencyPair.quote_currency,
      amount: amount.value,
      price: price.current_price.value,
      side: mode,
    });
  };

  const sell = async () => {
    if (!currencyPair?.base_currency || !currencyPair?.quote_currency) return;
    if (!amount) return;
    if (!price) return;
    if (mode !== Modes.sell) return;

    await createOrder({
      base_currency: currencyPair.base_currency,
      quote_currency: currencyPair.quote_currency,
      price: price.current_price.value,
      amount: amount.value,
      side: mode,
    });
  };

  const trade = async () => {
    switch (mode) {
      case Modes.buy:
        buy();
        return;
      case Modes.sell:
        sell();
        return;
    }
  };

  return {
    trade,
    order,
    price,
    amount,
  };
};
