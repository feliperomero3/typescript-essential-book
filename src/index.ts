import { TodoItem } from "./todo-item";
import { TodoList } from "./todo-list";

let todos = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true)
]

let todoList = new TodoList("Felipe", todos);

console.clear();
console.log(`${todoList.userName}'s To-do List`);

let newId = todoList.addTodoItem("Write a To-do TypeScript application");
let todoItem = todoList.getTodoById(newId);

todoItem.printDetails();
