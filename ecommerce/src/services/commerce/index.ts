import axios from "axios";
import { Auth } from "./auth/auth";
import { Products } from "./products/products";
import { Carts } from "./carts/cart";

const commerce_client = axios.create({
  baseURL: "https://dummyjson.com",
});

export const CommerceService = {
  Auth: new Auth(commerce_client),
  Products: new Products(commerce_client),
  Carts: new Carts(commerce_client),
};
