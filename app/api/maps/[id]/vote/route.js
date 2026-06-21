import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataDir = path.join(process.cwd(), 'data')
const mapsFile = path.join(dataDir, 'maps.json')

export async function POST(request, { params }) {
  try {
    const { id } = params

    const data = fs.readFileSync(mapsFile, 'utf-8')
    let maps = JSON.parse(data)

    const map = maps.find((m) => m.id === id)
    if (!map) {
      return NextResponse.json({ error: 'Карта не найдена' }, { status: 404 })
    }

    map.votes += 1
    fs.writeFileSync(mapsFile, JSON.stringify(maps, null, 2))

    return NextResponse.json(map)
  } catch (error) {
    console.error('Ошибка:', error)
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
