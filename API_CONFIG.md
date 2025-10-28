# Suno AI API 配置完整指南

## 📋 配置步骤

### 方法 1：Vercel 环境变量配置（推荐用于生产环境）

#### 1. 登录 Vercel Dashboard
- 访问：https://vercel.com
- 登录你的账号

#### 2. 进入项目设置
- 在 Dashboard 中找到你的项目 `ai-music-generator`
- 点击项目名称进入详情页
- 点击顶部菜单的 **Settings**

#### 3. 添加环境变量
- 在左侧菜单中找到 **Environment Variables**
- 点击 **Add New** 按钮

#### 4. 填写环境变量信息
```
Key:   SUNO_API_KEY
Value: 26ec42c4f387d372c5a30ea7807820ac
Environment: 
  ☑️ Production
  ☑️ Preview  
  ☑️ Development
```

#### 5. 保存并重新部署
- 点击 **Save** 保存配置
- 返回 **Deployments** 标签
- 点击最新部署旁边的 **...** 菜单
- 选择 **Redeploy**
- 或直接推送代码触发自动部署

---

### 方法 2：使用 Vercel CLI

```bash
# 安装 Vercel CLI（如果还没安装）
npm i -g vercel

# 登录 Vercel
vercel login

# 添加环境变量
vercel env add SUNO_API_KEY production

# 当提示输入值时，输入：
# 26ec42c4f387d372c5a30ea7807820ac

# 同样为 preview 和 development 添加
vercel env add SUNO_API_KEY preview
vercel env add SUNO_API_KEY development

# 重新部署
vercel --prod
```

---

### 方法 3：本地开发配置

#### 1. 创建本地环境文件

在项目根目录创建 `.env.local` 文件：

```bash
# 复制生产配置
cp env.production .env.local

# 或手动创建 .env.local 文件
```

#### 2. 编辑 `.env.local` 文件

添加以下内容：

```env
# Suno AI API配置
SUNO_API_KEY=26ec42c4f387d372c5a30ea7807820ac

# API请求超时设置（毫秒）
API_TIMEOUT=120000

# 默认音乐生成时长（秒）
DEFAULT_DURATION=15

# 最大音乐生成时长（秒）
MAX_DURATION=300
```

#### 3. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 测试

---

## 🔍 验证配置

### 检查环境变量是否生效

1. **在 Vercel 中验证**
   - Settings → Environment Variables
   - 确认 `SUNO_API_KEY` 存在

2. **部署后验证**
   - 访问你的网站
   - 尝试生成一首音乐
   - 查看是否使用真实的 Suno API

3. **检查控制台**
   - 打开浏览器开发者工具（F12）
   - 查看 Console 标签
   - 应该没有 API 错误

---

## ⚠️ 安全注意事项

### 1. 不要暴露 API 密钥
- ❌ 不要在 GitHub 公开代码中暴露密钥
- ✅ 使用 Vercel 环境变量管理
- ✅ `.env.local` 已在 `.gitignore` 中

### 2. 定期更换密钥
- 如果怀疑密钥泄露，立即更换
- 在 Vercel 中更新环境变量
- 重新部署应用

### 3. 权限管理
- 不要分享你的 Vercel 账号
- 使用团队管理功能控制访问权限

---

## 🐛 常见问题

### Q: 配置后还是显示"演示模式"
A: 
1. 确认环境变量名称正确：`SUNO_API_KEY`
2. 确认已重新部署
3. 检查 API 密钥是否正确
4. 查看 Vercel 日志确认环境变量已加载

### Q: 本地开发环境变量不生效
A:
1. 确认 `.env.local` 文件在项目根目录
2. 重启开发服务器
3. 检查文件格式（没有多余空格）

### Q: API 调用超时
A:
- Suno API 可能需要较长时间（60-120秒）
- 已配置 120 秒超时
- 尝试生成较短的音乐（15-30秒）

---

## 📞 获取帮助

- **Suno API 文档**: https://suno.ai/docs
- **Suno 官网**: https://suno.ai
- **Vercel 文档**: https://vercel.com/docs
- **项目问题**: 提交 GitHub Issue

---

## ✅ 配置完成后

1. ✅ 环境变量已配置
2. ✅ 项目已重新部署
3. ✅ API 调用正常
4. ✅ 音乐生成功能可用

**现在你的项目已经配置完成，可以使用 Suno AI 生成真实音乐了！** 🎵
