import Link from 'next/link'
import { FaYoutube, FaDiscord, FaUsers, FaArrowLeft, FaFire } from 'react-icons/fa'

export default function ServerPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      {/* Background animated elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 pulse-slow" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 float-reverse" />

        {/* Scanlines */}
        <div className="absolute inset-0 scanline" />

        {/* Geometric patterns */}
        <div className="absolute top-0 right-10 w-1 h-96 bg-gradient-to-b from-gray-600/30 to-gray-600/0" />
        <div className="absolute left-0 top-1/2 h-1 w-32 bg-gradient-to-r from-gray-600/30 to-gray-600/0" />
      </div>

      {/* Content */}
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
              <div className="flex gap-4 ml-auto flex-wrap">
                {/* Server Tab */}
                <div className="flex items-center justify-center px-6 py-6 border-b-4 border-gray-500 group cursor-default hover-lift">
                  <span className="text-lg font-bold text-white uppercase tracking-widest neon">Сервер</span>
                </div>

                {/* Forum Tab */}
                <Link href="/forum">
                  <button className="flex items-center justify-center px-6 py-6 border-b-4 border-transparent hover:border-blue-700 group transition-all hover-lift">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Форум</span>
                  </button>
                </Link>

                {/* Maps Tab */}
                <Link href="/maps">
                  <button className="flex items-center justify-center px-6 py-6 border-b-4 border-transparent hover:border-yellow-700 group transition-all hover-lift">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Карты</span>
                  </button>
                </Link>

                {/* Skins Tab */}
                <Link href="/skins">
                  <button className="flex items-center justify-center px-6 py-6 border-b-4 border-transparent hover:border-purple-700 group transition-all hover-lift">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Скины</span>
                  </button>
                </Link>

                {/* Rules Tab */}
                <Link href="/rules">
                  <button className="flex items-center justify-center px-6 py-6 border-b-4 border-transparent hover:border-orange-700 group transition-all hover-lift">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Правила</span>
                  </button>
                </Link>

                {/* Admin Tab */}
                <Link href="/admin">
                  <button className="flex items-center justify-center px-6 py-6 border-b-4 border-transparent hover:border-red-700 group transition-all hover-lift">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Админы</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="accent-line w-full" />
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* About & Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px accent-line" />

            {/* About Section */}
            <div className="lg:col-span-2 relative group slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-gray-700/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-800/40 backdrop-blur border border-gray-700/40 p-8 md:p-12 rounded-xl overflow-hidden hover-lift border-glow">
                {/* Corner accents */}
                <div className="corner-accent top-left opacity-40" />
                <div className="corner-accent bottom-right opacity-40" />

                <div className="flex items-center gap-3 mb-6">
                  <FaFire className="text-gray-400" />
                  <h2 className="text-3xl font-bold text-white">О Сервере</h2>
                </div>

                <div className="space-y-5 text-gray-300 leading-relaxed">
                  <p className="text-lg font-semibold text-white">
                    <span className="text-gray-100">Quite Rust</span> — самый комфортный и хорошо настроенный сервер!
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-700/30">
                    <h3 className="text-lg font-bold text-white mb-4">Почему выбирают Quite Rust:</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                        <span>Нет лагов — плавная игра 24/7</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                        <span>Бесплатные скины для каждого игрока</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                        <span>Активная администрация</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                        <span>Отсутствуют плагины, которые мешают ванильности</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                        <span>Все команды по делу: <span className="text-gray-200">/help /report /pop /time /skin</span></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                        <span>Переработчики и дроны во всех мирных зонах</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                        <span>Быстрый крафт и ускоренные печи</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom decoration */}
                <div className="mt-8 pt-6 border-t border-gray-700/30">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Сервер работает 24/7</span>
                    <span>EST. 2024</span>
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* Action Buttons */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-px accent-line" />
                <span className="text-gray-600 text-xs uppercase tracking-widest font-semibold">Присоединись к нам</span>
                <div className="w-12 h-px accent-line" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Connect Button */}
              <a href="steam://connect/185.189.255.239:35400" target="_blank" rel="noopener noreferrer">
                <button className="w-full group relative overflow-hidden slide-up stagger-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                  <div className="relative bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/40 group-hover:border-gray-600/60 p-6 rounded-lg transition-all duration-300 backdrop-blur hover-lift border-glow">
                    <div className="text-4xl mb-4 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all hover-rotate">🎮</div>
                    <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-wider neon">Connect</h3>
                    <p className="text-sm text-gray-500">Присоединиться к серверу</p>
                    <div className="mt-4 pt-4 border-t border-gray-700/30">
                      <div className="text-xs text-gray-600 shimmer">185.189.255.239:35400</div>
                    </div>
                  </div>
                </button>
              </a>

              {/* Store Button */}
              <a href="https://quiterust.gamestores.app/" target="_blank" rel="noopener noreferrer">
                <button className="w-full group relative overflow-hidden slide-up stagger-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-700/20 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                  <div className="relative bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/40 group-hover:border-yellow-600/60 p-6 rounded-lg transition-all duration-300 backdrop-blur hover-lift border-glow">
                    <div className="text-4xl mb-4 text-yellow-400 group-hover:text-yellow-300 group-hover:scale-110 transition-all hover-rotate">🛒</div>
                    <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-wider neon">Магазин</h3>
                    <p className="text-sm text-gray-500">Скины и предметы</p>
                    <div className="mt-4 pt-4 border-t border-gray-700/30">
                      <div className="text-xs text-yellow-400">GameStores.App</div>
                    </div>
                  </div>
                </button>
              </a>

              {/* Discord Button */}
              <a href="https://discord.gg/gGFHVe7NEc" target="_blank" rel="noopener noreferrer">
                <button className="w-full group relative overflow-hidden slide-up stagger-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                  <div className="relative bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/40 group-hover:border-gray-600/60 p-6 rounded-lg transition-all duration-300 backdrop-blur hover-lift border-glow">
                    <div className="text-4xl mb-4 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all hover-rotate flip">
                      <FaDiscord />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-wider neon">Discord</h3>
                    <p className="text-sm text-gray-500">Присоединись к сообществу</p>
                    <div className="mt-4 pt-4 border-t border-gray-700/30">
                      <div className="text-xs text-gray-600">1200+ участников</div>
                    </div>
                  </div>
                </button>
              </a>

              {/* YouTube Button */}
              <a href="https://www.youtube.com/@QuiteRust" target="_blank" rel="noopener noreferrer">
                <button className="w-full group relative overflow-hidden slide-up stagger-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                  <div className="relative bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/40 group-hover:border-gray-600/60 p-6 rounded-lg transition-all duration-300 backdrop-blur hover-lift border-glow">
                    <div className="text-4xl mb-4 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all hover-rotate wave">
                      <FaYoutube />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-wider neon">YouTube</h3>
                    <p className="text-sm text-gray-500">Смотри контент и гайды</p>
                    <div className="mt-4 pt-4 border-t border-gray-700/30">
                      <div className="text-xs text-gray-600">Новые видео еженедельно</div>
                    </div>
                  </div>
                </button>
              </a>

              {/* Support Button */}
              <a href="https://funpay.com/users/10349352/" target="_blank" rel="noopener noreferrer">
                <button className="w-full group relative overflow-hidden slide-up stagger-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                  <div className="relative bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/40 group-hover:border-gray-600/60 p-6 rounded-lg transition-all duration-300 backdrop-blur hover-lift border-glow">
                    <div className="text-4xl mb-4 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all hover-rotate pulse-glow">❤️</div>
                    <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-wider neon">Поддержи</h3>
                    <p className="text-sm text-gray-500">Помоги развитию сервера</p>
                    <div className="mt-4 pt-4 border-t border-gray-700/30">
                      <div className="text-xs text-gray-600">FunPay</div>
                    </div>
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700/30 backdrop-blur-sm mt-20">
          <div className="accent-line w-full" />
          <div className="max-w-7xl mx-auto px-4 py-12 text-center relative">
            <div className="absolute top-0 left-1/3 w-20 h-20 border border-gray-700/20 rounded-lg transform rotate-45" />

            <div className="space-y-3">
              <p className="text-gray-400">© 2024 Quite Rust Community. Все права защищены.</p>
              <p className="text-gray-600 text-sm">Сервер работает 24/7 с поддержкой сообщества</p>
              <div className="flex justify-center gap-6 pt-4">
                <div className="text-xs text-gray-600">Ping: Low</div>
                <div className="text-xs text-gray-600">•</div>
                <div className="text-xs text-gray-600">Status: Stable</div>
                <div className="text-xs text-gray-600">•</div>
                <div className="text-xs text-gray-600">Uptime: 99.9%</div>
              </div>
            </div>
          </div>
          <div className="accent-line w-full" />
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
