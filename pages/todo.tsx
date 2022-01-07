import { NextPage } from "next";

const TodoPage: NextPage = () => {
  return <div>TODO...</div>;
};

export async function getServerSideProps() {
  await fetch("http://localhost:3000/api/todo/tasks/ping-endpoints");

  return {
    props: {},
  };
}

export default TodoPage;
