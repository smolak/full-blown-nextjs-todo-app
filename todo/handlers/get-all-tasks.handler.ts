import { NextApiRequest, NextApiResponse } from "next";
import { TaskVM } from "../models/taskVM";
import { TasksRepositoryInterface } from "../repository/tasks-repository";
import { StatusCodes } from "http-status-codes";

type Data = {
  tasks: ReadonlyArray<TaskVM>;
};

export const createGetAllTasksHandler =
  (tasksRepository: TasksRepositoryInterface) => async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (req.method === "GET") {
      const tasks = await tasksRepository.getAllTasks();

      res.status(StatusCodes.OK).json({ tasks });
    } else {
      res.status(StatusCodes.METHOD_NOT_ALLOWED).setHeader("Allow", "GET");
    }
  };
