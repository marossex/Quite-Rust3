'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaLock, FaComments, FaImages, FaGift } from 'react-icons/fa'

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('forum')
  const [messages, setMessages] = useState([])
  const [maps, setMaps] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [mapName, setMapName] = useState('')
  const [mapSize, setMapSize] = useState('')

  useEffect(() => {
    setMounted(true)
    if (isAuth) {
      loadData()
    }
  }, [isAuth])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuth(true)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setPassword('')
    } else {
      alert('Неверный пароль!')
      setPassword('')
    }
  }

  const loadData = async () => {
    try {
      const [msgRes, mapRes] = await Promise.all([
        fetch('/api/forum'),
        fetch('/api/maps'),
      ])
      if (msgRes.ok) setMessages(await msgRes.json())
      if (mapRes.ok) setMaps(await mapRes.json())
    } catch (err) {
      console.error('Ошибка загрузки:', err)
    }
  }

  const addMessage = async () => {
    if (!newMessage.trim()) return
    try {
      await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newMessage,
          author: 'Админ',
          adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
        }),
      })
      setNewMessage('')
      loadData()
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  const deleteMessage = async (id) => {
    try {
      await fetch(`/api/forum/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
      })
      loadData()
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  const addMap = async () => {
    if (!mapName.trim() || !mapSize.trim()) return
    try {
      await fetch('/api/maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: mapName,
          size: mapSize,
          votes: 0,
          adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
        }),
      })
      setMapName('')
      setMapSize('')
      loadData()
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
      loadData()
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  if (!mounted) return null

  if (!isAuth) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 scanline" />
        </div>

        <div className="relative z-10 w-full max-w-md px-4">
          <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <FaLock className="text-red-400 text-2xl" />
              <h1 className="text-3xl font-bold text-white">Админ Панель</h1>
            </div>

            {showSuccess && (
              <div className="bg-green-900/30 border border-green-700/50 text-green-300 px-4 py-3 rounded-lg mb-6 text-center slide-down">
                ✅ Авторизация успешна!
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введи пароль"
                  className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Вход
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

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

            <h1 className="text-3xl font-bold text-white">Админ Панель</h1>

            <button
              onClick={() => setIsAuth(false)}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-all"
            >
              <FaLock />
              <span className="uppercase text-xs tracking-widest">Выход</span>
            </button>
          </div>
          <div className="accent-line w-full" />
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-4 mb-8 border-b border-gray-700/30 pb-4">
            <button
              onClick={() => setActiveTab('forum')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${
                activeTab === 'forum'
                  ? 'bg-blue-700/50 text-white'
                  : 'bg-gray-800/30 text-gray-400 hover:text-white'
              }`}
            >
              <FaComments />
              Форум
            </button>
            <button
              onClick={() => setActiveTab('maps')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${
                activeTab === 'maps'
                  ? 'bg-blue-700/50 text-white'
                  : 'bg-gray-800/30 text-gray-400 hover:text-white'
              }`}
            >
              <FaImages />
              Карты
            </button>
            <button
              onClick={() => setActiveTab('skins')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${
                activeTab === 'skins'
                  ? 'bg-blue-700/50 text-white'
                  : 'bg-gray-800/30 text-gray-400 hover:text-white'
              }`}
            >
              <FaGift />
              Скины
            </button>
          </div>

          {/* Forum Tab */}
          {activeTab === 'forum' && (
            <div className="space-y-6">
              <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Форум</h2>

                {/* Add message form */}
                <div className="mb-8 space-y-4">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напиши сообщение как Админ..."
                    className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gray-600 resize-none"
                    rows={4}
                  />
                  <button
                    onClick={addMessage}
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                  >
                    Отправить
                  </button>
                </div>

                {/* Messages list */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Сообщения ({messages.length})</h3>
                  {messages.length === 0 ? (
                    <p className="text-gray-500 italic">Нет сообщений</p>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="bg-gray-700/20 p-4 rounded-lg border border-gray-700/30 flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-white">{msg.author}</p>
                          <p className="text-gray-300 mt-2">{msg.text}</p>
                          <span className="text-xs text-gray-500 mt-2 block">
                            {new Date(msg.createdAt).toLocaleString('ru-RU')}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="bg-red-700/50 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors flex-shrink-0"
                        >
                          Удалить
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Maps Tab */}
          {activeTab === 'maps' && (
            <div className="space-y-6">
              <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Голосование за Карты</h2>

                {/* Add map form */}
                <form onSubmit={async (e) => {
                  e.preventDefault()
                  if (!mapName.trim() || !mapSize.trim()) return

                  const formData = new FormData()
                  formData.append('name', mapName)
                  formData.append('size', mapSize)
                  const fileInput = e.target.querySelector('input[type="file"]')
                  if (fileInput?.files?.[0]) {
                    formData.append('image', fileInput.files[0])
                  }

                  try {
                    await fetch('/api/maps', {
                      method: 'POST',
                      body: formData,
                    })
                    setMapName('')
                    setMapSize('')
                    fileInput.value = ''
                    loadData()
                  } catch (err) {
                    console.error('Ошибка:', err)
                  }
                }} className="mb-8 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Название Карты</label>
                    <input
                      type="text"
                      value={mapName}
                      onChange={(e) => setMapName(e.target.value)}
                      placeholder="Название карты"
                      className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Размер</label>
                    <input
                      type="text"
                      value={mapSize}
                      onChange={(e) => setMapSize(e.target.value)}
                      placeholder="4000x4000, 5000x5000 и т.д."
                      className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Картинка Карты</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                  >
                    Добавить Карту
                  </button>
                </form>

                {/* Maps list */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Карты ({maps.length})</h3>
                  {maps.length === 0 ? (
                    <p className="text-gray-500 italic">Нет карт</p>
                  ) : (
                    maps.map((map) => (
                      <div key={map.id} className="bg-gray-700/20 p-4 rounded-lg border border-gray-700/30 flex justify-between items-center gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-white">{map.name}</p>
                          <p className="text-gray-400 text-sm">Размер: {map.size}</p>
                          <p className="text-green-400 text-sm mt-1">Голосов: {map.votes}</p>
                        </div>
                        <button
                          onClick={() => deleteMap(map.id)}
                          className="bg-red-700/50 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                          Удалить
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Skins Tab */}
          {activeTab === 'skins' && (
            <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Управление Скинами</h2>
              <p className="text-gray-400">
                Перейди на{' '}
                <Link href="/skins" className="text-blue-400 hover:text-blue-300">
                  страницу скинов
                </Link>
                {' '}для управления скинами
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
