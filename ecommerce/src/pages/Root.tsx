import { Link, Outlet } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

import { useToggle } from "../hooks/toggle";
import React, { useEffect, useState } from "react";
import { useLogin } from "./hooks/login";
import { useStore } from "../stores";
import { Cart as CartC } from "../services/commerce/carts/resources/cart";
import { useMountFetch } from "../hooks/fetch";
import { CommerceService } from "../services";
import { User } from "../services/commerce/auth/resources/user";

export const Drawer = observer(function Drawer(props: {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactElement[];
}) {
  return (
    <>
      <div
        className={`fixed bg-slate-800 transition top-0 right-0 h-screen w-screen ${
          props.isOpen ? "opacity-75" : "opacity-0 pointer-events-none"
        }`}
        onClick={props.toggle}
      />
      <div
        className={`fixed bg-slate-800 transition top-0 right-0 h-screen w-96 p-4 overflow-y-auto ${
          props.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {props.children}
      </div>
    </>
  );
});

export const CartItem = observer(function CartItem({
  cartItem,
}: {
  cartItem: CartC["products"][number];
}) {
  return (
    <article>
      <h3 className="text-xl font-bold">{cartItem.title}</h3>
      <p>Price: {cartItem.price}</p>
    </article>
  );
});

export const Cart = observer(function Cart({ user }: { user: User }) {
  const [isOpen, toggle] = useToggle();
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
    <>
      <button onClick={toggle} className="bg-blue-500 p-4 rounded">
        Cart
      </button>

      <Drawer isOpen={isOpen} toggle={toggle}>
        <button onClick={toggle} className="bg-blue-500 p-4 rounded">
          Close
        </button>

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
      </Drawer>
    </>
  );
});

export const Login = observer(function Login() {
  const [form, setForm] = useState({
    username: "yraigatt3",
    password: "sRQxjPfdS",
  });
  const [isOpen, toggle] = useToggle();
  const { loading, login } = useLogin(() => {
    toggle();
    return new Promise((res) => setTimeout(res, 500)); // todo: listen transition and get exact time
  });

  return (
    <>
      <button onClick={toggle} className="bg-blue-500 p-4 rounded">
        Login
      </button>

      <Drawer isOpen={isOpen} toggle={toggle}>
        <button onClick={toggle} className="bg-blue-500 p-4 rounded">
          Close
        </button>

        <form
          className="flex flex-col gap-2 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            login(form);
          }}
        >
          <input
            placeholder="Userame"
            className="p-2 rounded outline-none transition text-slate-600 focus:ring focus:ring-blue-500 disabled:bg-slate-300"
            value={form.username}
            disabled
            onChange={(e) =>
              setForm((v) => ({ ...v, username: e.target.value }))
            }
          />
          <input
            placeholder="Password"
            type="password"
            className="p-2 rounded outline-none transition text-slate-600 focus:ring focus:ring-blue-500 disabled:bg-slate-300"
            value={form.password}
            disabled
            onChange={(e) =>
              setForm((v) => ({ ...v, password: e.target.value }))
            }
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded active:bg-blue-700 focus:bg-blue-700 hover:bg-blue-700 transition"
          >
            {loading.login ? "Loading..." : "Login"}
          </button>
        </form>
      </Drawer>
    </>
  );
});

export const Root = observer(function Root() {
  const { Auth } = useStore();

  return (
    <div className="flex flex-col h-screen w-screen overflow-auto bg-slate-800 text-white">
      <header className="flex justify-between w-full p-7 bg-slate-500">
        <nav className="max-w-7xl mx-auto">
          <Link to="/" className="data-[status=active]:text-xl">
            Home
          </Link>{" "}
          <Link to="/products" className="data-[status=active]:text-xl">
            Products
          </Link>
        </nav>

        {Auth.isLoggedIn && Auth.user ? <Cart user={Auth.user} /> : <Login />}
      </header>

      <div className="flex-grow w-full">
        <Outlet />
      </div>
    </div>
  );
});
