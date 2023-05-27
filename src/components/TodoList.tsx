import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";

interface IItem {
  id: number;
  title: string;
}

interface IProps {
  title: string;
  items: IItem[];
  Content?: ({ id, title }: IItem) => JSX.Element;
}

const TodoList = observer(({ title, items, Content }: IProps) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <motion.h3 className="text-center">{title}</motion.h3>

      <motion.ul className="flex flex-col gap-3">
        {items.map((l) => (
          <motion.li
            whileHover={{
              scale: 0.97,
              transition: { type: "spring", duration: 0.2 },
            }}
            exit={{
              x: "-60vw",
              scale: [1, 0],
              transition: { duration: 0.5 },
              backgroundColor: "rgba(255,0,0,1)",
            }}
            className="bg-slate-950 text-xl flex items-center justify-center h-32 rounded p-4"
            key={l.id}
          >
            {Content ? (
              <Content id={l.id} title={l.title} />
            ) : (
              <h5>{l.title}</h5>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
});

export default TodoList;
