'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// 使用简单的文本图标来避免lucide-react的问题
const Volume2Icon = () => <span className="text-lg">🔊</span>
import MusicGenerator from '@/components/MusicGenerator'
import MusicPlayer from '@/components/MusicPlayer'

interface Track {
  id: string
  title: string
  description: string
  duration: string
  genre: string
  mood: string
  url: string
  createdAt: string
}

export default function HomePage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // 滚动到音乐生成器部分
  const scrollToGenerator = () => {
    const element = document.getElementById('music-generator')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 跳转到作品集页面
  const goToGallery = () => {
    window.location.href = '/gallery'
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-secondary-900/20 to-primary-900/20">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                AI音乐生成器
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              使用先进的人工智能技术，创造属于你的独特音乐作品。
              只需描述你的想法，AI就能为你生成专业的音乐。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToGenerator}
                className="btn-primary text-lg px-8 py-4"
              >
                开始创作
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToGallery}
                className="btn-secondary text-lg px-8 py-4"
              >
                查看作品集
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Music Notes Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary-400/30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Volume2Icon />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Music Generator Section */}
      <section id="music-generator" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              创造你的音乐
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              描述你想要的音乐风格、情感或场景，我们的AI将为你生成独特的音乐作品
            </p>
          </motion.div>

          <MusicGenerator onTrackGenerated={setCurrentTrack} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              强大的AI功能
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              体验最先进的AI音乐生成技术
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '智能风格识别',
                description: 'AI能够理解并模仿各种音乐风格，从古典到现代，从爵士到电子',
                icon: '🎵',
              },
              {
                title: '情感表达',
                description: '根据你的描述生成具有特定情感色彩的音乐，让每一首作品都充满生命力',
                icon: '💝',
              },
              {
                title: '高质量输出',
                description: '生成专业级别的音乐作品，支持多种格式导出，满足不同需求',
                icon: '⭐',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Player */}
      {currentTrack && (
        <MusicPlayer 
          track={currentTrack} 
          isPlaying={isPlaying}
          onPlayPause={setIsPlaying}
        />
      )}
    </div>
  )
}