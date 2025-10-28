# AI音乐生成器

一个使用Next.js构建的AI音乐生成网站，具有现代化的用户界面和丰富的功能。

## 功能特性

- 🎵 AI音乐生成 - 根据描述生成独特的音乐作品
- 🎧 音乐播放器 - 内置的高质量音乐播放器
- 📱 响应式设计 - 适配各种设备尺寸
- 🎨 现代化UI - 使用Tailwind CSS和Framer Motion
- 📚 作品集管理 - 浏览和管理生成的音乐作品
- ⚙️ 个性化设置 - 自定义用户体验

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **AI API**: Stability AI Stable Audio
- **部署**: Vercel / GitHub Pages

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## API配置

### Stability AI配置

1. **获取API密钥**
   - 访问 [Stability AI Platform](https://platform.stability.ai/)
   - 注册账号并获取API密钥

2. **配置环境变量**
   ```bash
   # 复制示例环境变量文件
   cp env.example .env.local
   
   # 编辑.env.local文件，添加你的API密钥
   STABILITY_API_KEY=your_api_key_here
   ```

3. **测试API连接**
   ```bash
   npm run dev
   # 访问 http://localhost:3000
   # 尝试生成一首音乐
   ```

### 演示模式

如果没有配置API密钥，项目会运行在演示模式，使用模拟的音乐生成过程。

## 项目结构

```
ai-music-generator/
├── src/
│   ├── app/                 # App Router页面
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 首页
│   │   ├── gallery/        # 作品集页面
│   │   └── settings/       # 设置页面
│   └── components/         # React组件
│       ├── Navigation.tsx  # 导航组件
│       ├── MusicGenerator.tsx # 音乐生成器
│       └── MusicPlayer.tsx # 音乐播放器
├── public/                 # 静态资源
├── package.json           # 项目配置
├── tailwind.config.js    # Tailwind配置
└── tsconfig.json         # TypeScript配置
```

## 主要组件

### MusicGenerator
音乐生成器组件，允许用户输入描述并生成AI音乐。

### MusicPlayer
音乐播放器组件，支持播放、暂停、音量控制等功能。

### Navigation
响应式导航栏，支持移动端菜单。

## 自定义配置

### 主题颜色
在 `tailwind.config.js` 中修改颜色配置：

```javascript
colors: {
  primary: {
    // 自定义主色调
  },
  secondary: {
    // 自定义辅助色
  }
}
```

### 动画效果
使用Framer Motion创建流畅的动画效果，可在组件中自定义动画参数。

## 部署

### GitHub Pages (推荐)
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择GitHub Actions作为部署源
4. 自动部署完成

### Vercel
1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 自动部署完成

### 其他平台
支持任何支持Node.js的部署平台，如Netlify、Railway等。

## GitHub Pages 部署步骤

1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/ai-music-generator.git
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库的 Settings 页面
   - 找到 Pages 部分
   - 选择 Source 为 "GitHub Actions"

3. **访问网站**
   - 部署完成后，网站将在 `https://你的用户名.github.io/ai-music-generator` 访问

## SEO优化

项目已经内置了完整的SEO优化配置：

- ✅ 完整的元数据标签（Open Graph, Twitter Cards）
- ✅ 响应式设计支持移动端
- ✅ 语义化HTML结构
- ✅ 结构化数据支持
- ✅ robots.txt配置
- ✅ sitemap.xml自动生成
- ✅ 多语言支持

### SEO最佳实践

1. **关键词优化**
   - AI音乐生成器
   - Stability AI
   - 人工智能音乐创作
   - 免费音乐生成工具

2. **性能优化**
   - 静态站点导出
   - 图片优化
   - 代码分割
   - CDN加速

3. **移动端优化**
   - 响应式设计
   - PWA支持
   - 触摸优化

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License



