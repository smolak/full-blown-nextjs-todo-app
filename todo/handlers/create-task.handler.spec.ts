import { TasksRepositoryMock } from "../repository/tasks-repository.mock";
import { createMocks } from "node-mocks-http";
import { StatusCodes } from "http-status-codes";
import { createCreateTaskHandler } from "./create-task.handler";

describe("createCreateTaskHandler", () => {
  it("should return a GET request handler", () => {
    const handler = createCreateTaskHandler(new TasksRepositoryMock());

    expect(handler).toBeDefined();
  });
});

describe("createTaskHandler", () => {
  describe("for GET method type", () => {
    it("should create a task using tasks repository", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          taskDescription: "First task",
        },
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      tasksRepositoryMock.createTask = jest.fn();
      const handler = createCreateTaskHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(tasksRepositoryMock.createTask).toHaveBeenCalledWith("First task");
    });

    it("should send 201 status with created task", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          taskDescription: "First task",
        },
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      const handler = createCreateTaskHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.finished).toBeTrue();
      expect(res._getJSONData()).toMatchInlineSnapshot(`
        Object {
          "task": Object {
            "description": "First task",
            "done": false,
            "id": "uuid-like-string-1",
          },
        }
      `);
    });
  });

  describe("for methods other than allowed ones", () => {
    it("should respond with method not allowed", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      const tasksRepositoryMock = new TasksRepositoryMock();
      const handler = createCreateTaskHandler(tasksRepositoryMock);

      await handler(req, res);

      expect(res.statusCode).toBe(StatusCodes.METHOD_NOT_ALLOWED);
      expect(res._getHeaders()).toContainEntry(["allow", "POST"]);
      expect(res.finished).toBeTrue();
    });
  });
});
