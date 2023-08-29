import { Link, Outlet } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

import { useToggle } from "../hooks/toggle";
import React, { useState } from "react";
import { useLogin } from "./hooks/login";
import { useStore } from "../stores";

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
        className={`fixed bg-slate-800 transition top-0 right-0 h-screen w-48 p-4 ${
          props.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {props.children}
      </div>
    </>
  );
});

export const Cart = observer(function Cart() {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <button onClick={toggle} className="bg-blue-500 p-4 rounded">
        Cart
      </button>

      <Drawer isOpen={isOpen} toggle={toggle}>
        <button onClick={toggle} className="bg-blue-500 p-4 rounded">
          Close
        </button>

        <section className="flex flex-col"></section>
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
    return new Promise((res) => setTimeout(res, 1000));
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

        {Auth.isLoggedIn ? <Cart /> : <Login />}
      </header>

      <div className="flex-grow w-full">
        <Outlet />
      </div>
    </div>
  );
});
