import { Task } from "../models/task";
import { Item } from "../../shared/persistance/data-storage.abstract";

export const taskNotDone: Task & Item = {
  id: "uuid-like-string",
  description: "Task not done yet",
  done: false,
};

export const taskDone: Task & Item = {
  id: "uuid-like-string",
  description: "Task done already",
  done: true,
};

export const tasks: ReadonlyArray<Task & Item> = [taskDone, taskNotDone];
