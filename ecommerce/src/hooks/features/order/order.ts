import { CommerceService } from "../../../services";
import { useFetch, useMountFetch } from "../../fetch";

export function useOrders() {
  const {
    state: orders,
    execute: getOrders,
    isLoading: isLoadingOrders,
    error,
  } = useMountFetch(() => CommerceService.Orders.index(), []);

  return {
    orders,
    getOrders,
    loading: {
      orders: isLoadingOrders,
    },
    errors: {
      orders: error,
    },
  };
}

export function useOrder() {
  const {
    state: order,
    execute: createOrder,
    isLoading: isLoadingOrder,
    error,
  } = useFetch(
    CommerceService.Orders.buy.bind(CommerceService.Orders),
    [],
    CommerceService.Orders.buy_schema
  );

  return {
    order,
    createOrder,
    loading: {
      order: isLoadingOrder,
    },
    errors: {
      order: error,
    },
  };
}
