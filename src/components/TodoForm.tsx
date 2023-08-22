import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { action } from "mobx";
import { FormEvent, useRef } from "react";
import { useStore } from "../stores";
import { Todo } from "../models/Todo";

import currencies from "../assets/currencies.json";
import { Amount } from "../models/Amount";

const TodoForm = () => {
  const { todoStore, currencyStore } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = action((e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title")?.toString() || "";
    const currency_code = formData.get("currency")?.toString() || "";
    const price = formData.get("price")?.toString() || "";

    if (!title || !currency_code || !currency_code) return;

    const currency = currencyStore.findCurrency(currency_code);

    todoStore.createTodo(
      new Todo(Date.now(), title, new Amount(currency, Number(price)))
    );

    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  });

  return (
    <form
      className="flex gap-2 justify-center"
      action="#"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 text-zinc-700">
        <input
          ref={inputRef}
          name="title"
          placeholder="Title"
          className="p-3 outline-none focus:ring focus:ring-blue-500"
        />

        <input
          name="price"
          placeholder="Price"
          className="p-3 outline-none focus:ring focus:ring-blue-500"
        />

        <select
          name="currency"
          className="p-3 outline-none focus:ring focus:ring-blue-500"
        >
          {currencies.map(({ name, code }) => (
            <option value={code} key={code}>
              {name} ({code})
            </option>
          ))}
        </select>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="px-8 py-5 bg-orange-400 rounded text-3xl"
      >
        <GoPlus />
      </motion.button>
    </form>
  );
};

export default TodoForm;
