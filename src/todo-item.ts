/**
 * Represents a to-do item.
 */
export class TodoItem {
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
