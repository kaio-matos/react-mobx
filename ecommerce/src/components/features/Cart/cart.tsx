import { observer } from "mobx-react-lite";
import { User } from "../../../services/commerce/auth/resources/user";
import { Cart as CartClass } from "../../../services/commerce/carts/resources/cart";
import { useCarts } from "../../../hooks/features/cart/cart";
import { Link } from "@tanstack/react-router";

export const CartItem = observer(function CartItem({
  cartItem,
}: {
  cartItem: CartClass["products"][number];
}) {
  return (
    <article>
      <h3 className="text-xl font-bold">{cartItem.title}</h3>
      <p>Price: {cartItem.price.formatted}</p>
    </article>
  );
});

export const Cart = observer(function Cart({ user }: { user: User }) {
  const { carts } = useCarts(user);

  return (
    <section className="flex flex-col gap-4">
      {carts.map((cart) => (
        <div key={cart.id}>
          <h1 className="text-bold">Cart: {cart.id}</h1>
          <p>Total: {cart.total.formatted} </p>

          <div className="flex flex-col gap-2 pl-4">
            {cart.products.map((product) => (
              <CartItem cartItem={product} key={product.id} />
            ))}
          </div>

          <Link
            to="/orders/create/$id"
            params={{ id: cart.id.toString() }}
            className="bg-blue-500 p-4 rounded inline-block mt-4"
          >
            Order cart
          </Link>
        </div>
      ))}
    </section>
  );
});
