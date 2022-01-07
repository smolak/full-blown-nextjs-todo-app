import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Pinging...");

  await Promise.allSettled([
    fetch("http://localhost:3000/api/todo/tasks", { method: "HEAD" }),
    fetch("http://localhost:3000/api/todo/tasks/create", { method: "HEAD" }),
    fetch("http://localhost:3000/api/todo/tasks/id/edit", { method: "HEAD" }),
  ]);

  res.status(200).json({ name: "All endpoints awakened" });
}
