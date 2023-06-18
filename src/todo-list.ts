import { TodoItem } from "./todo-item";

/**
 * Represents a list of to-do items.
 */
export class TodoList {
  private nextId = 1;

  constructor(public userName: string, private todoItems: TodoItem[] = []) {
  }

  /**
   * Add a to-do item to the list.
   * @param todoItem A to-do item to add.
   * @returns The ID of the next to-do item.
   */
  addTodoItem(todoItem: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.todoItems.push(new TodoItem(this.nextId, todoItem));
    return this.nextId;
  }

  /**
   * Get a to-do item by ID.
   * @param id The ID of the to-do item to get.
   * @returns The to-do item with the specified ID, or undefined if not found.
  */
  getTodoById(id: number): TodoItem {
    return this.todoItems.find(item => item.id === id);
  }

  /**
   * Mark the to-do item with the specified ID as complete.
   * @param id The ID of the to-do item to mark as complete.
   */
  markComplete(id: number): void {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = true;
    }
  }
}
