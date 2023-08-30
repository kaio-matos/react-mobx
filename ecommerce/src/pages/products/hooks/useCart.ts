import { useEffect } from "react";
import { useFetch } from "../../../hooks/fetch";
import { CommerceService } from "../../../services";
import { useStore } from "../../../stores";

export function useCart(userId: number) {
  const { Carts } = useStore();

  const {
    state: cart,
    error: cartErrors,
    execute: addProductToCart,
    isLoading: isAddingProductToCart,
  } = useFetch((product_id: number) => {
    const payload = {
      userId,
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
