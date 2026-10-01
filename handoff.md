# tahun1-bm-huruf 交接

- **状态**：样品阶段（2026-10-01）。第三版：按等距四线手写几何中心线（`letters.js`），笔画结构照 Azim（a/g/q 的弯接回竖线、g/y 尾巴弯左、q 尾巴右上翘、G 横折），A–Z 26 组已全部画完（2026-10-01）。粗细 W=80、格高 B=300 老师已认可；笔画外缘贴线。动画用重画子路径（不用 stroke-dasharray，Safari 会画错）。
- **DSKP**：BM SJK Tahun 1，3.0 Kemahiran Menulis → 3.1 Asas menulis → 3.1.1 Menulis secara mekanis (i) huruf（本机 PDF `工作档案/学校/教学工作/评估与练习/DSKP/DSKP一年级国文.pdf` 第 32 页核对）。
- **做法**：`tools/build.py` 从 `fonts/Azim-Medium.otf`（老师提供）读字形轮廓，骨架化求中心线，按 `STROKES` 定义笔顺/方向，输出 `letters.js`。页面用字形当遮罩，沿中心线揭开 → 墨迹就是字体本身。
  - 重跑：`python3 -m venv v && v/bin/pip install scikit-image fonttools pillow numpy scipy`，再 `v/bin/python tools/build.py AaGgYy letters.js`（在 tools/ 外层跑）。
- **已知问题／待定**：
  - `tools/build.py`（Azim 骨架→四线缩放）试过，弯会变得不平滑，已不用；`tools/`、`fonts/` 留着备查，老师确认后移去 `待删除/`。
  - 马来西亚官方 a/g/y 标准字形网上查不到，现按参考图（单层 a/g、直线 y、q 尾巴往右上翘）画，待老师用课本核对。
- **介面（2026-10-01 v4）**：主页＝字母挂卡墙（三排挂绳，元音粉卡、辅音四色轮替，写完 ⭐ 存 localStorage 只限本机）；网址 `#A` 直接开某字母；写字页顶栏有全部字母、◀ ▶、键盘 ←→/Esc；完成缎带 Bagus! 出现在格子上方空白、彩带 canvas 在 svg 底下不挡字。
- **语言**：给学生看的字全部是马来文（10-01 老师要求），笔画说明用 garis tegak／melintang／condong、lengkung、bulatan、titik、cangkuk；程式注释仍是中文。
- **比例方案**：老师 10-01 决定维持等距四线＋笔画 80；对比图在 `docs/比例方案对比.png`，网址参数 `?xb=360&w=72` 可即时试。
- **v1.1（2026-10-01）国文老师核对后改**：e 2 画（先横后弯）；J 先竖弯钩后横；K/k 3 画、两斜线交在竖线上（k 交在第 2 条线）；M 4 画、中间尖头到底；V/v 2 画、W/w 4 画，往上的那画从底往上；大写 U 没尾巴一笔写完。N、B、i/j、y 与马来文用词老师没提，维持。
- **v1.2（2026-10-01）国文老师第二次核对**：A 横线在第 2 条线上；k 第 2 画从第 2 条线 45 度往左下、第 3 画 45 度往右下到底线，两画等长；R 半圆底在第 2 条线、腿 45 度到底线；Z/z 3 画。P 的半圆仍停在 270（老师没提）。
- **v1.3（2026-10-01）**：k 两斜线放平约 30 度变长（起止线不变、等长）；R 第 3 画从竖线×第 2 条线交界开始、终点对齐半圆最右（x=320）；e 横线 0.6 倍粗、字身收窄（rx 108）、尾巴到 306 度。笔画可单独设粗细（letters.js 第 4 个参数）。Hub 负责老师＝Cikgu Lim Shih Eyong。
- **已上架**（2026-10-01）：https://tahun1-bm-huruf.vercel.app （Vercel 团队 kongsi-idea，`vercel deploy --prod --yes --scope kongsi-idea` 这次 guard 没挡）；Hub 条目 v1.0 已在 kongsi-idea.vercel.app。`fonts/`、`tools/`、`docs/`、`handoff.md` 由 `.vercelignore` 排除，线上 404 已核对。
- **下一步**：老师对课本核对笔顺与马来文用词 → 改版时记得同步 Hub（version／changelog／截图／覆盖表／tools-status）。
