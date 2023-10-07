'use client'
import useStore from '@/store'
import { Task } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

const TaskItem = (task: Task) => {
  const router = useRouter()
  const updateEditedTask = useStore((state) => state.updateEditedTask)
  const resetEditedTask = useStore((state) => state.resetEditedTask)
  const updateTaskHandler = async (data: {
    id: string
    completed: boolean
  }) => {
    await fetch(`/api/tasks/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: data.completed }),
    })
    resetEditedTask()
    router.refresh()
  }
  const deleteTaskHandler = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
    router.refresh()
  }

  return (
    <li className="my-2">
      <input
        className="mr-1"
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          updateTaskHandler({ id: task.id, completed: !task.completed })
        }
      />
      <Link href={`/task-crud/${task.id}`}>{task.title}</Link>
      <div className="float-right ml-20 flex">
        <PencilIcon
          data-testid="task-edit-icon"
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            updateEditedTask({
              id: task.id,
              title: task.title,
              completed: task.completed,
            })
          }}
        />
        <TrashIcon
          data-testid="task-delete-icon"
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => deleteTaskHandler(task.id)}
        />
      </div>
    </li>
  )
}

export default TaskItem
