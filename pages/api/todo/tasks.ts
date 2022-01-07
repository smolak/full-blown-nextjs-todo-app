import { TasksRepository } from "../../../todo/repository/tasks-repository";
import { createGetAllTasksHandler } from "../../../todo/handlers/get-all-tasks.handler";

export default createGetAllTasksHandler(new TasksRepository());
