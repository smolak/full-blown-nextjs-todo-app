import { createUpdateTaskHandler } from "../../../../../todo/handlers/update-task.handler";
import { TasksRepository } from "../../../../../todo/repository/tasks-repository";

export default createUpdateTaskHandler(new TasksRepository());
