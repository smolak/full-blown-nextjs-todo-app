import { TasksRepositoryMock } from "../repository/tasks-repository.mock";
import { createMocks } from "node-mocks-http";
import { StatusCodes } from "http-status-codes";
import { createUpdateTaskHandler } from "./update-task.handler";

describe("createUpdateTaskHandler", () => {
  it("should return a GET request handler", () => {
    const handler = createUpdateTaskHandler(new TasksRepositoryMock());

    expect(handler).toBeDefined();
  });
});

describe("createTaskHandler", () => {
  describe("for PUT method type", () => {
    it("should create a task using tasks repository", async () => {
      const { req, res } = createMocks({
        method: "PUT",
        body: {
          description: "First task",
          done: false,
        },
        query: {
          id: "uuid-like-string",
        },
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      tasksRepositoryMock.updateTask = jest.fn();
      const handler = createUpdateTaskHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(tasksRepositoryMock.updateTask).toHaveBeenCalledWith("uuid-like-string", {
        description: "First task",
        done: false,
      });
    });

    it("should send 201 status with updated task", async () => {
      const { req, res } = createMocks({
        method: "PUT",
        body: {
          description: "First task",
          done: false,
        },
        query: {
          id: "uuid-like-string",
        },
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      const handler = createUpdateTaskHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res._getJSONData()).toMatchInlineSnapshot(`
        Object {
          "task": Object {
            "description": "First task",
            "done": false,
            "id": "uuid-like-string",
          },
        }
      `);
    });
  });

  describe("for methods other than PUT", () => {
    it("should respond with method not allowed", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      const handler = createUpdateTaskHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(res.statusCode).toBe(StatusCodes.METHOD_NOT_ALLOWED);
      expect(res._getHeaders()).toContainEntry(["allow", "PUT"]);
    });
  });
});
