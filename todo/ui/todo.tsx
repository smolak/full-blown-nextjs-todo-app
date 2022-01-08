import { useEffect, useRef, FC } from "react";
import { TaskVM } from "../models/taskVM";
import styles from "./todo.module.css";

export interface TodoProps {
  onFormSubmit: (taskDescription: string) => void;
  tasks: ReadonlyArray<TaskVM>;
  onTaskClick: (id: TaskVM["id"]) => void;
}

export const Todo: FC<TodoProps> = ({ onFormSubmit, tasks, onTaskClick }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = async () => {
    const taskDescription = (inputRef.current?.value as string).trim();

    if (taskDescription !== "") {
      await onFormSubmit(taskDescription);
    }
  };
  const resetForm = () => formRef.current?.reset();
  const focusOnInput = () => inputRef.current?.focus();

  useEffect(focusOnInput, []);

  return (
    <section className={styles.container}>
      <h1>TODOs</h1>
      <form
        className={styles.form}
        onSubmit={async (event) => {
          event.preventDefault();
          await submitForm();
          resetForm();
          focusOnInput();
        }}
        ref={formRef}
      >
        <span>Enter a task:</span>
        <input className={styles.taskName} ref={inputRef} name="taskName" placeholder="What do you have to do?" />
        <button className={styles.submitButton} type="submit">
          Add
        </button>
      </form>
      <ul className={styles.taskList}>
        {tasks.map(({ id, description, done }) => (
          <li key={id} data-testid={id} onClick={() => onTaskClick(id)}>
            <label className={styles.taskLabel}>
              <input type="checkbox" checked={done} readOnly />
              <span className={done ? styles.taskDone : ""}>{description}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};
