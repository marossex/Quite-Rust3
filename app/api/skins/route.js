import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataDir = path.join(process.cwd(), 'data')
const skinsFile = path.join(dataDir, 'skins.json')

// Создаём папку если её нет
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Инициализируем файл если его нет
if (!fs.existsSync(skinsFile)) {
  fs.writeFileSync(skinsFile, JSON.stringify([], null, 2))
}

export async function GET(request) {
  try {
    const data = fs.readFileSync(skinsFile, 'utf-8')
    const skins = JSON.parse(data)
    return NextResponse.json(skins)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { steamLink, username } = body

    if (!steamLink || !username) {
      return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
    }

    const data = fs.readFileSync(skinsFile, 'utf-8')
    const skins = JSON.parse(data)

    const newSkin = {
      id: Date.now().toString(),
      steamLink,
      username,
      status: 'pending',
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    skins.push(newSkin)
    fs.writeFileSync(skinsFile, JSON.stringify(skins, null, 2))

    return NextResponse.json(newSkin, { status: 201 })
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json({ error: 'Ошибка при добавлении' }, { status: 500 })
  }
}
