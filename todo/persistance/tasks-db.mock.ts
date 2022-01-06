import { Item, DataStorageInterface } from "../../shared/persistance/data-storage.abstract";
import { Task } from "../models/task";
import { taskDone, taskNotDone, tasks } from "../fixtures/tasks.fixture";

export class TasksDbMock implements DataStorageInterface<Task> {
  addItem(task: Task): Promise<Task & Item> {
    return Promise.resolve({
      ...taskNotDone,
      ...task,
    });
  }

  getAllItems(): Promise<ReadonlyArray<Task & Item>> {
    return Promise.resolve(tasks);
  }

  updateItem(taskId: Item["id"], taskData: Task): Promise<Task & Item> {
    return Promise.resolve({
      ...taskDone,
      id: taskId,
      ...taskData,
    });
  }

  removeItem(_: Item["id"]): Promise<boolean> {
    return Promise.resolve(true);
  }
}
