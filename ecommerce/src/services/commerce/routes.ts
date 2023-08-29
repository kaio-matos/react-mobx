export const routes = {
  auth: {
    _: "/auth",
    login: "/auth/login",
    products: {
      add: "auth/products/add",
      update: (id: number) => "auth/products/update/" + id,
      delete: (id: number) => "auth/products/delete/" + id,
    },
  },
  products: {
    _: "/products",
    categories: "/products/categories",
    category: (category: string) => "/products/category/" + category,
  },
} as const;
