import { TasksDb } from "../persistance/tasks-db";
import { Task } from "../models/task";
import { DataStorageInterface } from "../../shared/persistance/data-storage.abstract";
import { TaskVM } from "../models/taskVM";

export interface TasksRepositoryInterface {
  createTask: (taskDescription: Task["description"]) => Promise<TaskVM>;
  getTask: (id: string) => Promise<TaskVM | undefined>;
  getAllTasks: () => Promise<ReadonlyArray<TaskVM>>;
  updateTask: (id: string, taskData: Task) => Promise<TaskVM>;
  removeTask: (id: string) => Promise<boolean>;
}

export class TasksRepository implements TasksRepositoryInterface {
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

  getTask(id: string) {
    return this.#db.getItem(id);
  }

  getAllTasks() {
    return this.#db.getAllItems();
  }

  updateTask(id: string, taskData: Task) {
    if ("id" in taskData) {
      // @ts-ignore
      delete taskData.id;
    }

    return this.#db.updateItem(id, taskData);
  }

  removeTask(id: string) {
    return this.#db.removeItem(id);
  }
}
