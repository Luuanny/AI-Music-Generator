import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '设置',
  description: '个性化你的AI音乐生成体验，包括个人资料、音频设置、通知设置等。',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
