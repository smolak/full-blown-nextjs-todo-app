import { Item, DataStorageInterface, ItemId } from "../../shared/persistance/data-storage.abstract";
import { Task } from "../models/task";
import { taskDone, taskNotDone, tasks } from "../fixtures/tasks.fixture";

export class TasksDbMock implements DataStorageInterface<Task> {
  addItem(task: Task): Promise<Task & Item> {
    return Promise.resolve({
      ...taskNotDone,
      ...task,
    });
  }

  getItem(taskId: ItemId): Promise<(Task & Item) | undefined> {
    return Promise.resolve({
      ...taskNotDone,
      id: taskId,
    });
  }

  getAllItems(): Promise<ReadonlyArray<Task & Item>> {
    return Promise.resolve(tasks);
  }

  updateItem(taskId: ItemId, taskData: Task): Promise<Task & Item> {
    return Promise.resolve({
      ...taskDone,
      ...taskData,
      id: taskId,
    });
  }

  removeItem(_: ItemId): Promise<boolean> {
    return Promise.resolve(true);
  }
}
