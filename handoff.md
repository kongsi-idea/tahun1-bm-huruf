# tahun1-bm-huruf 交接

> 专案背景与关键决定见 `agents.md`，这里只放「现在停在哪」。

## ⏯️ 目前做到哪
- 2026-10-05：小写 f、t 笔画调整（f 横线、t 竖线起笔，commit `3d0c44f`），已推并 `vercel deploy --prod` 上线，线上 `letters.js` 已验到新写法。Hub 未同步（只改字形）。
- 同日做了 DSKP 数码教材海报 v2（`docs/poster-v2/poster-v2.png`，源码可重生），老师还没说定稿，未对外发。
- 前情：v1.3 已上线（2026-10-01），Hub 已同步 v1.3。

## 🚦 目前状态
- 工具与 Hub 都在线，26 组「Saya tulis」模拟描写全过、无 console 错误。
- 过程：v1.0 首次上架 → v1.1/v1.2 国文老师两轮核对笔顺 → v1.3 k、R、e 字形微调（同日）。

## ➡️ 下一步
0. 海报：等老师看过定稿；要改版面改 `docs/poster-v2/poster.tpl.html` 后跑 `build.py`。
1. 学校 Windows 电脑（Chrome）与课室一体机触控实测。
2. 问老师：大写 P 的半圆（停在 y=270）要不要跟 R 一样收在第 2 条线。
3. `tools/`、`fonts/`（Azim 版遗留）老师确认不要后可搬 `~/Documents/待删除/`。

## ⚠️ 注意事项
- 本工具 `vercel deploy --prod --scope kongsi-idea` 没被 guard 挡（推测 guard 把 `--scope kongsi-idea` 当成授权名单的 kongsi-idea），已回报老师；`../agents.md` 原本写「tahunN 部署会被挡」。
- 马来文笔画说明用词（cangkuk 等）国文老师没逐条回覆，暂维持。

## 🕐 最后更新
2026-10-05 · Claude Code @ yquanloo Mac · Git：✅ 已推（8d49f41）
- 注意：`docs/poster-huruf-az.png` 是别处放进来的未跟踪档案，不是这次生成的，没动它。
