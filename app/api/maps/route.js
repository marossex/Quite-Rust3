import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import fs from 'fs'
import path from 'path'

const MAPS_DIR = path.join(process.cwd(), 'public', 'maps')
const dataDir = path.join(process.cwd(), 'data')
const mapsFile = path.join(dataDir, 'maps.json')

// Создаём папки если их нет
async function ensureDirs() {
  if (!fs.existsSync(MAPS_DIR)) {
    await mkdir(MAPS_DIR, { recursive: true })
  }
  if (!fs.existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
  if (!fs.existsSync(mapsFile)) {
    fs.writeFileSync(mapsFile, JSON.stringify([]))
  }
}

export async function GET(request) {
  try {
    await ensureDirs()
    const data = fs.readFileSync(mapsFile, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    await ensureDirs()

    const formData = await request.formData()
    const name = formData.get('name')
    const size = formData.get('size')
    const imageFile = formData.get('image')

    if (!name || !size) {
      return NextResponse.json({ error: 'Заполни все поля' }, { status: 400 })
    }

    let imageUrl = null

    if (imageFile) {
      try {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const timestamp = Date.now()
        const ext = imageFile.name.split('.').pop() || 'jpg'
        const filename = `map_${timestamp}.${ext}`
        const filepath = path.join(MAPS_DIR, filename)

        await writeFile(filepath, buffer)
        imageUrl = `/maps/${filename}`
      } catch (err) {
        console.error('Ошибка сохранения:', err)
      }
    }

    const data = fs.readFileSync(mapsFile, 'utf-8')
    const maps = JSON.parse(data)

    const newMap = {
      id: Date.now().toString(),
      name,
      size,
      votes: 0,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    }

    maps.push(newMap)
    fs.writeFileSync(mapsFile, JSON.stringify(maps, null, 2))

    return NextResponse.json(newMap, { status: 201 })
  } catch (error) {
    console.error('Ошибка:', error)
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
