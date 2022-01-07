import { NextApiRequest, NextApiResponse } from "next";
import { TaskVM } from "../models/taskVM";
import { TasksRepositoryInterface } from "../repository/tasks-repository";
import { StatusCodes } from "http-status-codes";

type Data = {
  task: TaskVM;
};

export const createUpdateTaskHandler =
  (tasksRepository: TasksRepositoryInterface) => async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (req.method === "PUT") {
      const { id } = req.query;
      const task = await tasksRepository.updateTask(id as string, req.body);

      res.status(StatusCodes.CREATED).json({ task });
    } else {
      res.setHeader("Allow", "PUT");
      res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
    }
  };
