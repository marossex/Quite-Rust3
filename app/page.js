import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 pulse-slow" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 float-reverse" />
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none scanline" />

      {/* Geometric decorations - Top */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <div className="accent-line w-full" />
        <div className="h-40 flex items-center justify-around px-8 mt-8">
          <div className="w-20 h-20 border border-gray-700/30 rounded-lg transform -rotate-45" />
          <div className="w-1 h-32 accent-line-v" />
          <div className="w-16 h-16 border border-gray-700/20 rounded-full" />
          <div className="w-1 h-32 accent-line-v" />
          <div className="w-20 h-20 border border-gray-700/30 rounded-lg transform rotate-45" />
        </div>
        <div className="accent-line w-full mt-4" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Decorative top line */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-8 fade-in">
            <div className="w-12 h-px accent-line shimmer" />
            <div className="text-gray-600 text-xs uppercase tracking-widest neon">добро пожаловать</div>
            <div className="w-12 h-px accent-line shimmer" />
          </div>

          {/* Main title */}
          <div className="mb-8 relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pulse-slow" />
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none relative z-10 slide-down">
              <span className="inline-block hover-glow">Quite</span>
              <br />
              <span className="inline-block hover-glow scale-pulse">Rust</span>
            </h1>
          </div>

          {/* Decorative lines around title */}
          <div className="flex items-center justify-center gap-8 my-8 slide-up stagger-1">
            <div className="w-16 h-px bg-gradient-to-r from-gray-700/0 via-gray-500/50 to-gray-700/0 shimmer" />
            <div className="w-8 h-8 border border-gray-600/40 rounded wobble" />
            <div className="w-16 h-px bg-gradient-to-r from-gray-700/0 via-gray-500/50 to-gray-700/0 shimmer" style={{ animationDelay: '1s' }} />
          </div>

          {/* Subtitle */}
          <div className="space-y-3 mt-8">
            <p className="text-gray-500 uppercase tracking-widest text-xs">Русский Rust сервер</p>
            <p className="text-xl md:text-2xl text-gray-300 font-light">Лучший выбор для опытных игроков</p>
          </div>
        </div>

        {/* Stats preview */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16 mt-16">
          <div className="relative group slide-up stagger-1">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-700/20 to-gray-700/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-4 backdrop-blur relative z-10 hover-lift border-glow">
              <div className="text-2xl md:text-3xl font-bold text-gray-300 group-hover:text-white transition-colors scale-pulse">256</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">Max Players</div>
            </div>
          </div>
          <div className="relative group slide-up stagger-2">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-700/20 to-gray-700/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-4 backdrop-blur relative z-10 hover-lift border-glow">
              <div className="text-2xl md:text-3xl font-bold text-gray-300 group-hover:text-white transition-colors pulse-slow">24/7</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">Online</div>
            </div>
          </div>
          <div className="relative group slide-up stagger-3">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-700/20 to-gray-700/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-4 backdrop-blur relative z-10 hover-lift border-glow">
              <div className="text-2xl md:text-3xl font-bold text-gray-300 group-hover:text-white transition-colors wave">RUS</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">Region</div>
            </div>
          </div>
        </div>

        {/* Main CTA Button */}
        <Link href="/server">
          <button className="relative group mb-16 bounce-in">
            {/* Button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity group-hover:blur-md glow-animation" />

            {/* Button glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-gray-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Button content */}
            <div className="relative bg-gray-800 hover:bg-gray-700 border border-gray-700/50 group-hover:border-red-900/50 px-8 md:px-16 py-5 md:py-7 rounded-lg transition-all duration-300 transform group-hover:scale-105 hover-glow">
              <div className="flex flex-col items-center">
                <div className="text-sm md:text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-400 transition-colors mb-2 slide-right stagger-1">
                  Присоединиться
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white neon">Quite Rust - Ваш выбор!</div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-gray-600 group-hover:text-gray-400 transition-colors mt-2 slide-left stagger-2">
                  Нажми и начни играть
                </div>
              </div>

              {/* Button shine effect */}
              <div className="absolute inset-0 rounded-lg overflow-hidden hover-shine">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 group-hover:via-white/20 transition-all shimmer" />
              </div>
            </div>
          </button>
        </Link>

        {/* Arrow down with decoration */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="accent-line w-full" />
          <div className="text-gray-600 text-sm uppercase tracking-widest animate-bounce">
            Нажми выше →
          </div>
          <div className="accent-line w-full" />
        </div>
      </div>

      {/* Geometric decorations - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <div className="accent-line w-full mb-4" />
        <div className="h-32 flex items-center justify-around px-8 mb-8">
          <div className="w-1 h-20 accent-line-v" />
          <div className="w-16 h-16 border border-gray-700/20 rounded-full" />
          <div className="w-1 h-20 accent-line-v" />
          <div className="w-20 h-20 border border-gray-700/30 rounded-lg" />
          <div className="w-1 h-20 accent-line-v" />
        </div>
      </div>

      {/* Corner accents */}
      <div className="corner-accent top-left" />
      <div className="corner-accent top-right" />
      <div className="corner-accent bottom-left" />
      <div className="corner-accent bottom-right" />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-gray-600/30 rounded-full pulse-glow float-slow" />
      <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-gray-600/30 rounded-full pulse-glow float-reverse" />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-gray-600/30 rounded-full pulse-glow float-slow stagger-3" />
      <div className="absolute top-10 right-1/4 w-1.5 h-1.5 bg-gray-600/30 rounded-full pulse-glow float-reverse stagger-5" />
    </div>
  )
}
