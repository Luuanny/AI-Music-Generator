# GitHub Pages 部署指南

## 🚀 快速部署步骤

### 1. 准备项目
项目已经配置好静态导出和 GitHub Actions，可以直接部署。

### 2. 推送代码到 GitHub

```bash
# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/ai-music-generator.git

# 推送到 GitHub
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库的 Settings
2. 找到 Pages 部分
3. 选择 Source 为 "GitHub Actions"
4. 保存设置

### 4. 访问网站

部署完成后，网站地址：
`https://你的用户名.github.io/ai-music-generator`

## 📝 注意事项

- ✅ `.gitignore` 已配置，自动排除大文件
- ✅ 只提交源代码，不提交构建文件
- ✅ GitHub Actions 会自动构建和部署
- ✅ 每次推送代码会自动重新部署

## 🔧 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📦 项目大小优化

- ❌ 不提交 `.next` 缓存文件（已添加到 .gitignore）
- ❌ 不提交 `node_modules`（已添加到 .gitignore）
- ✅ 只提交源代码文件
- ✅ GitHub Actions 在云端构建




