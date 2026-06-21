import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataDir = path.join(process.cwd(), 'data')
const forumFile = path.join(dataDir, 'forum.json')

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { adminPassword } = body

    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const data = fs.readFileSync(forumFile, 'utf-8')
    let messages = JSON.parse(data)

    messages = messages.filter((m) => m.id !== id)
    fs.writeFileSync(forumFile, JSON.stringify(messages, null, 2))

    return NextResponse.json({ message: 'Удалено' })
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
