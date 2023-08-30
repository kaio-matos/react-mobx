import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useLogin } from "./hooks/login";
import { User } from "../../../services/commerce/auth/resources/user";

export const Login = observer(function Login(props: {
  onLogin?: (user: User) => Promise<void> | void;
}) {
  const [form, setForm] = useState({
    username: "yraigatt3",
    password: "sRQxjPfdS",
  });
  const { loading, login } = useLogin(props.onLogin);

  return (
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
        onChange={(e) => setForm((v) => ({ ...v, username: e.target.value }))}
      />
      <input
        placeholder="Password"
        type="password"
        className="p-2 rounded outline-none transition text-slate-600 focus:ring focus:ring-blue-500 disabled:bg-slate-300"
        value={form.password}
        disabled
        onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))}
      />
      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 rounded active:bg-blue-700 focus:bg-blue-700 hover:bg-blue-700 transition"
      >
        {loading.login ? "Loading..." : "Login"}
      </button>
    </form>
  );
});
