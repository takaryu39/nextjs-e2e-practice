import React from 'react'
import prisma from '.'

export const getNotes = async () => {
  try {
    const notes = await prisma.note.findMany()

    return { notes }
  } catch (error: any) {
    return { error }
  }
}
