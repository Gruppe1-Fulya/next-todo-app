import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'POST') {
    if (!session) {
      return res
        .status(401)
        .json({ message: 'Please login to start creating todos!' })
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    })

    console.log(req.body)
    const content = req.body.content

    if (content.length > 300) {
      return res.status(403).json({
        message:
          'You are exceeded maximum length of a Todo. Please write it shorter!',
      })
    }
    if (!content.length) {
      return res.status(403).json({ message: 'Your todo is empty!' })
    }

    try {
      const result = await prisma.todo.create({
        data: {
          content,
          userId: user?.id,
        },
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({ error: 'Error has occured!' })
    }
  }

  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({
        message: 'Please login to delete todos!',
      })
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found!',
      })
    }

    console.log(req.query)
    const todoId = req.query.id // This should be the id of the todo you want to delete

    if (!todoId) {
      return res.status(400).json({
        message: 'No id provided!',
      })
    }

    try {
      const todo = await prisma.todo.findUnique({
        where: { id: todoId as string },
      })

      if (!todo) {
        return res.status(404).json({
          message: 'Todo not found!',
        })
      }

      if (todo.userId !== user.id) {
        return res.status(403).json({
          message: 'You do not have permission to delete this todo!',
        })
      }

      const result = await prisma.todo.delete({
        where: { id: todoId as string },
      })
      return res.status(200).json(result)
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error has occured while deleting the todo!' })
    }
  }
  if (req.method === 'PATCH') {
    if (!session) {
      return res.status(401).json({ message: 'Please login to update todos!' })
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    })

    const { id, content, status } = req.body // Get the id and new content from the request body

    if (!id) {
      return res.status(400).json({ message: 'Todo id is missing!' })
    }

    if (content.length > 300) {
      return res.status(403).json({
        message:
          'You exceeded the maximum length of a Todo. Please write it shorter!',
      })
    }
    if (!content.length) {
      return res.status(403).json({ message: 'Your todo is empty!' })
    }

    try {
      const result = await prisma.todo.update({
        where: {
          id: id, // Find todo by id
        },
        data: {
          content: content, // Update content
          status: status,
        },
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({ error: 'Error has occured!' })
    }
  }
}
