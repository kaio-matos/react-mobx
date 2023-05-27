import { GoTrashcan } from "react-icons/go";
import { useStore } from "../stores";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { action } from "mobx";

const EditTodo = observer(({ id, title }: { id: number; title: string }) => {
  const { todoStore } = useStore();
  const [changed, setChanged] = useState(title);

  const changeTitle = action(() => {
    const todo = todoStore.findTodo(id);
    if (!todo) return;
    todo.title = changed;
  });

  return (
    <div>
      <input
        name="edit"
        placeholder="Title"
        className="p-3 outline-none focus:ring focus:ring-blue-500 text-zinc-700 w-full"
        value={changed}
        onChange={({ target }) => setChanged(target.value)}
      />
      <button
        className="p-1 bg-orange-400 rounded px-4 mt-2"
        onClick={changeTitle}
      >
        Edit
      </button>
    </div>
  );
});

const TodoOverview = observer(() => {
  const { todoStore } = useStore();

  return (
    <>
      <TodoForm />
      <div className="grid grid-cols-6 gap-2">
        <TodoList
          title="IDs"
          items={todoStore.listIds.map((id) => ({ id, title: String(id) }))}
        />
        <TodoList title="Normal" items={todoStore.list} />
        <TodoList title="Reversed" items={todoStore.listReversed} />
        <TodoList title="Price" items={todoStore.listPrices} />
        <TodoList title="Edit" items={todoStore.list} Content={EditTodo} />
        <TodoList
          title="Remove"
          items={todoStore.list}
          Content={({ id }) => (
            <button onClick={() => todoStore.removeTodo(id)}>
              <GoTrashcan />
            </button>
          )}
        />
      </div>
    </>
  );
});

export default TodoOverview;
