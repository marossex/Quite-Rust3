import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataDir = path.join(process.cwd(), 'data')
const mapsFile = path.join(dataDir, 'maps.json')

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { adminPassword } = body

    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const data = fs.readFileSync(mapsFile, 'utf-8')
    let maps = JSON.parse(data)

    maps = maps.filter((m) => m.id !== id)
    fs.writeFileSync(mapsFile, JSON.stringify(maps, null, 2))

    return NextResponse.json({ message: 'Удалено' })
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
