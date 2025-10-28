// 下载音乐文件的工具函数
export async function downloadMusic(track: Track) {
  try {
    const response = await fetch(track.url)
    if (!response.ok) {
      throw new Error('Failed to fetch audio file')
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${track.title.replace(/\s+/g, '_')}.wav`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Download error:', error)
    alert('下载失败：' + (error instanceof Error ? error.message : '未知错误'))
    return false
  }
}

// 分享音乐的工具函数
export async function shareMusic(track: Track) {
  try {
    const shareData = {
      title: track.title,
      text: `${track.title}\n风格：${track.genre} | 情感：${track.mood}\n时长：${track.duration}`,
      url: window.location.origin + '/gallery'
    }

    // 尝试使用Web Share API
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData)
      return true
    } else {
      // 降级：复制链接到剪贴板
      const shareText = `${track.title}\n${track.description}\n${window.location.origin}/gallery`
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText)
        alert('分享链接已复制到剪贴板！')
        return true
      } else {
        // 最基础降级：显示分享文本
        alert(`分享：\n${shareText}`)
        return true
      }
    }
  } catch (error) {
    console.error('Share error:', error)
    if (error instanceof Error && error.name !== 'AbortError') {
      alert('分享失败：' + error.message)
    }
    return false
  }
}
