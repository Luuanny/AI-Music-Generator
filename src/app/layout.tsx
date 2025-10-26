import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI音乐生成器 - 创造你的专属音乐',
  description: '使用人工智能技术生成独特的音乐作品，支持多种风格和情感表达',
  keywords: 'AI音乐,音乐生成,人工智能,音乐创作,音乐制作',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}



