import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function getTodos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.todo.findMany({
        include: {
          User: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(403).json(error);
    }
  }
}