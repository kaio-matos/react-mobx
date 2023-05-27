import { makeAutoObservable } from "mobx";
import { Todo } from "../../models/Todo";

export class Todos {
  list: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get listReversed() {
    return this.list.slice().reverse();
  }

  get listIds() {
    return this.list.map((el) => el.id);
  }

  get listPrices() {
    return this.list.map((el) => ({ id: el.id, title: el.price.formatted }));
  }

  findTodo(id: number) {
    return this.list.filter((todo) => todo.id === id).at(0);
  }

  createTodo(todo: Todo) {
    this.list.push(todo);
    return todo;
  }

  removeTodo(id: number) {
    this.list = this.list.filter((todo) => todo.id !== id);
    return this;
  }
}
