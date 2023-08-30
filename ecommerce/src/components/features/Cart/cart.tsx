import { observer } from "mobx-react-lite";
import { useToggle } from "../../../hooks/toggle";
import { useStore } from "../../../stores";
import { useEffect } from "react";
import { useMountFetch } from "../../../hooks/fetch";
import { CommerceService } from "../../../services";
import { User } from "../../../services/commerce/auth/resources/user";
import { Cart as CartClass } from "../../../services/commerce/carts/resources/cart";

export const CartItem = observer(function CartItem({
  cartItem,
}: {
  cartItem: CartClass["products"][number];
}) {
  return (
    <article>
      <h3 className="text-xl font-bold">{cartItem.title}</h3>
      <p>Price: {cartItem.price}</p>
    </article>
  );
});

export const Cart = observer(function Cart({ user }: { user: User }) {
  const { Carts } = useStore();

  const { state } = useMountFetch(() => CommerceService.Carts.get(user.id), {
    carts: [],
    limit: 0,
    skip: 0,
    total: 0,
  });

  useEffect(() => {
    Carts.setCarts(state.carts);
  }, [state]);

  return (
    <section className="flex flex-col gap-4">
      {Carts.carts.map((cart) => (
        <div key={cart.id}>
          <h1 className="text-bold">Cart: {cart.id}</h1>
          <p>Total: {cart.total} </p>

          <div className="flex flex-col gap-2 pl-4">
            {cart.products.map((product) => (
              <CartItem cartItem={product} key={product.id} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
});
