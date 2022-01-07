import { NextApiRequest, NextApiResponse } from "next";
import { TaskVM } from "../models/taskVM";
import { TasksRepositoryInterface } from "../repository/tasks-repository";
import { StatusCodes } from "http-status-codes";

type Data = {
  task: TaskVM;
};

export const createCreateTaskHandler =
  (tasksRepository: TasksRepositoryInterface) => async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (req.method === "POST") {
      const task = await tasksRepository.createTask(req.body.taskDescription as string);

      res.status(StatusCodes.CREATED).json({ task });
    } else {
      res.setHeader("Allow", "POST");
      res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
    }
  };
