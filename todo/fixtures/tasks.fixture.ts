import { Task } from "../models/task";
import { Item } from "../../shared/persistance/data-storage.abstract";

export const taskNotDone: Task & Item = {
  id: "uuid-like-string-1",
  description: "Task not done yet",
  done: false,
};

export const taskDone: Task & Item = {
  id: "uuid-like-string-2",
  description: "Task done already",
  done: true,
};

export const tasks: ReadonlyArray<Task & Item> = [taskDone, taskNotDone];
