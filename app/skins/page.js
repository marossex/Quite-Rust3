'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaCheck, FaTimes, FaTrash, FaComment, FaLock } from 'react-icons/fa'

export default function SkinsPage() {
  const [skins, setSkins] = useState([])
  const [mounted, setMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const [formData, setFormData] = useState({
    steamLink: '',
    username: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [expandedComments, setExpandedComments] = useState({})
  const [newComment, setNewComment] = useState({})

  useEffect(() => {
    setMounted(true)
    fetchSkins()
  }, [])

  const fetchSkins = async () => {
    try {
      const res = await fetch('/api/skins')
      if (!res.ok) throw new Error('Ошибка загрузки')
      const data = await res.json()
      // Убеждаемся что у каждого скина есть comments array
      const skinsWithComments = data.map(skin => ({
        ...skin,
        comments: skin.comments || []
      }))
      setSkins(skinsWithComments)
    } catch (err) {
      console.error('Ошибка при загрузке скинов:', err)
      setError('Ошибка при загрузке данных')
    }
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword('')
    } else {
      setError('Неверный пароль')
      setTimeout(() => setError(''), 2000)
    }
  }

  // Auto-clear errors after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 2000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Auto-clear success after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleAdminLogout = () => {
    setIsAdmin(false)
    setAdminPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/skins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Ошибка при добавлении скина')

      setSuccess('Скин успешно добавлен! Ожидание модерации...')
      setFormData({ steamLink: '', username: '' })
      await fetchSkins()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (skinId) => {
    try {
      const res = await fetch(`/api/skins/${skinId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved', adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
      })

      if (!res.ok) throw new Error('Ошибка при одобрении')
      setSuccess('Скин одобрен!')
      await fetchSkins()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleReject = async (skinId) => {
    try {
      const res = await fetch(`/api/skins/${skinId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
      })

      if (!res.ok) throw new Error('Ошибка при отклонении')
      setSuccess('Скин отклонён!')
      await fetchSkins()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (skinId) => {
    if (!confirm('Вы уверены?')) return

    try {
      const res = await fetch(`/api/skins/${skinId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
      })

      if (!res.ok) throw new Error('Ошибка при удалении')
      await fetchSkins()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddComment = async (skinId) => {
    if (!newComment[skinId]?.trim()) return

    try {
      const res = await fetch(`/api/skins/${skinId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: newComment[skinId], adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
      })

      if (!res.ok) throw new Error('Ошибка при добавлении комментария')
      setNewComment({ ...newComment, [skinId]: '' })
      await fetchSkins()
    } catch (err) {
      setError(err.message)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 pulse-slow" />
        <div className="absolute inset-0 scanline" />
      </div>

      <div className="relative z-10">
        {/* Header with Navigation Tabs */}
        <div className="border-b border-gray-700/30 backdrop-blur-sm">
          <div className="accent-line w-full" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0 h-24">
              {/* Back Button */}
              <Link href="/">
                <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-300 group pr-6 border-r border-gray-700/30">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  <span className="uppercase text-xs tracking-widest">Назад</span>
                </button>
              </Link>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight px-6 flex-1">
                Quite Rust
              </h1>

              {/* Navigation Tabs */}
              <div className="flex gap-4 ml-auto items-center">
                {/* Server Tab */}
                <Link href="/server">
                  <button className="flex items-center justify-center px-8 py-6 border-b-4 border-transparent hover:border-gray-500 group transition-all hover-lift">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Сервер</span>
                  </button>
                </Link>

                {/* Skins Tab */}
                <div className="flex items-center justify-center px-8 py-6 border-b-4 border-purple-700 group cursor-default hover-lift">
                  <span className="text-lg font-bold text-white uppercase tracking-widest neon">Скины</span>
                </div>

                {/* Admin Button */}
                <button
                  onClick={() => (isAdmin ? handleAdminLogout() : setShowAdminLogin(true))}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ml-4 ${
                    isAdmin
                      ? 'bg-red-700/50 hover:bg-red-600 text-red-200'
                      : 'bg-gray-700/50 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  <FaLock size={14} />
                  <span className="uppercase text-xs tracking-widest font-bold">
                    {isAdmin ? 'Выход' : 'Админ'}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="accent-line w-full" />
        </div>

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800/80 border border-gray-700/50 rounded-xl p-8 max-w-md w-full blur-in">
              <h2 className="text-2xl font-bold text-white mb-6">Вход админа</h2>
              <form onSubmit={handleAdminLogin}>
                <input
                  type="password"
                  placeholder="Пароль"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    Вход
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Messages */}
          {error && <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-6 py-4 rounded-lg mb-8 slide-down">{error}</div>}
          {success && <div className="bg-green-900/30 border border-green-700/50 text-green-300 px-6 py-4 rounded-lg mb-8 slide-down">{success}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1 slide-up stagger-1">
              <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl sticky top-8 hover-lift border-glow">
                <h2 className="text-2xl font-bold text-white mb-6 neon">Добавить скин</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Ник в Steam"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ссылка на мастерскую Steam</label>
                    <input
                      type="url"
                      placeholder="https://steamcommunity.com/..."
                      value={formData.steamLink}
                      onChange={(e) => setFormData({ ...formData, steamLink: e.target.value })}
                      className="w-full bg-gray-700/30 border border-gray-700/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover-glow disabled:opacity-50"
                  >
                    {loading ? 'Загрузка...' : 'Отправить'}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-700/30 text-sm text-gray-500">
                  <p className="font-semibold text-gray-400 mb-2">Статусы:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full pulse-slow" />
                      <span>Ожидание</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full glow-animation" />
                      <span>Одобрено</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full glow-animation" />
                      <span>Отклонено</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skins List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 slide-up stagger-2 neon">Все скины ({skins.length})</h2>

              {skins.length === 0 ? (
                <div className="bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 rounded-xl text-center text-gray-400">
                  <p>Скины ещё не добавлены</p>
                </div>
              ) : (
                skins.map((skin, idx) => (
                  <div
                    key={skin.id}
                    className={`bg-gray-800/40 backdrop-blur border-2 rounded-xl p-6 transition-all duration-300 slide-up hover-lift ${
                      skin.status === 'approved'
                        ? 'border-green-700/50 glow-animation'
                        : skin.status === 'rejected'
                          ? 'border-red-700/50 glow-animation'
                          : 'border-yellow-700/30'
                    }`}
                    style={{ '--stagger-delay': `${(idx + 1) * 0.1}s` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white neon">{skin.username}</h3>
                          <span
                            className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                              skin.status === 'approved'
                                ? 'bg-green-900/50 text-green-400 pulse-slow'
                                : skin.status === 'rejected'
                                  ? 'bg-red-900/50 text-red-400 pulse-slow'
                                  : 'bg-yellow-900/50 text-yellow-400 pulse-slow'
                            }`}
                          >
                            {skin.status === 'approved' ? '✓ Одобрено' : skin.status === 'rejected' ? '✗ Отклонено' : '⏳ Ожидание'}
                          </span>
                        </div>
                        <a href={skin.steamLink} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-300 break-all transition-colors shimmer">
                          {skin.steamLink}
                        </a>
                      </div>

                      {/* Admin Controls */}
                      {isAdmin && (
                        <div className="flex gap-2 ml-4 flex-shrink-0">
                          <button
                            onClick={() => handleApprove(skin.id)}
                            className="bg-green-700/50 hover:bg-green-600 text-white p-2 rounded-lg transition-all hover-rotate"
                            title="Одобрить"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleReject(skin.id)}
                            className="bg-red-700/50 hover:bg-red-600 text-white p-2 rounded-lg transition-all hover-rotate"
                            title="Отклонить"
                          >
                            <FaTimes />
                          </button>
                          <button
                            onClick={() => handleDelete(skin.id)}
                            className="bg-gray-700/50 hover:bg-gray-600 text-white p-2 rounded-lg transition-all hover-rotate"
                            title="Удалить"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Comments Section - Visible for everyone, editable by admin */}
                    <div className="mt-6 pt-6 border-t border-gray-700/30 space-y-3">
                      <div className="flex items-center gap-2 text-gray-300 font-semibold">
                        <FaComment />
                        <span className="text-sm">Комментарии ({skin.comments?.length || 0})</span>
                      </div>

                      {/* Existing comments */}
                      <div className="space-y-3 bg-gray-700/20 p-4 rounded-lg max-h-64 overflow-y-auto">
                        {!skin.comments || skin.comments.length === 0 ? (
                          <p className="text-sm text-gray-500 italic">Нет комментариев</p>
                        ) : (
                          skin.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start justify-between gap-3 bg-gray-700/30 p-3 rounded border border-gray-700/20 fade-in">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-200 break-words">{comment.text}</p>
                                <span className="text-xs text-gray-500 mt-2 block">
                                  {new Date(comment.createdAt).toLocaleString('ru-RU')}
                                </span>
                              </div>
                              {isAdmin && (
                                <button
                                  onClick={() => {
                                    fetch(`/api/skins/${skin.id}/comments`, {
                                      method: 'DELETE',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ commentId: comment.id, adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
                                    }).then(() => fetchSkins()).catch(err => setError(err.message))
                                  }}
                                  className="text-red-400 hover:text-red-300 flex-shrink-0 transition-colors p-1"
                                  title="Удалить"
                                >
                                  <FaTrash size={12} />
                                </button>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add comment form - Only for admin */}
                      {isAdmin && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Добавить комментарий..."
                            value={newComment[skin.id] || ''}
                            onChange={(e) => setNewComment({ ...newComment, [skin.id]: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(skin.id)}
                            className="flex-1 bg-gray-700/30 border border-gray-700/50 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-gray-600 transition-colors"
                          />
                          <button
                            onClick={() => handleAddComment(skin.id)}
                            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors hover-glow font-semibold"
                          >
                            ✓
                          </button>
                        </div>
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
