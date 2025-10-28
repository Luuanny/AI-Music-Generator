import { NextRequest, NextResponse } from 'next/server'

// 生成一个简单的演示音频数据
// 使用Web Audio API生成静音或简单音调
function generateSilentAudio(duration: number = 2): ArrayBuffer {
  // 生成2秒的静音音频（WAV格式）
  const sampleRate = 44100
  const numChannels = 2
  const bitsPerSample = 16
  const samples = duration * sampleRate
  
  const buffer = new ArrayBuffer(44 + samples * numChannels * (bitsPerSample / 8))
  const view = new DataView(buffer)
  
  // WAV文件头
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }
  
  writeString(0, 'RIFF')
  view.setUint32(4, buffer.byteLength - 8, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true)
  view.setUint16(32, numChannels * (bitsPerSample / 8), true)
  view.setUint16(34, bitsPerSample, true)
  writeString(36, 'data')
  view.setUint32(40, samples * numChannels * (bitsPerSample / 8), true)
  
  // 静音（所有采样值为0）
  return buffer
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const duration = parseFloat(searchParams.get('duration') || '2')
    
    // 生成演示音频（静音）
    const audioBuffer = generateSilentAudio(duration)
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Audio generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate audio',
        message: 'Unable to create demo audio file'
      },
      { status: 500 }
    )
  }
}

