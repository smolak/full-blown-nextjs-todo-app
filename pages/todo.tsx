import { NextPage } from "next";
import { TodoContainer } from "../todo/ui/todo.container";

const TodoPage: NextPage = () => <TodoContainer />;

export async function getServerSideProps() {
  await fetch("http://localhost:3000/api/todo/tasks/ping-endpoints");

  return {
    props: {},
  };
}

export default TodoPage;
