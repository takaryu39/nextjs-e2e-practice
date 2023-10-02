import { DefaultSession } from 'next-auth'

//userのidを追加してSessionとして使用できるようにする
declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
    } & DefaultSession['user']
  }
}
