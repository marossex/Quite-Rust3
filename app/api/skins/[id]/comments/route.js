import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataDir = path.join(process.cwd(), 'data')
const skinsFile = path.join(dataDir, 'skins.json')

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { comment, adminPassword } = body

    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    if (!comment) {
      return NextResponse.json({ error: 'Комментарий пуст' }, { status: 400 })
    }

    const data = fs.readFileSync(skinsFile, 'utf-8')
    const skins = JSON.parse(data)

    const skinIndex = skins.findIndex((s) => s.id === id)
    if (skinIndex === -1) {
      return NextResponse.json({ error: 'Не найдено' }, { status: 404 })
    }

    const newComment = {
      id: Date.now().toString(),
      text: comment,
      createdAt: new Date().toISOString(),
    }

    skins[skinIndex].comments.push(newComment)
    skins[skinIndex].updatedAt = new Date().toISOString()

    fs.writeFileSync(skinsFile, JSON.stringify(skins, null, 2))
    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('POST comment error:', error)
    return NextResponse.json({ error: 'Ошибка при добавлении' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { commentId, adminPassword } = body

    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const data = fs.readFileSync(skinsFile, 'utf-8')
    const skins = JSON.parse(data)

    const skinIndex = skins.findIndex((s) => s.id === id)
    if (skinIndex === -1) {
      return NextResponse.json({ error: 'Не найдено' }, { status: 404 })
    }

    skins[skinIndex].comments = skins[skinIndex].comments.filter((c) => c.id !== commentId)
    skins[skinIndex].updatedAt = new Date().toISOString()

    fs.writeFileSync(skinsFile, JSON.stringify(skins, null, 2))
    return NextResponse.json({ message: 'Удалено' })
  } catch (error) {
    console.error('DELETE comment error:', error)
    return NextResponse.json({ error: 'Ошибка при удалении' }, { status: 500 })
  }
}
