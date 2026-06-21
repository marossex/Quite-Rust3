'use client'

import Link from 'next/link'
import { FaArrowLeft, FaGavel } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function RulesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const rules = [
    {
      title: 'ИСПОЛЬЗОВАНИЕ СТОРОННЕГО СОФТА И ЧИТОВ',
      color: 'red',
      items: [
        {
          num: '1.1',
          text: 'Запрещено использование любых модификаций игры, дающих преимущество: читы, скрипты, макросы (включая макросы на мышки Bloody/X7), радары, чит-лаунчеры.',
          penalty: 'Бан: Навсегда по HWID / Железу',
        },
        {
          num: '1.2',
          text: 'Запрещена игра в одной команде (тиме) с читером. Если ваш тиммейт отлетел за читы — банится вся команда (эффект «ассоциации»).',
          penalty: 'Бан: от 30 дней до Навсегда',
        },
        {
          num: '1.3',
          text: 'Запрещено сокрытие информации о читерах. Если вы знаете, что на сервере играет софтер, но не доложили админу — вы соучастник.',
          penalty: 'Бан: 14 дней',
        },
      ],
    },
    {
      title: 'РЕГЛАМЕНТ ПРОВЕРКИ НА ЧИТЫ (ВЫЗОВ В DISCORD)',
      color: 'yellow',
      items: [
        {
          num: '2.1',
          text: 'Администратор имеет право вызвать любого игрока на проверку в Discord без объяснения причин.',
        },
        {
          num: '2.2',
          text: 'С момента заморозки на сервере у игрока есть ровно 5 минут, чтобы зайти в голосовой канал проверки и включить демонстрацию всего экрана (не окна игры).',
        },
        {
          num: '2.3',
          text: 'Автоматический бан НАВСЕГДА выдается за: Выход с сервера во время заморозки или проверки; Отказ от прохождения проверки или игнорирование требований админа; «Краш» игры, «вылет» интернета, «синий экран» или внезапная перезагрузка ПК во время проверки (расценивается как намеренное прерывание); Использование программ для быстрой очистки ПК (CCleaner, BleachBit, очистка реестра) прямо перед проверкой или во время неё; Отказ скачивать утилиты для проверки (Everything, чекеры).',
          penalty: 'Бан: Навсегда',
        },
        {
          num: '2.4',
          text: 'Если в ходе проверки обнаружены удаленные файлы читов (даже если они запускались неделю назад на другом сервере) — администратор вправе выдать бан.',
          penalty: 'Бан: Навсегда',
        },
      ],
    },
    {
      title: 'ОБХОД БАНОВ И ПЕСОЧНИЦЫ',
      color: 'blue',
      items: [
        {
          num: '3.1',
          text: 'Запрещен обход активного бана (создание нового аккаунта в пиратском лаунчере, смена IP, использование VPN для захода на сервер).',
          penalty: 'Бан: Навсегда всех аккаунтов',
        },
        {
          num: '3.2',
          text: 'Запрещено использование программ-песочниц (Sandboxie, Avast Sandbox) для игры в два окна или искусственного накручивания онлайна / удержания базы.',
          penalty: 'Бан: 30 дней',
        },
      ],
    },
    {
      title: 'ИГРОВОЙ ПРОЦЕСС И КЛИЕНТ',
      color: 'green',
      items: [
        {
          num: '4.1',
          text: 'Запрещено превышение лимита команды (команда регулируется плагином или правилами вайпа, например: Макс 2, Макс 3). Запрещен альянс (союз) между разными базами.',
          penalty: 'Бан: 3-7 дней всем участникам',
        },
        {
          num: '4.2',
          text: 'Запрещено намеренное использование багов игры (строительство под текстурами, просовывание лута сквозь стены, багоюз с анимациями).',
          penalty: 'Бан: от 3 дней до Навсегда',
        },
        {
          num: '4.3',
          text: 'Запрещено использование сторонних программ для искусственного изменения графики (убирание кустов, прозрачные текстуры через замену файлов игры).',
          penalty: 'Бан: 30 дней',
        },
      ],
    },
    {
      title: 'ЧАТ И ПОВЕДЕНИЕ НА СЕРВЕРЕ',
      color: 'purple',
      items: [
        {
          num: '5.1',
          text: 'Запрещено оскорбление администрации проекта в игре или в Discord. Критика должна быть конструктивной и в тикетах.',
          penalty: 'Мут чата на 24 часа / При повторе Бан на 3 дня',
        },
        {
          num: '5.2',
          text: 'Запрещено упоминание или оскорбление родных (родственников) в любой форме.',
          penalty: 'Мут чата на 7 дней или Бан на 3 дня',
        },
        {
          num: '5.3',
          text: 'Запрещена реклама других серверов Rust, Discord-ссылок или сторонних сайтов в игровом чате.',
          penalty: 'Бан: Навсегда',
        },
        {
          num: '5.4',
          text: 'Запрещен спам, флуд, капс и разжигание межнациональной розни.',
          penalty: 'Мут от 1 до 12 часов',
        },
      ],
    },
  ]

  const colorClasses = {
    red: 'from-red-700/20 to-red-700/0 border-red-700/40',
    yellow: 'from-yellow-700/20 to-yellow-700/0 border-yellow-700/40',
    blue: 'from-blue-700/20 to-blue-700/0 border-blue-700/40',
    green: 'from-green-700/20 to-green-700/0 border-green-700/40',
    purple: 'from-purple-700/20 to-purple-700/0 border-purple-700/40',
  }

  const colorDotClasses = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 pulse-slow" />
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

            <div className="flex items-center gap-3">
              <FaGavel className="text-gray-400 text-2xl" />
              <h1 className="text-4xl font-bold text-white">Правила Сервера</h1>
            </div>

            <div className="w-24" />
          </div>
          <div className="accent-line w-full" />
        </div>

        {/* Important Notice */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-red-700/30 to-red-700/10 border border-red-700/40 p-6 rounded-xl mb-12 slide-up">
            <p className="text-gray-200 leading-relaxed">
              <span className="font-bold text-red-400">⚠️ ВНИМАНИЕ:</span> Заходя на наш сервер, вы автоматически соглашаетесь с данным сводом правил. Незнание правил не освобождает от ответственности. Администрация имеет право выдать бан, если действия игрока вредят серверу, даже если этого пункта нет в списке.
            </p>
          </div>
        </div>

        {/* Rules Content */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {rules.map((section, idx) => (
              <div key={idx} className="slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`bg-gradient-to-br ${colorClasses[section.color]} backdrop-blur border border-gray-700/40 rounded-xl overflow-hidden`}>
                  {/* Section Header */}
                  <div className="bg-gray-800/50 px-8 py-6 border-b border-gray-700/30 flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${colorDotClasses[section.color]}`} />
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>

                  {/* Rules Items */}
                  <div className="p-8 space-y-6">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="border-l-2 border-gray-700/40 pl-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <span className="inline-block bg-gray-700/50 text-gray-300 font-bold px-3 py-1 rounded-lg text-sm">
                              {item.num}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-300 leading-relaxed mb-3">{item.text}</p>
                            {item.penalty && (
                              <div className="bg-gray-900/50 border border-gray-700/30 rounded-lg p-3">
                                <p className="text-sm font-semibold">
                                  <span className="text-red-400">Наказание: </span>
                                  <span className="text-gray-300">{item.penalty}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Notice */}
          <div className="mt-16 pt-12 border-t border-gray-700/30">
            <div className="text-center space-y-4">
              <p className="text-gray-400 text-lg">Вопросы по правилам?</p>
              <a href="https://discord.gg/gGFHVe7NEc" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 bg-blue-700/50 hover:bg-blue-600/50 text-white px-8 py-3 rounded-lg transition-colors font-semibold">
                  Задай вопрос в Discord
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="corner-accent top-left opacity-20 fixed z-20" />
        <div className="corner-accent top-right opacity-20 fixed z-20" />
        <div className="corner-accent bottom-left opacity-20 fixed z-20" />
        <div className="corner-accent bottom-right opacity-20 fixed z-20" />
      </div>
    </div>
  )
}
