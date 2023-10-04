import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { getNotes } from '@/lib/prisma/notes'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions) //セッション情報を取得
  if (req.method === 'GET') {
    if (!session) {
      //サーバーサイドでエラーが起きた際にはクライアントにエラーメッセージを返す
      return res.status(401).json({
        error: 'You must sign in to access this endpoint',
      })
    }
    try {
      const { notes, error } = await getNotes()
      if (error) throw new Error(error.message)
      return res.status(200).json(notes)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} is not allowed`)
}
export default handler
