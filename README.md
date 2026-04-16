# Anilog

## 快速开始

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

   ```shell
   bun run fetch
   ```

5. 本地部署，并在 [http://localhost:5173/](http://localhost:5173/) 预览效果

   ```shell
   bun run dev
   ```

6. 当效果满意时，进行正式部署（注意，需要保证当前对目标仓库有 push 权限）

   ```shell
   bun run deploy
   ```

7. 部署好的代码会出现在 `deploy` 分支，在该仓库的设置中将该分支设置为 GitHub Page，即可完成部署

## 自动化部署

通过利用 GitHub Action 可以实现自动化更新信息以及部署，请按照下面的方式操作。

1. 生成 SSH 密钥对

   ```shell
   ssh-keygen -t rsa -b 4096 -N "" -C LittleNyima/anilog -f sshkey
   ```

2. 打开 fork 仓库的设置页面，找到 Deploy keys 这一项。添加一个 key，并将下面命令的输出复制进去，勾选下方的 Allow write access 选项，最后保存

   ```shell
   cat sshkey.pub
   ```

3. 继续在设置页面中找到 Secrets and variables > Actions，点击 New repository secret 按钮，在 Name 输入框中输入

   ```
   DEPLOY_SSH_SECRET
   ```

   然后将下面的命令的输出复制到 Secret 一栏中，保存

   ```shell
   cat sshkey
   ```

4. 为了确保安全性，删除刚刚生成的密钥对

   ```shell
   rm -f sshkey sshkey.pub
   ```

5. 在默认情况下，由于本仓库已经带有 GitHub Action 的定义 yaml 文件，到这一步已经能够实现每天一次的自动化更新。可以前往仓库的 Actions 选项中找到 scheduled-deploy 这一项，并点击 Run workflow 来测试运行是否成功

6. 如果上一步没有成功，请检查你的仓库的默认分支中是否包含 `.github/workflows/scheduled_deploy.yaml` 这一文件，如果不存在，请创建这个文件并复制下面的内容到文件中：

   ```yaml
   name: scheduled-deploy

   on:
   schedule:
     - cron: "0 16 * * *"
   workflow_dispatch:

   jobs:
   build-and-deploy:
     runs-on: ubuntu-latest

     steps:
       - name: Checkout code
         uses: actions/checkout@v4

       - name: Setup Bun
         uses: oven-sh/setup-bun@v2
         with:
           bun-version: latest

      - name: Install dependencies
        run: bun ci

      - name: Fetch latest data
        run: bun run fetch

      - name: Build project
        run: bun run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          deploy_key: ${{ secrets.DEPLOY_SSH_SECRET }}
          publish_dir: dist
          publish_branch: deploy
   ```

   保存后请用该命令提交修改：

   ```
   git add .github && git commit -m "Add GitHub Action" && git push
   ```
