import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please login to start creating todos!" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    console.log(req.body);
    const content = req.body.content;

    if (content.length > 300) {
      return res.status(403).json({
        message:
          "You are exceeded maximum length of a Todo. Please write it shorter!",
      });
    }
    if (!content.length) {
      return res.status(403).json({ message: "Your todo is empty!" });
    }

    try {
      const result = await prisma.todo.create({
        data: {
          content,
          userId: user?.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "Error has occured!" });
    }
  }

  if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({
        message: "Please login to delete posts!",
      });
    }
  }
}