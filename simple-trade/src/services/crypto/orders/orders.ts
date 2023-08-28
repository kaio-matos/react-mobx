import { z } from "zod";
import { Order } from "../../../models/Order";
import { sleep } from "../../../utils/sleep";
import { Http } from "../http";
import { OrderResource } from "./types";
import { Currency } from "../../../models/Currency";
import { CurrencySchema } from "../schemas";

export class Orders extends Http {
  private orders: OrderResource[] = [];

  private resourceToInstance(order: OrderResource) {
    return new Order({
      ...order,
      base_currency: new Currency(order.base_currency),
      quote_currency: new Currency(order.quote_currency),
    });
  }

  async index() {
    return Promise.resolve(
      this.orders.map((order) => this.resourceToInstance(order))
    );
  }

  async get(id: string) {
    const found = this.orders.find((order) => order.id === id);
    if (!found) {
      throw { status: 404 };
    }

    return Promise.resolve(this.resourceToInstance(found));
  }

  create_schema = z.object({
    price: z.number(),
    base_currency: CurrencySchema,
    quote_currency: CurrencySchema,
    amount: z.number().min(0.00001), // fix
    side: z.union([z.literal("buy"), z.literal("sell")]),
  });
  async create(order: typeof this.create_schema._type) {
    const created: OrderResource = {
      ...order,
      id: crypto.randomUUID(),
      created_at: new Date().toUTCString(),
    };
    this.orders.push(created);

    await sleep(1000);

    return Promise.resolve(this.resourceToInstance(created));
  }

  async cancel(id: string) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw { status: 404 };
    }

    this.orders = this.orders.filter((order) => order.id !== id);
    return Promise.resolve(this.resourceToInstance(order));
  }
}
