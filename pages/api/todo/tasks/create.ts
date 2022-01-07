import { createCreateTaskHandler } from "../../../../todo/handlers/create-task.handler";
import { TasksRepository } from "../../../../todo/repository/tasks-repository";

export default createCreateTaskHandler(new TasksRepository());
