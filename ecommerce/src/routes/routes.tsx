import { RootRoute, Route, Router } from "@tanstack/react-router";

import { Products } from "../pages/products/products.tsx";
import { Index } from "../pages/index/Index.tsx";
import { Root } from "../pages/Root.tsx";

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});
const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: Products,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, productsRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });
