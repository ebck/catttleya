# ============================================================
# GitHub Pages 部署脚本
# 使用方法:
#   1. 将下方邮箱改为你自己的信息
#   2. 在本目录下用 PowerShell 运行: .\deploy-to-github.ps1
# ============================================================

# ====== 请修改邮箱为你自己的信息 ======
$GitHubUser  = "ebck"
$GitHubEmail = "你的邮箱@example.com"  # 改成你的 GitHub 关联邮箱
# =====================================

$RepoName = "catttleya"
$RemoteUrl = "https://github.com/$GitHubUser/$RepoName.git"

Write-Host "===== 开始部署到 GitHub Pages =====" -ForegroundColor Cyan

# 1. 配置 git 用户信息
Write-Host "[1/7] 配置 git 用户信息..." -ForegroundColor Yellow
git config --global user.name  $GitHubUser
git config --global user.email $GitHubEmail
Write-Host "  用户名: $GitHubUser" -ForegroundColor Green
Write-Host "  邮箱:   $GitHubEmail" -ForegroundColor Green

# 2. 初始化 git 仓库
Write-Host "[2/7] 初始化 git 仓库..." -ForegroundColor Yellow
cd $PSScriptRoot
if (Test-Path ".git") {
    Write-Host "  .git 已存在, 跳过初始化" -ForegroundColor DarkYellow
} else {
    git init
    Write-Host "  git 仓库已创建" -ForegroundColor Green
}

# 3. 添加所有文件并提交
Write-Host "[3/7] 添加文件并提交..." -ForegroundColor Yellow
git add -A
git commit -m "Initial commit: 网络工程师职业生涯发展报告"
Write-Host "  提交完成" -ForegroundColor Green

# 4. 设置主分支为 main
Write-Host "[4/7] 设置主分支为 main..." -ForegroundColor Yellow
git branch -M main

# 5. 添加远程仓库并拉取远程内容
Write-Host "[5/7] 添加远程仓库..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $RemoteUrl
Write-Host "  远程地址: $RemoteUrl" -ForegroundColor Green

Write-Host "[5/7] 拉取远程仓库已有内容..." -ForegroundColor Yellow
Write-Host "  注意: 如果提示登录, 请输入 GitHub 用户名和 Personal Access Token" -ForegroundColor Red
Write-Host "  (Token 不是密码, 需在 GitHub Settings - Developer settings - Tokens 生成)" -ForegroundColor Red
Write-Host ""
git pull origin main --allow-unrelated-histories --no-edit 2>$null

# 如果有冲突, 用本地版本覆盖
if ($LASTEXITCODE -ne 0) {
    Write-Host "  检测到冲突, 使用本地版本解决..." -ForegroundColor DarkYellow
    git checkout --ours README.md 2>$null
    git add -A 2>$null
    git commit -m "Merge remote, keep local files" --no-edit 2>$null
}

# 6. 推送到 GitHub
Write-Host "[6/7] 推送到 GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===== 推送成功! =====" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "下一步: 开启 GitHub Pages" -ForegroundColor White
    Write-Host "  1. 打开 https://github.com/$GitHubUser/$RepoName/settings/pages" -ForegroundColor White
    Write-Host "  2. Source 选择 Deploy from a branch" -ForegroundColor White
    Write-Host "  3. 分支选 main, 目录选 / (root)" -ForegroundColor White
    Write-Host "  4. 点击 Save" -ForegroundColor White
    Write-Host ""
    Write-Host "几分钟后即可访问:" -ForegroundColor White
    Write-Host "  https://$GitHubUser.github.io/$RepoName/" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "===== 首次推送失败, 尝试强制推送 =====" -ForegroundColor Yellow
    git push -u origin main --force
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "===== 推送成功! =====" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "下一步: 开启 GitHub Pages" -ForegroundColor White
        Write-Host "  1. 打开 https://github.com/$GitHubUser/$RepoName/settings/pages" -ForegroundColor White
        Write-Host "  2. Source 选择 Deploy from a branch" -ForegroundColor White
        Write-Host "  3. 分支选 main, 目录选 / (root)" -ForegroundColor White
        Write-Host "  4. 点击 Save" -ForegroundColor White
        Write-Host ""
        Write-Host "几分钟后即可访问:" -ForegroundColor White
        Write-Host "  https://$GitHubUser.github.io/$RepoName/" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "===== 推送失败, 请检查错误信息 =====" -ForegroundColor Red
        Write-Host "常见问题:" -ForegroundColor Yellow
        Write-Host "  - 认证失败: 请使用 Personal Access Token 而非密码" -ForegroundColor Yellow
        Write-Host "  - 网络问题: 检查网络代理设置" -ForegroundColor Yellow
    }
}
