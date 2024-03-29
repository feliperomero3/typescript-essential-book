import { TodoItem } from "./todo-item.js";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

/**
 * Represents a list of to-do items.
 */
export class TodoList {
  private nextId = 1;
  private items = new Map<number, TodoItem>();
  private db: LowSync<Schema>;

  /**
   * Create a new to-do list.
   * @param userName The name of the user who owns the to-do list.
   * @param todoItems The to-do items to add to the list.
   * @returns A new to-do list.
   */
  constructor(public userName: string, todoItems: TodoItem[] = []) {
    this.db = new LowSync<Schema>(new JSONFileSync("db.json"));
    this.db.read();

    if (this.db.data == null) {
      this.db.data = { tasks: todoItems };
      this.db.write();
      todoItems.forEach(item => this.items.set(item.id, item));
    } else {
      this.db.data.tasks.forEach(item =>
        this.items.set(item.id, new TodoItem(item.id, item.task, item.complete)));
    }
  }

  /**
   * Add a to-do item to the list.
   * @param task The task of the to-do item to add.
   * @returns The ID of the next to-do item.
   */
  addTodoItem(task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.items.set(this.nextId, new TodoItem(this.nextId, task));
    this.save();
    return this.nextId;
  }

  /**
   * Get a to-do item by ID.
   * @param id The ID of the to-do item to get.
   * @returns The to-do item with the specified ID, or undefined if not found.
  */
  getTodoById(id: number): TodoItem {
    return this.items.get(id);
  }

  /**
   * Get all to-do items.
   * @param includeComplete Whether to include complete to-do items.
   * @returns All to-do items (filtered to exclude completed by default).
   */
  getTodoItems(includeComplete = false): TodoItem[] {
    return [...this.items.values()]
      .filter(item => includeComplete || !item.complete);
  }

  /**
   * Mark the to-do item with the specified ID as complete.
   * @param id The ID of the to-do item to mark as complete.
   */
  markComplete(id: number): void {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = true;
      this.save();
    }
  }

  /**
   * Remove all completed to-do items.
   */
  removeComplete(): void {
    this.items.forEach(item => {
      if (item.complete) {
        this.items.delete(item.id);
      }
    });
    this.save();
  }

  /**
   * Get the total number of to-do items, and the number of incomplete to-do items.
   * @returns The total number of to-do items, and the number of incomplete to-do items.
   */
  getItemsCount(): ItemsCount {
    return {
      total: this.items.size,
      incomplete: this.getTodoItems().length
    }
  }

  /**
   * Save the to-do list.
   */
  private save(): void {
    this.db.data.tasks = [...this.items.values()];
    this.db.write();
  }
}

/**
 * Represents the total number of to-do items, and the number of incomplete to-do items.
 */
type ItemsCount = {
  total: number,
  incomplete: number
}

/**
 * Represents the schema of the persisted to-do list.
 */
type Schema = {
  tasks: { id: number, task: string, complete: boolean }[]
}
