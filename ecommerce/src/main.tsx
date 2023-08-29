import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/routes";

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
