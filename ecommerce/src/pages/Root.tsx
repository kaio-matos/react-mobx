import { Link, Outlet } from "@tanstack/react-router";

export function Root() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-auto bg-slate-800 text-white">
      <header className="w-full p-7 bg-slate-500">
        <nav className="max-w-7xl mx-auto">
          <Link to="/">Home</Link> <Link to="/products">Products</Link>
        </nav>
      </header>

      <div className="flex-grow w-full">
        <Outlet />
      </div>
    </div>
  );
}
