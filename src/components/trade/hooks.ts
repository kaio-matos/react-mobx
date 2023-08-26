import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/fetch";
import { CryptoService } from "../../services";
import { CurrencyPair, Modes } from "./types";
import { Amount } from "../../models/Amount";

export const useOrder = () => {
  const {
    state: order,
    execute: createOrder,
    isLoading: isCreatingOrder,
    setState: setOrder,
    error: orderErrors,
  } = useFetch(
    CryptoService.Orders.create.bind(CryptoService.Orders),
    null,
    CryptoService.Orders.create_schema
  );

  return { order, createOrder, isCreatingOrder, setOrder, orderErrors };
};

export const usePrices = () => {
  const {
    state: price,
    execute: getPrice,
    isLoading: isGettingPrice,
    setState: setPrice,
  } = useFetch(CryptoService.Coins.getPrice.bind(CryptoService.Coins), null);
  return { price, getPrice, isGettingPrice, setPrice };
};

export const useTrade = (currencyPair: CurrencyPair | null, mode: Modes) => {
  const [amount, setAmount] = useState<Amount>();

  const { order, createOrder, isCreatingOrder, setOrder, orderErrors } =
    useOrder();
  const { price, getPrice, isGettingPrice, setPrice } = usePrices();

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
      base_currency: currencyPair.base_currency.object,
      quote_currency: currencyPair.quote_currency.object,
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
      base_currency: currencyPair.base_currency.object,
      quote_currency: currencyPair.quote_currency.object,
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

  const reset = () => {
    setAmount(undefined);
    setOrder(null);
    setPrice(null);
  };

  return {
    trade,
    order,
    reset,
    price,
    amount,
    error: {
      order: orderErrors,
    },
    loading: {
      price: isGettingPrice,
      order: isCreatingOrder,
    },
  };
};
