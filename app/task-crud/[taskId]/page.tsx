import { TaskId } from '@/schema/task'
import { Task } from '@prisma/client'
import { format } from 'date-fns'
import { cookies, headers } from 'next/headers'
import { notFound } from 'next/navigation'

type PageProps = {
  params: TaskId
}
const fetchSingleTask = async (
  data: { token: string | undefined } & TaskId
) => {
  const res = await fetch(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/tasks/${data.taskId}`
        : `${process.env.NEXTAUTH_URL}/api/tasks/${data.taskId}`
    }`,
    {
      headers: {
        cookie: `next-auth.session-token=${data.token}`,
      },
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch tasks')
  }
  const task: Task = await res.json()
  return task
}

const TaskDetailPage = async ({ params }: PageProps) => {
  const nextCookies = cookies()
  const token = nextCookies.get('next-auth.session-token')
  const task = await fetchSingleTask({
    token: token?.value,
    taskId: params.taskId,
  })
  if (!task) return notFound() //タスクが存在しない場合は404ページを出力する
  return (
    <div className="mt-16 p-8">
      <p>Task ID:{task.id}</p>
      <p data-testid="title-dynamic-segment">Title: {task.title}</p>
      <p>Status: {task.completed ? 'done' : 'not yet'}</p>
      <p>
        Created At:{' '}
        {task && format(new Date(task.createdAt), 'yyy-MM-dd HH:mm:ss')}
      </p>
    </div>
  )
}

export default TaskDetailPage
