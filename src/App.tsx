import TodoDetails from "./components/TodoDetails";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="h-screen w-screen bg-slate-800 text-white p-5">
      <div className="container mx-auto text-center overflow-hidden">
        <motion.h1
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          className="text-3xl mb-5"
        >
          Todo App
        </motion.h1>
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <TodoDetails />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
