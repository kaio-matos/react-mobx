import { Amount } from "../../../models/Amount";
import { Order } from "../../../models/Order";
import { Http } from "../http";
import { OrderResource } from "./types";

export class Orders extends Http {
  private orders: OrderResource[] = [];

  async index() {
    return Promise.resolve(this.orders.map((order) => new Order(order)));
  }

  async get(id: string) {
    const found = this.orders.find((order) => order.id === id);
    if (!found) {
      throw { status: 404 };
    }
    return Promise.resolve(new Order(found));
  }

  async create(order: Omit<OrderResource, "created_at" | "id" | "price">) {
    const created: OrderResource = {
      ...order,
      id: crypto.randomUUID(),
      created_at: new Date().toUTCString(),
      price: Math.random() * 50,
    };
    this.orders.push(created);

    return Promise.resolve(new Order(created));
  }

  async cancel(id: string) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw { status: 404 };
    }

    this.orders = this.orders.filter((order) => order.id !== id);
    return Promise.resolve(new Order(order));
  }
}
