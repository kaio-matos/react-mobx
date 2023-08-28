import axios from "axios";
import { Auth } from "./auth/auth";

const commerce_client = axios.create({
  baseURL: "https://dummyjson.com",
});

export const CommerceService = {
  Auth: new Auth(commerce_client),
};
