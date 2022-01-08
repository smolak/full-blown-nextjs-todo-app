import { FC, useCallback, useEffect, useState } from "react";
import { Todo } from "./todo";
import { TaskVM } from "../models/taskVM";

const fetchTasks = (callback: (tasks: ReadonlyArray<TaskVM>) => void) =>
  fetch("/api/todo/tasks")
    .then((response) => response.json())
    .then(({ tasks }) => callback(tasks));

const createTask = (taskDescription: string) =>
  fetch("/api/todo/tasks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ taskDescription }),
  });

const updateTask = function (task: TaskVM) {
  return fetch(`/api/todo/tasks/${task.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(task),
  });
};

export const TodoContainer: FC = () => {
  const [tasks, setTasks] = useState<ReadonlyArray<TaskVM>>([]);

  useEffect(() => {
    fetchTasks(setTasks);
  }, []);

  const onFormSubmit = (taskDescription: string) => {
    createTask(taskDescription).then(() => fetchTasks(setTasks));
  };

  const onTaskClick = useCallback(
    (id: TaskVM["id"]) => {
      const task = tasks.find((task) => task.id === id) as TaskVM;
      const toggledTask = {
        ...task,
        done: !task.done,
      };

      updateTask(toggledTask).then(() => fetchTasks(setTasks));
    },
    [tasks]
  );

  return <Todo onFormSubmit={onFormSubmit} tasks={tasks} onTaskClick={onTaskClick} />;
};
