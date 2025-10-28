import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '音乐作品集',
  description: '浏览和探索AI生成的音乐作品集。发现各种风格的音乐，包括流行、摇滚、电子、古典等。',
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


