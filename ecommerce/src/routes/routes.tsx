import { RootRoute, Route, Router } from "@tanstack/react-router";

import { Products } from "../pages/products/products.tsx";
import { Index } from "../pages/index/Index.tsx";
import { Root } from "../pages/Root/Root.tsx";
import { Orders } from "../pages/orders/orders.tsx";
import { CreateOrder } from "../pages/orders/create/create-order.tsx";

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

const ordersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/orders",
});

const ordersIndexRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "/",
  component: Orders,
});

const ordersCreateRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "/create/$id",
  component: CreateOrder,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  ordersRoute,
  ordersIndexRoute,
  ordersCreateRoute,
]);

// Create the router using your route tree
export const router = new Router({ routeTree });
