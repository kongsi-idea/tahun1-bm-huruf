# tahun1-bm-huruf — Huruf A–Z: Mari Menulis

一年级马来文字母书写工具：等距四线上的大小写 A–Z 笔顺（Tonton 自动写／Langkah demi langkah 逐笔／Saya tulis 学生描写）。
线上：https://tahun1-bm-huruf.vercel.app ・ Hub 条目负责老师：Cikgu Lim Shih Eyong ・ DSKP BM SJK Tahun 1 SP 3.1.1 (i) huruf（本机 PDF `~/Documents/工作档案/学校/教学工作/评估与练习/DSKP/DSKP一年级国文.pdf` 第 32 页）。

## 关键决定（代码看不出来的）

- **字母是按四线自己画的中心线，不是字体**（`letters.js`）。试过老师给的 Azim-Medium.otf：它的小写高是大写的 75%，放不进等距四线；把 Azim 骨架缩进四线（`tools/build.py`）弯会歪扭。所以改为几何线条手画，**笔画结构照 Azim**（a/d/g/q 的弯接回竖线、g/j/y 尾巴弯左、q 尖竖钩往右上挑）。
- **比例定案**：四线等距（B=300）、笔画粗 80、笔画**外缘**贴线（中心线内缩 W/2）。老师看过「中间格放大」方案后决定维持等距；对比图 `docs/比例方案对比.png`，`?xb=&w=` 网址参数可即时试，别再主动改。
- **笔顺以国文老师核对为准**（2026-10-01 两轮）：e 2 画先横后弯；J 先竖弯钩后横；K/k 3 画、斜线交在竖线上；k 斜线放平约 30°（老师嫌 45° 太短）；M 4 画尖头到底；V/v 2 画、W/w 4 画，往上的那画从底往上；大写 U 没尾巴一笔；A 横线在第 2 条线；R 腿从竖线×第 2 条线开始、终点对齐半圆最右；Z/z 3 画。N、B、i/j、y、P 老师没提，维持。
- **e 的横线单独画细（0.6W）**：粗笔画在一格高里塞两个空洞太挤；`letters.js` 每笔第 4 个参数可单独设粗细，只有 e 用。
- **动画不用 stroke-dasharray**，每帧重画子路径（`partD`）：Safari 的虚线揭开会在一圈上同时冒出好几段。
- **彩带画在 canvas 上、放在 svg 底下**：老师要求庆祝粒子不能挡字。
- **介面文字全部马来文**（老师要求），给 7 岁小孩用短句；程式注释用中文。
- **Azim 字体档不公开**：授权未确认，`fonts/`、`tools/` 在 `.gitignore`／`.vercelignore`，线上 404 已核对。
- 部署：`vercel deploy --prod --yes --scope kongsi-idea`；改版后 Hub 要同步（见 `../agents.md` 的 Hub 五步）。
