# 生成海报：python3 build.py → poster-v2.png（2400×3394，A 系列比例）
# 需要 playwright、segno（QR 已存成 qr.svg，指向线上网址）。hero.png 是线上工具 Aa 动画播完的真实截图（见 agents.md）。
from playwright.sync_api import sync_playwright
import os
d = os.path.dirname(os.path.abspath(__file__))
t = open(f'{d}/poster.tpl.html').read()
q = open(f'{d}/qr.svg').read().replace('width="29" height="29"', 'viewBox="0 0 29 29" shape-rendering="crispEdges"')
open(f'{d}/poster.html', 'w').write(t.replace('%%QR%%', q))
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 2400, 'height': 3394})
    pg.goto(f'file://{d}/poster.html'); pg.wait_for_timeout(1500)
    pg.screenshot(path=f'{d}/poster-v2.png', full_page=True); b.close()
