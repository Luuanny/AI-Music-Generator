'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// 使用简单的文本图标来避免lucide-react的问题
const PlayIcon = () => <span className="text-lg">▶️</span>
const PauseIcon = () => <span className="text-lg">⏸️</span>
const SkipBackIcon = () => <span className="text-lg">⏮️</span>
const SkipForwardIcon = () => <span className="text-lg">⏭️</span>
const Volume2Icon = () => <span className="text-lg">🔊</span>
const VolumeXIcon = () => <span className="text-lg">🔇</span>
const Maximize2Icon = () => <span className="text-lg">⛶</span>
const HeartIcon = () => <span className="text-lg">❤️</span>
const Share2Icon = () => <span className="text-lg">📤</span>
const DownloadIcon = () => <span className="text-lg">⬇️</span>
const MusicIcon = () => <span className="text-lg">🎵</span>

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

interface MusicPlayerProps {
  track: Track
  isPlaying: boolean
  onPlayPause: (playing: boolean) => void
}

export default function MusicPlayer({ track, isPlaying, onPlayPause }: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    audio.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, audio.currentTime - 10)
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(duration, audio.currentTime + 10)
  }

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={track.url}
        preload="metadata"
        onEnded={() => onPlayPause(false)}
      />

      {/* Mini Player */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
          >
            <div className="card flex items-center space-x-4">
              <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <MusicIcon />
                  </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold truncate">{track.title}</h4>
                <p className="text-white/60 text-sm truncate">{track.genre} • {track.mood}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onPlayPause(!isPlaying)}
                  className="p-2 text-white hover:text-primary-400 transition-colors"
                >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                
                <button
                  onClick={() => setIsExpanded(true)}
                  className="p-2 text-white hover:text-primary-400 transition-colors"
                >
                  <Maximize2Icon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">正在播放</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Maximize2 className="h-6 w-6 rotate-45" />
                </button>
              </div>

              {/* Track Info */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MusicIcon />
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-2">{track.title}</h4>
                <p className="text-white/70 mb-4">{track.description}</p>
                
                <div className="flex justify-center space-x-6 text-white/60 text-sm">
                  <span>{track.genre}</span>
                  <span>•</span>
                  <span>{track.mood}</span>
                  <span>•</span>
                  <span>{track.duration}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-white/60 text-sm mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6 mb-8">
                <button
                  onClick={skipBackward}
                  className="p-3 text-white hover:text-primary-400 transition-colors"
                >
                  <SkipBackIcon />
                </button>

                <button
                  onClick={() => onPlayPause(!isPlaying)}
                  className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white hover:scale-105 transition-transform"
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                <button
                  onClick={skipForward}
                  className="p-3 text-white hover:text-primary-400 transition-colors"
                >
                  <SkipForwardIcon />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-4 mb-8">
                <button
                  onClick={toggleMute}
                  className="p-2 text-white hover:text-primary-400 transition-colors"
                >
                  {isMuted ? <VolumeXIcon /> : <Volume2Icon />}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button className="btn-secondary flex items-center space-x-2">
                  <HeartIcon />
                  <span>收藏</span>
                </button>
                
                <button className="btn-secondary flex items-center space-x-2">
                  <Share2Icon />
                  <span>分享</span>
                </button>
                
                <button className="btn-secondary flex items-center space-x-2">
                  <DownloadIcon />
                  <span>下载</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #d946ef);
          cursor: pointer;
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #d946ef);
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </>
  )
}
