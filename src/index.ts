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
let showCompleted = true;

function displayTodoList(): void {
  console.log(`${todoList.userName}'s To-do List ` + `(${todoList.getItemsCount().incomplete} items to do)`);
  todoList.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
  Add = "Add New Task",
  Toggle = "Show/Hide Completed",
  Quit = "Quit"
}

function promptAdd(): void {
  console.clear();
  inquirer.prompt({ type: "input", name: "add", message: "Enter task:" })
    .then(answers => {
      if (answers["add"] !== "") {
        todoList.addTodoItem(answers["add"]);
      }
      promptUser();
    });
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
    if (answers["command"]) {
      switch (answers["command"]) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
      }
    }
  });
}

promptUser();
