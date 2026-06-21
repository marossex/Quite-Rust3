'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaThumbsUp, FaTrash } from 'react-icons/fa'

export default function MapsPage() {
  const [mounted, setMounted] = useState(false)
  const [maps, setMaps] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [voted, setVoted] = useState(new Set())

  useEffect(() => {
    setMounted(true)
    fetchMaps()
    const interval = setInterval(fetchMaps, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchMaps = async () => {
    try {
      const res = await fetch('/api/maps')
      if (res.ok) {
        const data = await res.json()
        setMaps(data.sort((a, b) => b.votes - a.votes))
      }
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  const voteMap = async (mapId) => {
    if (voted.has(mapId)) {
      alert('Ты уже голосовал за эту карту!')
      return
    }

    try {
      await fetch(`/api/maps/${mapId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      setVoted(new Set([...voted, mapId]))
      await fetchMaps()
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  const deleteMap = async (id) => {
    try {
      await fetch(`/api/maps/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
      })
      await fetchMaps()
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  const checkAdmin = () => {
    if (adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAdmin(true)
      setAdminPassword('')
    } else {
      alert('Неверный пароль!')
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 scanline" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-700/30 backdrop-blur-sm">
          <div className="accent-line w-full" />
          <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
            <Link href="/server">
              <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-all">
                <FaArrowLeft />
                <span className="uppercase text-xs tracking-widest">Назад</span>
              </button>
            </Link>

            <h1 className="text-4xl font-bold text-white">Голосование за Карты</h1>

            {!isAdmin && (
              <button
                onClick={() => {
                  const pwd = prompt('Админ пароль:')
                  if (pwd) {
                    setAdminPassword(pwd)
                    setTimeout(() => checkAdmin(), 100)
                  }
                }}
                className="text-gray-400 hover:text-gray-200 text-sm uppercase tracking-widest"
              >
                Админ
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => setIsAdmin(false)}
                className="text-red-400 hover:text-red-300 text-sm uppercase tracking-widest"
              >
                Выход
              </button>
            )}
          </div>
          <div className="accent-line w-full" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {isAdmin && (
            <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl mb-12 slide-up">
              <p className="text-gray-400">
                Для добавления карт перейди в{' '}
                <Link href="/admin" className="text-blue-400 hover:text-blue-300">
                  Админ панель
                </Link>
              </p>
            </div>
          )}

          {/* Maps Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Доступные Карты ({maps.length})</h2>
            {maps.length === 0 ? (
              <div className="text-gray-500 text-center py-12">Нет карт для голосования</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maps.map((map) => (
                  <div
                    key={map.id}
                    className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-6 rounded-xl hover-lift slide-up overflow-hidden"
                  >
                    {/* Map image */}
                    <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                      {map.image ? (
                        <img
                          src={map.image}
                          alt={map.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm">Карта: {map.name}</span>
                      )}
                    </div>

                    {/* Map info */}
                    <h3 className="text-xl font-bold text-white mb-2">{map.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">Размер: {map.size}</p>

                    {/* Vote button */}
                    <button
                      onClick={() => voteMap(map.id)}
                      disabled={voted.has(map.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-colors mb-4 ${
                        voted.has(map.id)
                          ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                          : 'bg-green-700 hover:bg-green-600 text-white'
                      }`}
                    >
                      <FaThumbsUp />
                      {voted.has(map.id) ? 'Ты голосовал' : 'Голосовать'}
                    </button>

                    {/* Vote count */}
                    <div className="bg-gray-700/20 p-3 rounded-lg text-center border border-gray-700/30">
                      <p className="text-green-400 font-bold text-lg">{map.votes} голосов</p>
                    </div>

                    {/* Delete button for admin */}
                    {isAdmin && (
                      <button
                        onClick={() => deleteMap(map.id)}
                        className="w-full mt-4 bg-red-700/50 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <FaTrash />
                        Удалить
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
