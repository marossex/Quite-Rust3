'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaTrash } from 'react-icons/fa'

export default function ForumPage() {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState([])
  const [nickname, setNickname] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')

  useEffect(() => {
    setMounted(true)
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/forum')
      if (res.ok) setMessages(await res.json())
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!nickname.trim() || !messageText.trim()) return

    try {
      await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: messageText,
          author: nickname,
        }),
      })
      setMessageText('')
      await fetchMessages()
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
      await fetchMessages()
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

            <h1 className="text-4xl font-bold text-white">Форум</h1>

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
          {/* Send message form */}
          <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl mb-12 slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">Написать сообщение</h2>
            <form onSubmit={sendMessage} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Твой Ник</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Введи ник"
                  className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Сообщение</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Напиши сообщение..."
                  className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gray-600 resize-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
              >
                Отправить
              </button>
            </form>
          </div>

          {/* Messages */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Сообщения ({messages.length})</h2>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-gray-500 text-center py-8">Нет сообщений</div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-6 rounded-xl hover-lift slide-up"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-white text-lg">{msg.author}</p>
                        <p className="text-gray-300 mt-2 break-words">{msg.text}</p>
                        <span className="text-xs text-gray-500 mt-3 block">
                          {new Date(msg.createdAt).toLocaleString('ru-RU')}
                        </span>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="bg-red-700/50 hover:bg-red-600 text-white p-2 rounded transition-colors flex-shrink-0"
                          title="Удалить"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
