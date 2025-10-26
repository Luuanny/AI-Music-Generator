@echo off
echo AI音乐生成器 - 启动脚本
echo ================================

echo 检查Node.js环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未检测到Node.js环境
    echo 请先安装Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js环境检查通过
echo.

echo 安装项目依赖...
call npm install
if %errorlevel% neq 0 (
    echo 依赖安装失败，请检查网络连接
    pause
    exit /b 1
)

echo 依赖安装完成
echo.

echo 启动开发服务器...
echo 请在浏览器中访问: http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.

call npm run dev




