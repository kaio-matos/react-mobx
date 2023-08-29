import axios from "axios";
import { Auth } from "./auth/auth";
import { Products } from "./products/products";

const commerce_client = axios.create({
  baseURL: "https://dummyjson.com",
});

export const CommerceService = {
  Auth: new Auth(commerce_client),
  Products: new Products(commerce_client),
};
