/**
 * Represents a to-do item.
 */
export class TodoItem {

  /**
   * Create a new to-do item.
   * @param id The ID of the to-do item.
   * @param task The task of the to-do item.
   * @param complete Whether the to-do item is complete.
   * @returns A new to-do item.
   */
  constructor(public id: number,
    public task: string,
    public complete = false) {
  }

  /**
   * Print details of the to-do item.
   */
  printDetails(): void {
    console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
  }
}
