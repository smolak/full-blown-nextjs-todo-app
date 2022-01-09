import { FC, useCallback, useEffect, useState } from "react";
import { Todo } from "./todo";
import { TaskVM } from "../models/taskVM";

const fetchTasks = (): Promise<ReadonlyArray<TaskVM>> =>
  fetch("/api/todo/tasks")
    .then((response) => response.json())
    .then(({ tasks }) => tasks);

const createTask = (taskDescription: string) =>
  fetch("/api/todo/tasks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ taskDescription }),
  });

const updateTask = (task: TaskVM) =>
  fetch(`/api/todo/tasks/${task.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(task),
  });

export const TodoContainer: FC = () => {
  const [tasks, setTasks] = useState<ReadonlyArray<TaskVM>>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const onFormSubmit = (taskDescription: string) => {
    createTask(taskDescription)
      .then(() => fetchTasks())
      .then(setTasks);
  };

  const onTaskClick = useCallback(
    (id: TaskVM["id"]) => {
      const task = tasks.find((task) => task.id === id) as TaskVM;
      const toggledTask = {
        ...task,
        done: !task.done,
      };

      updateTask(toggledTask)
        .then(() => fetchTasks())
        .then(setTasks);
    },
    [tasks]
  );

  return <Todo onFormSubmit={onFormSubmit} tasks={tasks} onTaskClick={onTaskClick} />;
};
