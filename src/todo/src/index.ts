import { Commands } from "./commands.js";
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

function promptAdd(): void {
  console.clear();
  inquirer.prompt({
    type: "input",
    name: "add",
    message: "Enter task:"
  }).then(answers => {
    if (answers["add"] !== "") {
      todoList.addTodoItem(answers["add"]);
    }
    promptUser();
  });
}

function promptComplete(): void {
  console.clear();
  inquirer.prompt({
    type: "checkbox",
    name: "complete",
    message: "Mark Tasks Complete",
    choices: todoList.getTodoItems(showCompleted).map(item =>
      ({ name: item.task, value: item.id, checked: item.complete }))
  }).then(answers => {
    let completedTasks = answers["complete"] as number[];
    todoList.getTodoItems(true).forEach(item => {
      if (completedTasks.find(id => id === item.id)) {
        todoList.markComplete(item.id);
      }
    });
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
        case Commands.Complete:
          if (todoList.getItemsCount().incomplete > 0) {
            promptComplete();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          todoList.removeComplete();
          promptUser();
          break;
      }
    }
  });
}

promptUser();
