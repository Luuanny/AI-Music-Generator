'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// 使用简单的文本图标来避免lucide-react的问题
const MusicIcon = () => <span className="text-lg">🎵</span>
const PlayIcon = () => <span className="text-lg">▶️</span>
const PauseIcon = () => <span className="text-lg">⏸️</span>
const DownloadIcon = () => <span className="text-lg">⬇️</span>
const Share2Icon = () => <span className="text-lg">📤</span>
const HeartIcon = () => <span className="text-lg">❤️</span>
const SearchIcon = () => <span className="text-lg">🔍</span>
const FilterIcon = () => <span className="text-lg">🔽</span>
const GridIcon = () => <span className="text-lg">⊞</span>
const ListIcon = () => <span className="text-lg">☰</span>
const ClockIcon = () => <span className="text-lg">🕐</span>
const TagIcon = () => <span className="text-lg">🏷️</span>

interface Track {
  id: string
  title: string
  description: string
  duration: string
  genre: string
  mood: string
  url: string
  createdAt: string
  likes: number
  downloads: number
}

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

  // 模拟音乐数据
  const tracks: Track[] = [
    {
      id: '1',
      title: '梦幻电子之旅',
      description: '一首充满未来感的电子音乐，适合夜晚独处时聆听',
      duration: '3:45',
      genre: '电子',
      mood: '梦幻',
      url: '/api/music/sample1.mp3',
      createdAt: '2024-01-15',
      likes: 128,
      downloads: 45,
    },
    {
      id: '2',
      title: '温暖民谣',
      description: '轻柔的吉他旋律，带给你内心的平静与温暖',
      duration: '4:12',
      genre: '民谣',
      mood: '温柔',
      url: '/api/music/sample2.mp3',
      createdAt: '2024-01-14',
      likes: 89,
      downloads: 32,
    },
    {
      id: '3',
      title: '激情摇滚',
      description: '充满力量的摇滚音乐，激发你的斗志',
      duration: '3:28',
      genre: '摇滚',
      mood: '激动',
      url: '/api/music/sample3.mp3',
      createdAt: '2024-01-13',
      likes: 156,
      downloads: 67,
    },
    {
      id: '4',
      title: '爵士之夜',
      description: '优雅的爵士乐，适合在咖啡厅或酒吧中欣赏',
      duration: '5:33',
      genre: '爵士',
      mood: '浪漫',
      url: '/api/music/sample4.mp3',
      createdAt: '2024-01-12',
      likes: 203,
      downloads: 89,
    },
    {
      id: '5',
      title: '古典交响',
      description: '宏伟的古典音乐，展现音乐的庄严与美丽',
      duration: '6:15',
      genre: '古典',
      mood: '庄严',
      url: '/api/music/sample5.mp3',
      createdAt: '2024-01-11',
      likes: 178,
      downloads: 54,
    },
    {
      id: '6',
      title: '流行节拍',
      description: '轻快的流行音乐，让人忍不住跟着节拍摇摆',
      duration: '3:20',
      genre: '流行',
      mood: '快乐',
      url: '/api/music/sample6.mp3',
      createdAt: '2024-01-10',
      likes: 145,
      downloads: 78,
    },
  ]

  const genres = ['全部', '电子', '民谣', '摇滚', '爵士', '古典', '流行']
  const moods = ['全部', '梦幻', '温柔', '激动', '浪漫', '庄严', '快乐']

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = !selectedGenre || selectedGenre === '全部' || track.genre === selectedGenre
    const matchesMood = !selectedMood || selectedMood === '全部' || track.mood === selectedMood
    
    return matchesSearch && matchesGenre && matchesMood
  })

  const handlePlayPause = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId)
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              音乐作品集
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            探索AI生成的精彩音乐作品，发现属于你的音乐世界
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="搜索音乐..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="lg:w-48">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="input-field"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Mood Filter */}
            <div className="lg:w-48">
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="input-field"
              >
                {moods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <GridIcon />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <ListIcon />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/70">
            找到 {filteredTracks.length} 首音乐作品
          </p>
        </div>

        {/* Music Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group hover:bg-white/15 transition-all duration-300"
              >
                {/* Track Cover */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <MusicIcon />
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handlePlayPause(track.id)}
                      className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      {playingTrack === track.id ? (
                        <PauseIcon />
                      ) : (
                        <PlayIcon />
                      )}
                    </button>
                  </div>
                </div>

                {/* Track Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white truncate">{track.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{track.description}</p>
                  
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <TagIcon />
                      <span>{track.genre}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon />
                      <span>{track.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <HeartIcon />
                        <span>{track.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DownloadIcon />
                        <span>{track.downloads}</span>
                      </div>
                    </div>
                    <span>{track.createdAt}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 btn-secondary text-sm py-2">
                    <DownloadIcon />
                    <span className="ml-2">下载</span>
                  </button>
                  <button className="flex-1 btn-secondary text-sm py-2">
                    <Share2Icon />
                    <span className="ml-2">分享</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  {/* Track Cover */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <MusicIcon />
                    </div>
                    
                    {/* Play Button */}
                    <button
                      onClick={() => handlePlayPause(track.id)}
                      className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {playingTrack === track.id ? (
                        <PauseIcon />
                      ) : (
                        <PlayIcon />
                      )}
                    </button>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{track.title}</h3>
                    <p className="text-white/70 text-sm truncate">{track.description}</p>
                    
                    <div className="flex items-center space-x-4 text-white/60 text-sm mt-2">
                      <span>{track.genre}</span>
                      <span>•</span>
                      <span>{track.mood}</span>
                      <span>•</span>
                      <span>{track.duration}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <HeartIcon />
                      <span>{track.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DownloadIcon />
                      <span>{track.downloads}</span>
                    </div>
                    <span>{track.createdAt}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm px-4 py-2">
                      <DownloadIcon />
                    </button>
                    <button className="btn-secondary text-sm px-4 py-2">
                      <Share2Icon />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredTracks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl text-white/40 mx-auto mb-4">
              <MusicIcon />
            </div>
            <h3 className="text-xl font-semibold text-white/60 mb-2">没有找到音乐作品</h3>
            <p className="text-white/40">尝试调整搜索条件或筛选器</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
