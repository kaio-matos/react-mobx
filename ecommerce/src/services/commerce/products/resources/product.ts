import { action, makeAutoObservable } from "mobx";

export interface IProductResource {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  isDeleted?: boolean;
  deletedOn?: string;
}

export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  isDeleted?: boolean;
  deletedOn?: string;

  private constructor(data: IProductResource) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.discountPercentage = data.discountPercentage;
    this.rating = data.rating;
    this.stock = data.stock;
    this.brand = data.brand;
    this.category = data.category;
    this.thumbnail = data.thumbnail;
    this.images = data.images;

    this.isDeleted = data.isDeleted;
    this.deletedOn = data.deletedOn;

    // simulate price update
    setInterval(
      action(() => {
        this.price += Math.random();
      }),
      Math.random() * 10000
    );

    makeAutoObservable(this);
  }

  static create(data: IProductResource) {
    return new Product(data);
  }

  get formattedPrice() {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(this.price);
  }
}
