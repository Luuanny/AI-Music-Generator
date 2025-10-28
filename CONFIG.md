# Vercel 环境变量配置指南

## 🎯 配置 Suno API 密钥

您的 API 密钥：`26ec42c4f387d372c5a30ea7807820ac`

### 在 Vercel 中配置环境变量

1. **访问 Vercel Dashboard**
   - 登录 https://vercel.com
   - 找到你的项目 `ai-music-generator`

2. **进入 Settings**
   - 点击项目名称
   - 选择 "Settings" 标签
   - 在左侧菜单中找到 "Environment Variables"

3. **添加环境变量**
   - 点击 "Add New" 按钮
   - Key: `SUNO_API_KEY`
   - Value: `26ec42c4f387d372c5a30ea7807820ac`
   - Environment: 选择 "Production", "Preview", "Development" (或全选)
   - 点击 "Save"

4. **重新部署**
   - 返回 "Deployments" 标签
   - 点击最新的部署旁边的 "..." 菜单
   - 选择 "Redeploy"
   - 或直接推送新的 commit 触发自动部署

### ⚠️ 安全警告

- ✅ API 密钥已在 `env.production` 文件中（可提交到Git）
- ❌ 不要将实际的 `.env.local` 提交到Git
- ✅ 使用 Vercel 环境变量是更安全的做法

### 🔄 部署后的验证

1. 等待部署完成
2. 访问你的网站
3. 尝试生成一首音乐
4. 查看浏览器控制台是否还有错误

### 📝 本地开发配置

如果你想在本地开发时使用这个API密钥：

```bash
# 创建 .env.local 文件
cp env.production .env.local

# 编辑 .env.local（如果API密钥不同）
# SUNO_API_KEY=26ec42c4f387d372c5a30ea7807820ac

# 运行开发服务器
npm run dev
```

---

**下一步：配置完成后，项目将使用 Suno AI 生成真实音乐！**
