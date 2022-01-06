import { TasksDb } from "../persistance/tasks-db";
import { TasksRepository } from "./tasks-repository";

const removeAllTasks = async () => {
  const tasksDb = TasksDb.getInstance();
  const allTasks = await tasksDb.getAllItems();

  allTasks.map(async ({ id }) => await tasksDb.removeItem(id));
};

describe("TaskRepository (integration)", () => {
  beforeEach(removeAllTasks);

  it("allows to create a task", async () => {
    const taskRepository = new TasksRepository();

    const createdTask = await taskRepository.createTask("First task");

    expect(createdTask.description).toEqual("First task");
    expect(createdTask.done).toBeFalse();
  });

  it("allows to get a single task", async () => {
    const taskRepository = new TasksRepository();

    const createdTask = await taskRepository.createTask("First task");
    const gotTask = await taskRepository.getTask(createdTask.id);

    expect(gotTask!.description).toEqual("First task");
  });

  it("allows to get all task(s)", async () => {
    const taskRepository = new TasksRepository();
    await taskRepository.createTask("First task");
    await taskRepository.createTask("Second task");

    const tasks = await taskRepository.getAllTasks();

    // @ts-ignore - it's in the code but not in types yet
    expect(tasks).toPartiallyContain({ description: "First task", done: false });
    // @ts-ignore - it's in the code but not in types yet
    expect(tasks).toPartiallyContain({ description: "Second task", done: false });
  });

  it("allows to update a task", async () => {
    const taskRepository = new TasksRepository();
    const createdTask = await taskRepository.createTask("First task");

    const updatedTask = await taskRepository.updateTask(createdTask.id, { ...createdTask, done: true });

    expect(updatedTask.done).toBeTrue();
  });

  it("allows to remove a task", async () => {
    const taskRepository = new TasksRepository();
    const createdTask = await taskRepository.createTask("First task");

    expect(await taskRepository.getTask(createdTask.id)).toBeDefined();

    await taskRepository.removeTask(createdTask.id);

    expect(await taskRepository.getTask(createdTask.id)).not.toBeDefined();
  });
});
