import axios from "axios";
import { Coins } from "./coins/coins";
import { Orders } from "./orders/orders";

const crypto_client = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const CryptoService = {
  Coins: new Coins(crypto_client),
  Orders: new Orders(crypto_client),
};
