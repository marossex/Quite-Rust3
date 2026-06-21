import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataDir = path.join(process.cwd(), 'data')
const skinsFile = path.join(dataDir, 'skins.json')

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { status, adminPassword } = body

    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const data = fs.readFileSync(skinsFile, 'utf-8')
    const skins = JSON.parse(data)

    const skinIndex = skins.findIndex((s) => s.id === id)
    if (skinIndex === -1) {
      return NextResponse.json({ error: 'Не найдено' }, { status: 404 })
    }

    skins[skinIndex].status = status
    skins[skinIndex].updatedAt = new Date().toISOString()

    fs.writeFileSync(skinsFile, JSON.stringify(skins, null, 2))
    return NextResponse.json(skins[skinIndex])
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json({ error: 'Ошибка при обновлении' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { adminPassword } = body

    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const data = fs.readFileSync(skinsFile, 'utf-8')
    let skins = JSON.parse(data)

    skins = skins.filter((s) => s.id !== id)
    fs.writeFileSync(skinsFile, JSON.stringify(skins, null, 2))

    return NextResponse.json({ message: 'Удалено' })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ error: 'Ошибка при удалении' }, { status: 500 })
  }
}
