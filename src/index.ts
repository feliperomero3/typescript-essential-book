import { TodoItem } from "./todo-item";
import { TodoList } from "./todo-list";

let todos = [
  new TodoItem(1, "Buy Books"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true)
]

let todoList = new TodoList("Felipe", todos);

console.clear();
console.log(`${todoList.userName}'s To-do List ` + `(${todoList.getItemsCount().incomplete} items to do)`);

todoList.getTodoItems(true).forEach(item => item.printDetails());
