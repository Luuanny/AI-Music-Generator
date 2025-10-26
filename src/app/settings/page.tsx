'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// 使用简单的文本图标来避免lucide-react的问题
const SettingsIcon = () => <span className="text-lg">⚙️</span>
const UserIcon = () => <span className="text-lg">👤</span>
const BellIcon = () => <span className="text-lg">🔔</span>
const ShieldIcon = () => <span className="text-lg">🛡️</span>
const PaletteIcon = () => <span className="text-lg">🎨</span>
const Volume2Icon = () => <span className="text-lg">🔊</span>
const DownloadIcon = () => <span className="text-lg">⬇️</span>
const SaveIcon = () => <span className="text-lg">💾</span>
const RotateCcwIcon = () => <span className="text-lg">🔄</span>

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    // Profile Settings
    username: '音乐创作者',
    email: 'creator@example.com',
    bio: '热爱音乐创作，探索AI音乐的可能性',
    
    // Audio Settings
    audioQuality: 'high',
    autoPlay: true,
    volume: 80,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    newMusicAlerts: true,
    
    // Privacy Settings
    publicProfile: true,
    showEmail: false,
    allowDownloads: true,
    
    // Theme Settings
    theme: 'dark',
    accentColor: 'blue',
    animations: true,
  })

  const tabs = [
    { id: 'profile', label: '个人资料', icon: UserIcon },
    { id: 'audio', label: '音频设置', icon: Volume2Icon },
    { id: 'notifications', label: '通知设置', icon: BellIcon },
    { id: 'privacy', label: '隐私设置', icon: ShieldIcon },
    { id: 'appearance', label: '外观设置', icon: PaletteIcon },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // 这里可以添加保存到后端的逻辑
    console.log('Settings saved:', settings)
    alert('设置已保存！')
  }

  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？')) {
      // 重置为默认设置
      setSettings({
        username: '音乐创作者',
        email: 'creator@example.com',
        bio: '热爱音乐创作，探索AI音乐的可能性',
        audioQuality: 'high',
        autoPlay: true,
        volume: 80,
        emailNotifications: true,
        pushNotifications: false,
        newMusicAlerts: true,
        publicProfile: true,
        showEmail: false,
        allowDownloads: true,
        theme: 'dark',
        accentColor: 'blue',
        animations: true,
      })
    }
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-3">用户名</label>
        <input
          type="text"
          value={settings.username}
          onChange={(e) => handleSettingChange('username', e.target.value)}
          className="input-field"
        />
      </div>
      
      <div>
        <label className="block text-white font-semibold mb-3">邮箱</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => handleSettingChange('email', e.target.value)}
          className="input-field"
        />
      </div>
      
      <div>
        <label className="block text-white font-semibold mb-3">个人简介</label>
        <textarea
          value={settings.bio}
          onChange={(e) => handleSettingChange('bio', e.target.value)}
          className="input-field h-24 resize-none"
          placeholder="介绍一下你自己..."
        />
      </div>
    </div>
  )

  const renderAudioSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-3">音频质量</label>
        <select
          value={settings.audioQuality}
          onChange={(e) => handleSettingChange('audioQuality', e.target.value)}
          className="input-field"
        >
          <option value="low">低质量 (128kbps)</option>
          <option value="medium">中等质量 (256kbps)</option>
          <option value="high">高质量 (320kbps)</option>
          <option value="lossless">无损质量 (FLAC)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-white font-semibold mb-3">音量</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="100"
            value={settings.volume}
            onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-white font-semibold w-12">{settings.volume}%</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">自动播放</label>
          <p className="text-white/60 text-sm">生成音乐后自动开始播放</p>
        </div>
        <button
          onClick={() => handleSettingChange('autoPlay', !settings.autoPlay)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.autoPlay ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.autoPlay ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">邮件通知</label>
          <p className="text-white/60 text-sm">接收重要更新和活动通知</p>
        </div>
        <button
          onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.emailNotifications ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">推送通知</label>
          <p className="text-white/60 text-sm">在浏览器中显示通知</p>
        </div>
        <button
          onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.pushNotifications ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">新音乐提醒</label>
          <p className="text-white/60 text-sm">当有新的音乐作品时通知我</p>
        </div>
        <button
          onClick={() => handleSettingChange('newMusicAlerts', !settings.newMusicAlerts)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.newMusicAlerts ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.newMusicAlerts ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">公开个人资料</label>
          <p className="text-white/60 text-sm">允许其他用户查看你的个人资料</p>
        </div>
        <button
          onClick={() => handleSettingChange('publicProfile', !settings.publicProfile)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.publicProfile ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.publicProfile ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">显示邮箱</label>
          <p className="text-white/60 text-sm">在个人资料中显示邮箱地址</p>
        </div>
        <button
          onClick={() => handleSettingChange('showEmail', !settings.showEmail)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.showEmail ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.showEmail ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">允许下载</label>
          <p className="text-white/60 text-sm">允许其他用户下载你的音乐作品</p>
        </div>
        <button
          onClick={() => handleSettingChange('allowDownloads', !settings.allowDownloads)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.allowDownloads ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.allowDownloads ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-3">主题</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSettingChange('theme', 'light')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              settings.theme === 'light' 
                ? 'border-primary-500 bg-primary-500/20' 
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <div className="w-full h-8 bg-white rounded mb-2"></div>
            <span className="text-white text-sm">浅色主题</span>
          </button>
          <button
            onClick={() => handleSettingChange('theme', 'dark')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              settings.theme === 'dark' 
                ? 'border-primary-500 bg-primary-500/20' 
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
            <span className="text-white text-sm">深色主题</span>
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-white font-semibold mb-3">强调色</label>
        <div className="grid grid-cols-4 gap-3">
          {['blue', 'purple', 'green', 'red'].map(color => (
            <button
              key={color}
              onClick={() => handleSettingChange('accentColor', color)}
              className={`w-12 h-12 rounded-full border-2 transition-colors ${
                settings.accentColor === color 
                  ? 'border-white' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              style={{
                backgroundColor: color === 'blue' ? '#0ea5e9' : 
                                color === 'purple' ? '#d946ef' :
                                color === 'green' ? '#10b981' : '#ef4444'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-semibold">动画效果</label>
          <p className="text-white/60 text-sm">启用页面过渡和交互动画</p>
        </div>
        <button
          onClick={() => handleSettingChange('animations', !settings.animations)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.animations ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
            settings.animations ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings()
      case 'audio': return renderAudioSettings()
      case 'notifications': return renderNotificationSettings()
      case 'privacy': return renderPrivacySettings()
      case 'appearance': return renderAppearanceSettings()
      default: return renderProfileSettings()
    }
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              设置
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            个性化你的AI音乐生成体验
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-500 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                <SettingsIcon />
              </div>

              {renderTabContent()}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handleReset}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <RotateCcwIcon />
                  <span>重置</span>
                </button>
                
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center space-x-2"
                >
                  <SaveIcon />
                  <span>保存设置</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
