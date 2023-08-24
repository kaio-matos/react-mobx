import axios from "axios";
import { Coins } from "./coins/coins";

const crypto_client = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const CryptoService = {
  Coins: new Coins(crypto_client),
};
