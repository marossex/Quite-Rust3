import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataDir = path.join(process.cwd(), 'data')
const forumFile = path.join(dataDir, 'forum.json')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

if (!fs.existsSync(forumFile)) {
  fs.writeFileSync(forumFile, JSON.stringify([]))
}

export async function GET(request) {
  try {
    const data = fs.readFileSync(forumFile, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { text, author } = body

    if (!text || !author) {
      return NextResponse.json({ error: 'Заполни все поля' }, { status: 400 })
    }

    const data = fs.readFileSync(forumFile, 'utf-8')
    const messages = JSON.parse(data)

    const newMessage = {
      id: Date.now().toString(),
      text,
      author,
      createdAt: new Date().toISOString(),
    }

    messages.push(newMessage)
    fs.writeFileSync(forumFile, JSON.stringify(messages, null, 2))

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Ошибка:', error)
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
