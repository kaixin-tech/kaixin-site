# 凯薪英文独立站 → GitHub Pages 迁移与域名解析指南

> 适用对象：沈阳凯薪科技（Shenyang Kaixin Technology）英文独立站
> 本地仓库已准备好：位置 `C:\Users\ASUS\WorkBuddy\2026-08-10-17-29-39\kaixin-site`，分支 `main`，已提交 2 个 commit。
> 本指南可复制粘贴执行。**不需要买服务器**——GitHub Pages 免费托管静态站。

---

## 一、准备条件（一次性）

1. 注册 GitHub 账号：https://github.com （免费）。记住你的**用户名** `YOURUSER`。
2. 买一个 `.com` 域名（约 ¥75/年）：推荐阿里云国际站 https://www.aliyun.com 或 Namesilo / Porkbun。
   - 假设你买的域名是 `kaixintech.com`（下文中所有 `yourdomain.com` 都替换成你实际买的）。
   - 决定主域名用 `www` 还是裸域：
     - **推荐用 `www.yourdomain.com`**（最稳，DNS 用 CNAME，HTTPS 证书自动续期无坑）。
     - 裸域 `yourdomain.com` 也行，但需填 4 条 A 记录。

---

## 二、在 GitHub 上建仓库

1. 登录 GitHub → 右上角 **+** → **New repository**。
2. Repository name 填 `kaixin-site`（随便起，别用中文）。
3. 选 **Public**（私有仓库 Pages 旧版要付费，公开免费）。
4. **不要**勾选 "Add a README" / .gitignore / license（本地已就绪）。
5. 点 **Create repository**。
6. 建好后页面会显示仓库地址，形如：
   `https://github.com/YOURUSER/kaixin-site.git`

---

## 三、把本地仓库推上去

> 本地已 `git init` 并提交。你只需加远程地址并推送。

### 方式 A：Git 命令行（本机已装 git 2.47）

打开 Git Bash，逐行执行（把 `YOURUSER` 和域名换成你的）：

```bash
cd "C:/Users/ASUS/WorkBuddy/2026-08-10-17-29-39/kaixin-site"

# 关联远程仓库（换成你的真实地址）
git remote add origin https://github.com/YOURUSER/kaixin-site.git

# 推送（首次推送）
git push -u origin main
```

推送时若提示输入用户名/密码：
- 用户名：你的 GitHub 账号
- **密码栏填 Personal Access Token（不是账号密码）**

如何生成 Token：
GitHub 网页 → 右上角头像 → **Settings** → 左侧最下 **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token** → 勾选 `repo` 全部权限 → 生成后**复制保存**（只显示一次）。

### 方式 B：GitHub Desktop（不想用命令行的备选）
1. 下载安装 https://desktop.github.com
2. File → Add Local Repository → 选择 `kaixin-site` 文件夹
3. Publish → 选 Public → 推上去

### 方式 C：直接网页上传（最省事，无需 git）
在新建的空仓库页面，点 "uploading an existing file"，把 `kaixin-site` 里**所有文件和文件夹**拖进去（含 `.nojekyll`），写个 commit 信息提交。
> ⚠️ 注意：`.nojekyll` 是隐藏文件，拖拽时确认它被一起传上去了（没有它 Jekyll 可能误处理站点）。

---

## 四、开启 GitHub Pages

1. 进入仓库 → **Settings**（顶部）→ 左侧 **Pages**。
2. **Build and deployment** 里：
   - Source 选 **Deploy from a branch**
   - Branch 选 **main**，目录选 **/ (root)**
   - 点 **Save**。
3. 等待 1–2 分钟，页面会显示：
   `Your site is live at https://YOURUSER.github.io/kaixin-site/`
   → 这就是你的**生产站点地址**，全球可访问、谷歌可收录。
4. 打开验证一下首页、产品页、视频是否正常。

---

## 五、绑定自己的域名（让客户访问 yourdomain.com）

1. 在 **Settings → Pages → Custom domain** 输入 `www.yourdomain.com`（或裸域 `yourdomain.com`）。
2. 勾选 **Enforce HTTPS**（GitHub 会自动申请并配置 SSL 证书，约 15 分钟内生效，期间先走 http 也行）。
   - GitHub 会**自动在仓库根目录生成 `CNAME` 文件**，无需手建。
3. 回到你买域名的注册商后台，做 **DNS 解析**：

