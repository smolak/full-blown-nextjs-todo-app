import { createGetAllTasksHandler } from "./tasks-get.handler";
import { TasksRepositoryMock } from "../repository/tasks-repository.mock";
import { createMocks } from "node-mocks-http";
import { StatusCodes } from "http-status-codes";

describe("createGetAllTasksHandler", () => {
  it("should return a GET request handler", () => {
    const handler = createGetAllTasksHandler(new TasksRepositoryMock());

    expect(handler).toBeDefined();
  });
});

describe("getAllTasksHandler", () => {
  describe("for GET method type", () => {
    it("should get all tasks using tasks repository", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      tasksRepositoryMock.getAllTasks = jest.fn();
      const handler = createGetAllTasksHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(tasksRepositoryMock.getAllTasks).toHaveBeenCalled();
    });

    it("should send 200 OK status with all tasks", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      const handler = createGetAllTasksHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res._getJSONData()).toMatchInlineSnapshot(`
        Object {
          "tasks": Array [
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
          ],
        }
      `);
    });
  });

  describe("for methods other than GET", () => {
    it("should respond with method not allowed", async () => {
      const { req, res } = createMocks({
        method: "POST",
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      const handler = createGetAllTasksHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(res.statusCode).toBe(StatusCodes.METHOD_NOT_ALLOWED);
      expect(res._getHeaders()).toContainEntry(["allow", "GET"]);
    });
  });
});
