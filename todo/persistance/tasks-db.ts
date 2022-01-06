import { Task } from "../models/task";
import { DataStorage } from "../../shared/persistance/data-storage.abstract";

export class TasksDb {
  private static instance: DataStorage<Task>;

  constructor() {
    throw new Error("Use TasksDb.getInstance()");
  }

  static getInstance() {
    if (!TasksDb.instance) {
      TasksDb.instance = new DataStorage<Task>();
    }
    return TasksDb.instance;
  }
}
