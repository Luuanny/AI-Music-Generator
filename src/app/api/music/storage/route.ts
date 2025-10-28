import { NextRequest, NextResponse } from 'next/server'

// 临时存储音乐作品（实际应用中应使用数据库）
// 这里使用内存存储作为示例
const musicStorage: Array<{
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
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, duration, genre, mood, url, createdAt, likes, downloads } = body

    // 验证必需字段
    if (!id || !title || !url) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          message: 'id, title, and url are required'
        },
        { status: 400 }
      )
    }

    // 添加音乐到存储
    const music = {
      id,
      title,
      description: description || '',
      duration: duration || '30秒',
      genre: genre || '混合',
      mood: mood || '中性',
      url,
      createdAt: createdAt || new Date().toISOString(),
      likes: likes || 0,
      downloads: downloads || 0,
    }

    // 检查是否已存在
    const existingIndex = musicStorage.findIndex(m => m.id === id)
    if (existingIndex >= 0) {
      musicStorage[existingIndex] = music // 更新
    } else {
      musicStorage.push(music) // 添加
    }

    return NextResponse.json({
      success: true,
      data: music,
      message: '音乐已保存到作品集'
    })
  } catch (error) {
    console.error('Save music error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save music',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // 获取单个音乐
      const music = musicStorage.find(m => m.id === id)
      if (!music) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Music not found' 
          },
          { status: 404 }
        )
      }
      return NextResponse.json({
        success: true,
        data: music
      })
    } else {
      // 获取所有音乐
      return NextResponse.json({
        success: true,
        data: musicStorage,
        count: musicStorage.length
      })
    }
  } catch (error) {
    console.error('Get music error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get music',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Music ID is required' 
        },
        { status: 400 }
      )
    }

    const index = musicStorage.findIndex(m => m.id === id)
    if (index >= 0) {
      musicStorage.splice(index, 1)
      return NextResponse.json({
        success: true,
        message: 'Music deleted successfully'
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Music not found' 
        },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Delete music error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete music',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

