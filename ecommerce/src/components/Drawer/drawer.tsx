import { observer } from "mobx-react-lite";

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
