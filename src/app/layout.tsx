import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AI音乐生成器 - 使用Lyria AI创造专业音乐',
    template: '%s | AI音乐生成器'
  },
  description: '使用Lyria (Google Vertex AI)技术生成独特的音乐作品，支持流行、摇滚、电子、古典等多种风格和情感表达。免费AI音乐创作工具，一键生成专业级音乐。',
  keywords: [
    'AI音乐生成器',
    'AI音乐生成',
    'Lyria',
    'Google Vertex AI',
    '人工智能音乐',
    '音乐创作工具',
    '免费音乐生成',
    '音乐制作软件',
    'AI作曲',
    '自动音乐生成',
    '音乐风格转换'
  ],
  authors: [{ name: 'AI Music Generator' }],
  creator: 'AI Music Generator Team',
  publisher: 'AI Music Generator',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ai-music-generator.vercel.app',
    siteName: 'AI音乐生成器',
    title: 'AI音乐生成器 - 使用Lyria AI创造专业音乐',
    description: '使用Lyria (Google Vertex AI)技术生成独特的音乐作品，支持多种风格和情感表达',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI音乐生成器 - 创造专业音乐',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI音乐生成器 - 使用Lyria AI创造专业音乐',
    description: '使用Stability AI技术生成独特的音乐作品，支持多种风格和情感表达',
    creator: '@ai_music_generator',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://ai-music-generator.vercel.app',
    languages: {
      'zh-CN': 'https://ai-music-generator.vercel.app',
      'en': 'https://ai-music-generator.vercel.app/en',
    },
  },
  category: 'music',
  classification: 'AI Music Generation Tool',
  other: {
    'theme-color': '#0ea5e9',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
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





