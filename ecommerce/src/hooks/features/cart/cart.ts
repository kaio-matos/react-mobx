import { useEffect } from "react";
import { CommerceService } from "../../../services";
import { useFetch, useMountFetch } from "../../fetch";
import { useStore } from "../../../stores";
import { User } from "../../../services/commerce/auth/resources/user";

export function useCarts(user: User) {
  const { Carts } = useStore();

  const { state } = useMountFetch(
    () => CommerceService.Carts.getByUserId(user.id),
    {
      carts: [],
      limit: 0,
      skip: 0,
      total: 0,
    }
  );

  useEffect(() => {
    Carts.setCarts(state.carts);
  }, [state]);

  return {
    carts: Carts.carts,
  };
}

export function useAddCart(user: User) {
  const { Carts } = useStore();

  const {
    state: cart,
    error: cartErrors,
    execute: addProductToCart,
    isLoading: isAddingProductToCart,
  } = useFetch((product_id: number) => {
    const payload = {
      userId: user.id,
      products: [{ id: product_id, quantity: 1 }],
    };

    if (Carts.carts.length) {
      return CommerceService.Carts.update(1, {
        products: payload.products,
        merge: true,
      });
    }

    CommerceService.Carts.add_schema.parse(payload);
    return CommerceService.Carts.add(payload);
  }, null);

  useEffect(() => {
    if (cart) Carts.addCart(cart);
  }, [cart]);

  return { cart, cartErrors, addProductToCart, isAddingProductToCart };
}

export function useCart(cart_id: number) {
  const { Carts } = useStore();

  const {
    state: cart,
    error: cartErrors,
    execute: getCart,
    isLoading,
  } = useMountFetch(() => {
    const cart = Carts.carts.find(({ id }) => cart_id === id);

    if (cart) {
      return Promise.resolve(cart);
    }

    return CommerceService.Carts.get(cart_id);
  }, null);

  return {
    cart,
    getCart,
    errors: { cart: cartErrors },
    loading: { cart: isLoading },
  };
}
