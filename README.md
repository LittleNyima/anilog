# Anilog

## 快速开始

> 如果你能够理解以下内容的操作方式，请直接按下面的步骤进行。否则，作者正在编写一个详细的图文教程，届时可阅读图文教程了解部署方式。

1. 通过右上角的 `Use this template` fork 本仓库，并将仓库克隆到本地
2. 编辑 `config.yaml` 文件，填入你的 bangumi ID、页面的标题以及 slogan
3. 安装 `bun`
   ```shell
   # Windows 用户
   powershell -c "irm bun.sh/install.ps1|iex"
   # macOS/Linux 用户
   curl -fsSL https://bun.com/install | bash
   ```
4. 获取最新的追番进度
   ```
   bun run fetch
   ```
5. 本地部署，并在 [http://localhost:5173/](http://localhost:5173/) 预览效果
   ```
   bun run dev
   ```
6. 当效果满意时，进行正式部署（注意，需要保证当前对目标仓库有 push 权限）
   ```
   bun run deploy
   ```
7. 部署好的代码会出现在 `deploy` 分支，在该仓库的设置中将该分支设置为 GitHub Page，即可完成部署
