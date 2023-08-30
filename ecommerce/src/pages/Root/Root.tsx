import { observer } from "mobx-react-lite";
import { Link, Outlet } from "@tanstack/react-router";

import { useStore } from "../../stores";

import { Login } from "../../components/features/Login/login";
import { Cart } from "../../components/features/Cart/cart";
import { User } from "../../services/commerce/auth/resources/user";
import { Drawer } from "../../components/Drawer/drawer";
import { useToggle } from "../../hooks/toggle";

export const CartWrapper = observer(function CartWrapper({
  user,
}: {
  user: User;
}) {
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

        <Cart user={user} />
      </Drawer>
    </>
  );
});

export const LoginWrapper = observer(function LoginWrapper() {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <button onClick={toggle} className="bg-blue-500 p-4 rounded">
        Login
      </button>

      <Drawer isOpen={isOpen} toggle={toggle}>
        <button onClick={toggle} className="bg-blue-500 p-4 rounded">
          Close
        </button>

        <Login
          onLogin={() => {
            toggle();
            return new Promise((res) => setTimeout(res, 500)); // todo: listen transition and get exact time
          }}
        />
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

        {Auth.isLoggedIn && Auth.user ? (
          <CartWrapper user={Auth.user} />
        ) : (
          <LoginWrapper />
        )}
      </header>

      <div className="flex-grow w-full">
        <Outlet />
      </div>
    </div>
  );
});
