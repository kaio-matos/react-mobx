import { makeAutoObservable } from "mobx";

export interface IUserResource {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export class User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;

  private constructor(data: IUserResource) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.gender;
    this.image = data.image;
    this.token = data.token;

    makeAutoObservable(this);
  }

  static create(data: IUserResource) {
    return new User(data);
  }

  get fullname() {
    return this.firstName + " " + this.lastName;
  }
}
