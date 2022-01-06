import { TasksDb } from "../persistance/tasks-db";
import { Task } from "../models/task";
import { DataStorageInterface } from "../../shared/persistance/data-storage.abstract";

export class TasksRepository {
  #db: DataStorageInterface<Task>;

  constructor(db: DataStorageInterface<Task> = TasksDb.getInstance()) {
    this.#db = db;
  }

  createTask(taskDescription: Task["description"]) {
    const task: Task = {
      description: taskDescription,
      done: false,
    };

    return this.#db.addItem(task);
  }

  getAllTasks() {
    return this.#db.getAllItems();
  }

  updateTask(id: string, taskData: Task) {
    return this.#db.updateItem(id, taskData);
  }

  removeTask(id: string) {
    return this.#db.removeItem(id);
  }
}
