'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// 使用简单的文本图标来避免lucide-react的问题
const Wand2Icon = () => <span className="text-lg">🪄</span>
const MusicIcon = () => <span className="text-lg">🎵</span>
const ClockIcon = () => <span className="text-lg">🕐</span>
const DownloadIcon = () => <span className="text-lg">⬇️</span>
const Share2Icon = () => <span className="text-lg">📤</span>
const HeartIcon = () => <span className="text-lg">❤️</span>

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

interface MusicGeneratorProps {
  onTrackGenerated: (track: Track) => void
}

export default function MusicGenerator({ onTrackGenerated }: MusicGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('30')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTrack, setGeneratedTrack] = useState<Track | null>(null)

  const genres = [
    '流行', '摇滚', '电子', '古典', '爵士', '民谣', '说唱', 'R&B', '蓝调', '乡村'
  ]

  const moods = [
    '快乐', '悲伤', '激动', '平静', '浪漫', '神秘', '梦幻', '力量', '温柔', '狂野'
  ]

  const durations = ['15', '30', '60', '120']

  const generateMusic = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    // 模拟AI音乐生成过程
    await new Promise(resolve => setTimeout(resolve, 3000))

    const newTrack: Track = {
      id: Date.now().toString(),
      title: `AI生成的音乐 - ${new Date().toLocaleTimeString()}`,
      description: prompt,
      duration: `${selectedDuration}秒`,
      genre: selectedGenre || '混合',
      mood: selectedMood || '中性',
      url: '/api/music/sample.mp3', // 模拟音频文件
      createdAt: new Date().toISOString(),
    }

    setGeneratedTrack(newTrack)
    onTrackGenerated(newTrack)
    setIsGenerating(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">音乐生成器</h3>
          <p className="text-white/70">描述你想要的音乐，AI将为你创造独特的作品</p>
        </div>

        <div className="space-y-6">
          {/* 音乐描述输入 */}
          <div>
            <label className="block text-white font-semibold mb-3">音乐描述</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：一首轻快的电子音乐，适合运动时听，带有未来感..."
              className="input-field h-32 resize-none"
              maxLength={500}
            />
            <div className="text-right text-white/50 text-sm mt-2">
              {prompt.length}/500
            </div>
          </div>

          {/* 音乐参数选择 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 音乐风格 */}
            <div>
              <label className="block text-white font-semibold mb-3">音乐风格</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="input-field appearance-none bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="" className="bg-slate-800 text-white">选择风格（可选）</option>
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-slate-800 text-white">{genre}</option>
                ))}
              </select>
            </div>

            {/* 情感色彩 */}
            <div>
              <label className="block text-white font-semibold mb-3">情感色彩</label>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="input-field appearance-none bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="" className="bg-slate-800 text-white">选择情感（可选）</option>
                {moods.map(mood => (
                  <option key={mood} value={mood} className="bg-slate-800 text-white">{mood}</option>
                ))}
              </select>
            </div>

            {/* 时长 */}
            <div>
              <label className="block text-white font-semibold mb-3">音乐时长</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="input-field appearance-none bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {durations.map(duration => (
                  <option key={duration} value={duration} className="bg-slate-800 text-white">{duration}秒</option>
                ))}
              </select>
            </div>
          </div>

          {/* 生成按钮 */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateMusic}
              disabled={!prompt.trim() || isGenerating}
              className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>AI正在创作中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Wand2Icon />
                  <span>生成音乐</span>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* 生成结果 */}
      {generatedTrack && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 card"
        >
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-white mb-2">🎵 音乐生成完成！</h4>
            <p className="text-white/70">你的AI音乐作品已经准备好了</p>
          </div>

          <div className="bg-white/5 rounded-lg p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">音乐信息</h5>
                <div className="space-y-2 text-white/80">
                  <div><span className="font-medium">标题：</span>{generatedTrack.title}</div>
                  <div><span className="font-medium">风格：</span>{generatedTrack.genre}</div>
                  <div><span className="font-medium">情感：</span>{generatedTrack.mood}</div>
                  <div><span className="font-medium">时长：</span>{generatedTrack.duration}</div>
                </div>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-white mb-3">描述</h5>
                <p className="text-white/80">{generatedTrack.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
            >
              <MusicIcon />
              <span>播放音乐</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center space-x-2"
            >
              <DownloadIcon />
              <span>下载</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center space-x-2"
            >
              <Share2Icon />
              <span>分享</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center space-x-2"
            >
              <HeartIcon />
              <span>收藏</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
