import { action, makeAutoObservable } from "mobx";
import { Amount } from "../../../../models/Amount";
import { Resource } from "../../types";

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

export class Product implements Resource {
  id: number;
  title: string;
  description: string;
  price: Amount;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  isDeleted?: boolean;
  deletedOn?: string;

  constructor(data: IProductResource) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price = Amount.create({ value: data.price });
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
        this.price.value += Math.random();
      }),
      Math.random() * 10000
    );

    makeAutoObservable(this);
  }

  static create(data: IProductResource) {
    return new Product(data);
  }

  get toResource(): IProductResource {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price.value,
      discountPercentage: this.discountPercentage,
      rating: this.rating,
      stock: this.stock,
      brand: this.brand,
      category: this.category,
      thumbnail: this.thumbnail,
      images: this.images,

      isDeleted: this.isDeleted,
      deletedOn: this.deletedOn,
    };
  }
}
