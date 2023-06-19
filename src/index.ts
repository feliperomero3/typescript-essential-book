import { TodoItem } from "./todo-item.js";
import { TodoList } from "./todo-list.js";
import inquirer from "inquirer";

let todos = [
  new TodoItem(1, "Buy Books"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true)
]

let todoList = new TodoList("Felipe", todos);

function displayTodoList(): void {
  console.log(`${todoList.userName}'s To-do List ` + `(${todoList.getItemsCount().incomplete} items to do)`);
  todoList.getTodoItems(true).forEach(item => item.printDetails());
}

enum Commands {
  Quit = "Quit"
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose option",
    choices: Object.values(Commands)
  }).then(answers => {
    if (answers["command"] !== Commands.Quit) {
      promptUser();
    }
  });
}

promptUser();
