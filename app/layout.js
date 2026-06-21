import './globals.css'

export const metadata = {
  title: 'Quite Rust - Ваш выбор!',
  description: 'Русский сервер Rust с уникальным геймплеем',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