### 若主域名用 `www.yourdomain.com`（推荐）
| 类型 | 主机记录 | 值 / 指向 |
|------|---------|----------|
| CNAME | `www` | `YOURUSER.github.io` |
| A（可选，裸域跳 www） | `@` | `185.199.108.153` |
| A（可选） | `@` | `185.199.109.153` |
| A（可选） | `@` | `185.199.110.153` |
| A（可选） | `@` | `185.199.111.153` |

> 裸域 `@` 的 4 条 A 记录指向 GitHub Pages 服务器，保证用户输 `yourdomain.com` 也能打开（GitHub 会自动 301 跳到 www）。

### 若主域名直接用裸域 `yourdomain.com`
| 类型 | 主机记录 | 值 |
|------|---------|----------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOURUSER.github.io`（方便 www 也能访问） |

4. DNS 生效通常 10 分钟–数小时（看注册商 TTL）。生效后访问 `https://www.yourdomain.com` 应显示网站且地址栏有锁（HTTPS）。

---

## 六、把站点里的域名占位符替换成真实域名

站点里现在用占位符 `www.YOURDOMAIN.com`（sitemap、robots、首页和博客页的 canonical/og 标签）。绑定域名后**必须替换**，否则搜索引擎收录的是占位符地址。

需要改的文件（把 `www.YOURDOMAIN.com` 全局替换成你的真实域名，例如 `www.kaixintech.com`）：
- `sitemap.xml`
- `robots.txt`
- `index.html`
- `blog.html`
- `blog/rice-husk-vs-bamboo-vs-plastic.html`
- `blog/what-is-rice-husk-tableware.html`
- `blog/why-bpa-free-tableware-matters.html`

**快速替换（Git Bash）：**
```bash
cd "C:/Users/ASUS/WorkBuddy/2026-08-10-17-29-39/kaixin-site"
# 把下面 YOURDOMAIN.com 换成你买的域名（保留 www. 前缀）
find . -name "*.html" -o -name "sitemap.xml" -o -name "robots.txt" | xargs sed -i "s#www.YOURDOMAIN.com#www.kaixintech.com#g"
git add -A
git commit -m "Replace YOURDOMAIN placeholder with real domain"
git push
```
> 如果用了方式 C（网页上传），就直接在 GitHub 网页上编辑这几个文件，把 `www.YOURDOMAIN.com` 改成真实域名后提交。

---

## 七、提交 Google Search Console（让谷歌收录）

1. 打开 https://search.google.com/search-console
2. 添加资源：选 **URL 前缀** 填 `https://www.yourdomain.com/`（或域名属性 `yourdomain.com`）。
3. 验证：选 **DNS 验证** 最方便——回到域名注册商 DNS，加一条 TXT 记录（值由 Search Console 给），等几分钟点验证。
4. 左侧 **Sitemaps** → 提交 `https://www.yourdomain.com/sitemap.xml`。
5. 之后在 **URL 检查** 里可手动请求收录首页和产品页，通常几天到几周内陆续被搜到。

---

## 八、迁移后说明

- **生产站点**：GitHub Pages（`yourdomain.com` 或 `YOURUSER.github.io/kaixin-site`）——稳定、全球可访问、谷歌可收录。
- **CloudStudio 沙箱**：继续当内部预览用即可，不用再对外推广这个地址。
- **成本**：域名 ≈ ¥75/年 + GitHub Pages 免费 = 一年几十块，无需服务器。
- **后续发博客**：在 `assets/data/posts.json` 加条目 + 新建 `blog/xxx.html`，推送即上线。
- **询盘表单**：当前是 `mailto` 直达 `alina@kaixinkeji.cn`，静态托管下正常工作，无需后端。

---

## 九、本次已完成的本地改动（已提交在仓库里）

1. 首页两处"100%"营销宣称改为非绝对表述：`100% Plant Fiber` → `Plant-Fiber Based`；`100% plant-based` → `Plant-based`。
2. 首页 `index.html` 的 canonical / og:url / logo 里残留的旧国内站 `kaixinkeji.cn` 改为 `YOURDOMAIN.com` 占位符（与全站一致）；业务邮箱 `alina@kaixinkeji.cn` 保持不变。
3. 产品视频中文名改为 ASCII：`菜板视频.mp4` → `chopping-board.mp4`，`水杯4.mp4` → `cup.mp4`，并同步更新产品页引用。
4. 仓库根加 `.nojekyll`，禁用 Jekyll 处理，确保静态资源原样托管。
