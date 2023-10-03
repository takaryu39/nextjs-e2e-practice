import prisma from '../../lib/prisma'
import { chromium } from '@playwright/test'
import path from 'node:path'
import React from 'react'

const globalSetUp = async () => {
  const storagePath = path.resolve(__dirname, 'storageState.json')
  const date = new Date()
  const sessionToken = 'pfewpppfewpfppewefew-few'

  await prisma.user.upsert({
    where: {
      email: 'udemy@test.com',
    },
    create: {
      name: 'userA',
      email: 'udemy@test.com',
      sessions: {
        create: {
          expires: new Date(
            date.getFullYear(),
            date.getMonth() + 6,
            date.getDate()
          ),
          sessionToken,
        },
      },
      accounts: {
        create: {
          type: 'oauth',
          provider: 'github',
          providerAccountId: '1234567',
          access_token: 'Q3v00dCoWcdzmxpGeiPG2I3wDgsJypSP',
          token_type: 'bearer',
          scope: 'read:user,user:email',
        },
      },
    },
    update: {},
  })
  const browser = await chromium.launch()
  const context = await browser.newContext()
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.round((Date.now() + 86400000 * 1) / 1000),
    },
  ])
  await context.storageState({ path: storagePath }) //jsonファイルに書き出し
  await browser.close()
}

export default globalSetUp
