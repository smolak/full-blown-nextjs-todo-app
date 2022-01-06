import { TasksDbMock } from "../persistance/tasks-db.mock";
import { TasksRepository } from "./tasks-repository";
import { useDebugValue } from "react";

describe("TasksRepository class", () => {
  describe("createTask method", () => {
    it("should add a task to DB", async () => {
      const tasksDbMock = new TasksDbMock();
      tasksDbMock.addItem = jest.fn();
      const tasksRepository = new TasksRepository(tasksDbMock);

      await tasksRepository.createTask("A new task");

      expect(tasksDbMock.addItem).toHaveBeenCalledWith({
        description: "A new task",
        done: false,
      });
    });

    it("should resolve with added task", async () => {
      const tasksDbMock = new TasksDbMock();
      const tasksRepository = new TasksRepository(tasksDbMock);

      const addedTask = await tasksRepository.createTask("A new task");

      expect(addedTask).toMatchInlineSnapshot(`
        Object {
          "description": "A new task",
          "done": false,
          "id": "uuid-like-string",
        }
      `);
    });
  });

  describe("getTask method", () => {
    it("should cass DB for given task", async () => {
      const tasksDbMock = new TasksDbMock();
      tasksDbMock.getItem = jest.fn();
      const tasksRepository = new TasksRepository(tasksDbMock);
      const taskId = "uuid-like-string";

      await tasksRepository.getTask(taskId);

      expect(tasksDbMock.getItem).toHaveBeenCalledWith(taskId);
    });

    it("should resolve with task", async () => {
      const tasksDbMock = new TasksDbMock();
      const tasksRepository = new TasksRepository(tasksDbMock);
      const taskId = "uuid-like-string";

      const task = await tasksRepository.getTask(taskId);

      expect(task).toMatchInlineSnapshot(`
        Object {
          "description": "Task not done yet",
          "done": false,
          "id": "uuid-like-string",
        }
      `);
    });
  });

  describe("getAllTasks method", () => {
    it("should call DB for all tasks", async () => {
      const tasksDbMock = new TasksDbMock();
      tasksDbMock.getAllItems = jest.fn();
      const tasksRepository = new TasksRepository(tasksDbMock);

      await tasksRepository.getAllTasks();

      expect(tasksDbMock.getAllItems).toHaveBeenCalled();
    });

    it("should resolve with all tasks", async () => {
      const tasksDbMock = new TasksDbMock();
      const tasksRepository = new TasksRepository(tasksDbMock);

      const allTasks = await tasksRepository.getAllTasks();

      expect(allTasks).toMatchInlineSnapshot(`
        Array [
          Object {
            "description": "Task done already",
            "done": true,
            "id": "uuid-like-string",
          },
          Object {
            "description": "Task not done yet",
            "done": false,
            "id": "uuid-like-string",
          },
        ]
      `);
    });
  });

  describe("updateTask method", () => {
    it("should update task in DB", async () => {
      const tasksDbMock = new TasksDbMock();
      tasksDbMock.updateItem = jest.fn();
      const tasksRepository = new TasksRepository(tasksDbMock);
      const taskId = "uuid-like-string";
      const taskData = { done: true, description: "Some description" };

      await tasksRepository.updateTask(taskId, taskData);

      expect(tasksDbMock.updateItem).toHaveBeenCalledWith(taskId, taskData);
    });

    it("should not allow to change the ID of the task", async () => {
      const tasksDbMock = new TasksDbMock();
      const tasksRepository = new TasksRepository(tasksDbMock);
      const taskId = "uuid-like-string";
      const newTaskId = "new-task-id";
      const taskData = { id: newTaskId, done: true, description: "Some description", foo: "bar" };

      const updatedTask = await tasksRepository.updateTask(taskId, taskData);

      expect(updatedTask.id).toEqual(taskId);
      expect(updatedTask.id).not.toEqual(newTaskId);
    });

    it("should resolve with updated task", async () => {
      const tasksDbMock = new TasksDbMock();
      const tasksRepository = new TasksRepository(tasksDbMock);
      const taskId = "uuid-like-string";
      const taskData = { done: true, description: "Some description" };

      const updatedTask = await tasksRepository.updateTask(taskId, taskData);

      expect(updatedTask).toMatchInlineSnapshot(`
        Object {
          "description": "Some description",
          "done": true,
          "id": "uuid-like-string",
        }
      `);
    });
  });

  describe("removeTask method", () => {
    it("should remove task in DB", async () => {
      const tasksDbMock = new TasksDbMock();
      tasksDbMock.removeItem = jest.fn();
      const tasksRepository = new TasksRepository(tasksDbMock);
      const taskId = "uuid-like-string";

      await tasksRepository.removeTask(taskId);

      expect(tasksDbMock.removeItem).toHaveBeenCalledWith(taskId);
    });

    it("should resolve with boolean information about task being removed", async () => {
      const tasksDbMock = new TasksDbMock();
      const tasksRepository = new TasksRepository(tasksDbMock);
      const taskId = "uuid-like-string";

      const result = await tasksRepository.removeTask(taskId);

      expect(result).toBeBoolean();
    });
  });
});
