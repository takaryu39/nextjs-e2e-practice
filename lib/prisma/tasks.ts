import { CreateTaskInout, TaskId, UpdateTaskInput } from '@/schema/task'
import prisma from '.'

export const getTasks = async (userId: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return { tasks }
  } catch (error: any) {
    return { error }
  }
}

export const createTask = async (task: CreateTaskInout, userId: string) => {
  try {
    const createdTask = await prisma.task.create({
      /* 引数で渡されたタスクにユーザidを渡して生成 */
      data: {
        ...task,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return { task: createdTask }
  } catch (error: any) {
    return { error }
  }
}

export const getTaskById = async ({ taskId }: TaskId) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })
    return { task }
  } catch (error: any) {
    return { error }
  }
}
export const deleteTask = async ({ taskId }: TaskId) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    })
    return { task }
  } catch (error: any) {
    return { error }
  }
}

export const updateTask = async (task: UpdateTaskInput, { taskId }: TaskId) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...task,
      },
    })
    return { task: updatedTask }
  } catch (error: any) {
    return { error }
  }
}
