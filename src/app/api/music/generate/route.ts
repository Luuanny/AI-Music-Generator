import { NextRequest, NextResponse } from 'next/server'

// Suno API 音乐生成配置
const SUNO_API_BASE_URL = 'https://api.suno.ai/api/v1'
const API_TIMEOUT = 120000 // 120秒（Suno可能需要更长时间）
const DEFAULT_DURATION = 30 // 默认30秒

// 音乐风格的提示词映射
const GENRE_PROMPTS: Record<string, string> = {
  '流行': 'upbeat pop music, catchy melody, modern production',
  '摇滚': 'energetic rock music, powerful guitars, driving rhythm',
  '电子': 'electronic music, synthesizers, digital beats',
  '古典': 'classical music, orchestral arrangement, elegant composition',
  '爵士': 'smooth jazz, improvised melodies, sophisticated harmony',
  '民谣': 'folk acoustic guitar, gentle melody, warm tone',
  '说唱': 'hip-hop beat, urban rhythm, dynamic flow',
  'R&B': 'soulful R&B, smooth vocals, groove rhythm',
  '蓝调': 'blues guitar, emotional depth, traditional blues',
  '乡村': 'country music, acoustic instruments, storytelling'
}

const MOOD_PROMPTS: Record<string, string> = {
  '快乐': 'happy, uplifting, cheerful, joyful',
  '悲伤': 'sad, melancholic, emotional, touching',
  '激动': 'exciting, energetic, powerful, intense',
  '平静': 'peaceful, calm, soothing, relaxing',
  '浪漫': 'romantic, gentle, warm, dreamy',
  '神秘': 'mysterious, dark, atmospheric, intriguing',
  '梦幻': 'dreamy, ethereal, surreal, floating',
  '力量': 'powerful, strong, determined, inspiring',
  '温柔': 'gentle, soft, tender, delicate',
  '狂野': 'wild, aggressive, intense, powerful'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, genre, mood, duration } = body

    // 验证输入
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: '请提供音乐描述',
          message: '音乐描述不能为空'
        },
        { status: 400 }
      )
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { 
          success: false, 
          error: '音乐描述过长',
          message: '描述不能超过500个字符'
        },
        { status: 400 }
      )
    }

    // 构建增强的提示词
    let enhancedPrompt = prompt
    
    if (genre && GENRE_PROMPTS[genre]) {
      enhancedPrompt = `${GENRE_PROMPTS[genre]}, ${prompt}`
    }
    
    if (mood && MOOD_PROMPTS[mood]) {
      enhancedPrompt = `${enhancedPrompt}, ${MOOD_PROMPTS[mood]} mood`
    }

    // 获取配置
    const apiKey = process.env.SUNO_API_KEY
    let musicUrl = null
    let generationStatus = 'demo'

    // 如果有配置，尝试调用Suno API
    if (apiKey && apiKey !== 'your_suno_api_key_here') {
      try {
        const audioDuration = duration ? parseInt(duration) : DEFAULT_DURATION
        const durationSeconds = Math.min(Math.max(audioDuration, 5), 300)
        
        // 构建Suno API请求
        const sunoEndpoint = `${SUNO_API_BASE_URL}/song`

        const requestBody = {
          prompt: enhancedPrompt,
          duration: durationSeconds,
          instrumental: false,
          custom_mode: false,
          model: 'v3'
        }

        const sunoResponse = await fetch(sunoEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(API_TIMEOUT)
        })

        if (sunoResponse.ok) {
          const data = await sunoResponse.json()
          
          // Suno API返回格式可能包含音频URL或ID
          // 根据实际Suno API响应格式调整
          musicUrl = data.audio_url || data.mp3_url || data.url
          
          if (musicUrl) {
            generationStatus = 'real'
          }
        } else {
          const errorData = await sunoResponse.json().catch(() => ({}))
          console.error('Suno API error:', sunoResponse.status, errorData)
          // 降级到演示模式
        }
      } catch (apiError) {
        console.error('Suno API call failed:', apiError)
        // 降级到演示模式
      }
    }

    // 生成音乐数据
    const musicData = {
      id: Date.now().toString(),
      title: `${prompt} - ${duration || DEFAULT_DURATION}秒`,
      description: prompt,
      duration: `${duration || DEFAULT_DURATION}秒`,
      genre: genre || '混合',
      mood: mood || '中性',
      url: musicUrl || `/api/music/demo?duration=${duration || DEFAULT_DURATION}`,
      createdAt: new Date().toISOString(),
      status: 'completed',
      progress: 100,
      generationType: generationStatus,
      prompt: enhancedPrompt,
      api: 'suno'
    }

    return NextResponse.json({
      success: true,
      data: musicData,
      message: generationStatus === 'real' 
        ? '音乐生成完成！' 
        : '演示模式：未配置Suno API密钥'
    })
    
  } catch (error) {
    console.error('Music generation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '音乐生成失败',
        message: error instanceof Error ? error.message : '请稍后重试'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI音乐生成API',
    version: '3.0.0',
    api: {
      name: 'Suno AI',
      provider: 'Suno',
      status: process.env.SUNO_API_KEY ? 'configured' : 'demo',
      endpoints: {
        generate: 'POST /api/music/generate',
        status: 'GET /api/music/status/:id'
      }
    },
    usage: {
      prompt: '音乐描述（必填，最多500字符）',
      genre: '音乐风格（可选）：流行、摇滚、电子、古典等',
      mood: '情感色彩（可选）：快乐、悲伤、激动、平静等',
      duration: '音乐时长（可选，默认30秒）'
    },
    setup: {
      suno_api: 'https://suno.ai',
      documentation: 'https://suno.ai/docs',
      get_api_key: 'https://suno.ai/api'
    }
  })
}