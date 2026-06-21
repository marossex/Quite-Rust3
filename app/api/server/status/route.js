import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // ОБНОВЛЯЙ ЭТИ ЗНАЧЕНИЯ ВРУЧНУЮ ИЛИ ЧЕРЕЗ ADMIN ПАНЕЛЬ
    const serverData = {
      online: 5,              // Текущий онлайн
      maxPlayers: 100,        // Макс слотов
      map: 'Procedural',      // Карта
      serverName: 'Quite Rust',
      status: 'online',
    }

    return NextResponse.json(serverData)
  } catch (error) {
    return NextResponse.json(
      {
        online: 0,
        maxPlayers: 100,
        map: 'Unknown',
        serverName: 'Quite Rust',
        status: 'offline',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
