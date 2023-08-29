import { makeAutoObservable } from "mobx";
import { User } from "../services/commerce/auth/resources/user";

export class Auth {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
  }

  get isLoggedIn() {
    return !!this.user?.token;
  }
}
