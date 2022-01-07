import { TasksRepositoryInterface } from "./tasks-repository";
import { Task } from "../models/task";
import { TaskVM } from "../models/taskVM";
import { taskDone, taskNotDone, tasks } from "../fixtures/tasks.fixture";

export class TasksRepositoryMock implements TasksRepositoryInterface {
  createTask(taskDescription: Task["description"]): Promise<TaskVM> {
    return Promise.resolve({
      ...taskNotDone,
      description: taskDescription,
    });
  }

  getAllTasks(): Promise<ReadonlyArray<TaskVM>> {
    return Promise.resolve(tasks);
  }

  getTask(id: string): Promise<TaskVM | undefined> {
    return Promise.resolve({
      ...taskNotDone,
      id,
    });
  }

  removeTask(_: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  updateTask(id: string, taskData: Task): Promise<TaskVM> {
    return Promise.resolve({
      ...taskDone,
      ...taskData,
      id,
    });
  }
}
