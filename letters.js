// 字母按等距四线直接画中心线，笔画结构照 Azim 字体（老师认可的写法）。y 向上。
// 四线：第 4 线 = -B，基线 = 0，第 2 线（虚线）= B，第 1 线 = 2B。大写 2 格、小写主体 1 格、往上／往下伸 1 格；笔画外缘贴线。
// 每一笔 = [说明, 中心线点列, 号码位置(可省), 笔画粗细(可省，默认 W)]，点列按书写方向排列。号码位置 = 相对起点的 [dx, dy]，默认放在起点后方。
(function () {
  // 可用网址参数试不同比例：?w=笔画粗细&xb=中间格高度（大写永远 2B 高；上、下两格 = 2B - xb）
  const Q = new URLSearchParams(location.search);
  const B = 300, W = +Q.get('w') || 80, XB = +Q.get('xb') || B;
  const KX = XB / B;  // 小写横向跟着中间格一起放大
  const STEP = 6;
  function line(...pts) {
    const out = [];
    for (let k = 0; k < pts.length - 1; k++) {
      const a = pts[k], b = pts[k + 1];
      const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / STEP));
      for (let i = k ? 1 : 0; i <= n; i++) out.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
    }
    return out;
  }
  // 椭圆弧：角度为度，a0→a1 增加 = 逆时针，减少 = 顺时针
  function arc(cx, cy, rx, ry, a0, a1) {
    const len = Math.abs(a1 - a0) / 180 * Math.PI * Math.max(rx, ry);
    const n = Math.max(4, Math.ceil(len / STEP)), out = [];
    for (let i = 0; i <= n; i++) {
      const t = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      out.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
    }
    return out;
  }
  const join = (...segs) => segs.reduce((acc, s) => acc.concat(acc.length ? s.slice(1) : s), []);

  // 笔画外缘贴线：中心线比格线往内缩半个笔画宽 H。
  const H = W / 2;
  const TOP = 2 * B - H, XH = XB - H, BASE = H, DESC = -(2 * B - XB) + H, MID = B;

  // 小写的「弯」（a、d、g、q）：从竖线上端出发，往左绕，回到竖线下端——不是独立的圆圈
  const BRY = (XH - BASE) / 2, BCY = (XH + BASE) / 2, BRX = 112, BCX = BRX;
  const STEM = 205;                                            // 竖线中心 x
  const T0 = Math.acos((STEM - BCX) / BRX) * 180 / Math.PI;    // 弯和竖线相接的角度
  const bowlL = () => ['Lengkung: pusing ke kiri', arc(BCX, BCY, BRX, BRY, T0, 360 - T0), [105, 0]];
  // b、p 的弯：竖线在左，弯往右绕（顺时针）
  const bowlR = () => ['Lengkung: pusing ke kanan', arc(STEM - BCX, BCY, BRX, BRY, 180 - T0, -180 + T0), [-100, 0]];
  // 往下伸、尾巴弯向左（g、j、y）
  const HR = 110;
  const hookLeft = x => join(line([x, XH], [x, DESC + HR]), arc(x - HR, DESC + HR, HR, HR, 0, -150));
  // n、m、h 的拱：从竖线上端拱过去，再直线往下
  const ARY = 95 * KX;
  const arch = (x0, x1) => { const rx = (x1 - x0) / 2; return join(arc(x0 + rx, XH - ARY, rx, ARY, 165, 0), line([x1, XH - ARY], [x1, BASE])); };
  // i、j 的点
  const DOT_Y = XH + (TOP - XH) * 0.6;
  const dot = x => ['Titik', line([x, DOT_Y], [x, DOT_Y - 1]), [95, 0]];
  // 大写 B、P、R 的半圆：从竖线横出去，绕下来，再横回竖线
  const bump = (yTop, yBot, x) => { const r = (yTop - yBot) / 2; return line([0, yTop], [x, yTop]).concat(arc(x, yTop - r, r, r, 90, -90).slice(1), line([x, yBot], [0, yBot]).slice(1)); };

  const D = {
    A: [
      ['Garis condong ke bawah, ke kiri', line([220, TOP], [0, BASE])],
      ['Garis condong ke bawah, ke kanan', line([220, TOP], [440, BASE])],
      ['Garis melintang ke kanan', (() => { const y = MID, t = (y - BASE) / (TOP - BASE); return line([220 * t, y], [440 - 220 * t, y]); })()],  // 横线在第 2 条线上
    ],
    B: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Ke kanan, lengkung, kembali ke garis tegak', bump(TOP, MID, 190), [-95, 0]],
      ['Ke kanan, lengkung lagi, kembali ke garis tegak', bump(MID, BASE, 210), [-95, 0]],
    ],
    C: [
      ['Lengkung ke kiri, ke bawah', arc(260, MID, 250, TOP - MID, 40, 320)],
    ],
    D: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Ke kanan, lengkung besar, kembali ke garis tegak', join(line([0, TOP], [160, TOP]), arc(160, MID, 260, TOP - MID, 90, -90), line([160, BASE], [0, BASE])), [-95, 0]],
    ],
    E: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Garis melintang di atas', line([0, TOP], [330, TOP]), [-95, 0]],
      ['Garis melintang di tengah', line([0, MID], [290, MID]), [-95, 0]],
      ['Garis melintang di bawah', line([0, BASE], [330, BASE]), [-95, 0]],
    ],
    F: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Garis melintang di atas', line([0, TOP], [330, TOP]), [-95, 0]],
      ['Garis melintang di tengah', line([0, MID], [290, MID]), [-95, 0]],
    ],
    G: [
      ['Lengkung ke kiri, ke bawah', arc(250, MID, 250, TOP - MID, 38, 330)],
      ['Garis melintang ke kanan, kemudian ke bawah', (() => { const x = 250 + 250 * Math.cos(Math.PI / 6); return line([340, MID], [x, MID], [x, BASE]); })()],
    ],
    H: [
      ['Garis tegak di kiri, ke bawah', line([0, TOP], [0, BASE])],
      ['Garis tegak di kanan, ke bawah', line([380, TOP], [380, BASE])],
      ['Garis melintang di tengah', line([0, MID], [380, MID]), [-95, 0]],
    ],
    I: [
      ['Garis tegak ke bawah', line([150, TOP], [150, BASE])],
      ['Garis melintang di atas', line([0, TOP], [300, TOP]), [-95, 0]],
      ['Garis melintang di bawah', line([0, BASE], [300, BASE]), [-95, 0]],
    ],
    J: [
      ['Garis tegak ke bawah, lengkung ke kiri', join(line([300, TOP], [300, BASE + 130]), arc(170, BASE + 130, 130, 130, 0, -165))],
      ['Garis melintang di atas', line([150, TOP], [450, TOP]), [-95, 0]],
    ],
    K: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Garis condong ke bawah, ke kiri', line([360, TOP], [0, MID])],
      ['Garis condong ke bawah, ke kanan', line([0, MID], [380, BASE])],
    ],
    L: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Garis melintang ke kanan', line([0, BASE], [310, BASE]), [-95, 0]],
    ],
    M: [
      ['Garis tegak di kiri, ke bawah', line([0, TOP], [0, BASE])],
      ['Garis condong ke bawah', line([0, TOP], [240, BASE]), [-70, 60]],
      ['Garis condong ke atas', line([240, BASE], [480, TOP])],
      ['Garis tegak di kanan, ke bawah', line([480, TOP], [480, BASE])],
    ],
    N: [
      ['Garis tegak di kiri, ke bawah', line([0, TOP], [0, BASE])],
      ['Garis condong ke bawah, ke kanan', line([0, TOP], [400, BASE]), [-70, 60]],
      ['Garis tegak di kanan, ke bawah', line([400, TOP], [400, BASE])],
    ],
    O: [
      ['Bulatan: pusing ke kiri', arc(260, MID, 255, TOP - MID, 90, 448)],
    ],
    P: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Ke kanan, lengkung, kembali ke garis tegak', bump(TOP, 270, 200), [-95, 0]],
    ],
    Q: [
      ['Bulatan: pusing ke kiri', arc(260, MID, 255, TOP - MID, 90, 448)],
      ['Garis condong ke bawah, ke kanan', line([350, 175], [530, BASE - 10])],
    ],
    R: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ['Ke kanan, lengkung, kembali ke garis tegak', bump(TOP, MID, 190), [-95, 0]],
      ['Garis condong ke bawah, ke kanan', line([0, MID], [320, BASE]), [-95, -20]],  // 从竖线和第 2 条线的交界开始，斜到底线，终点对齐半圆最右边（和 R 一样宽）
    ],
    S: [
      ['Lengkung ke kiri, kemudian lengkung ke kanan', join(arc(230, 430, 200, 130, 30, 270), arc(230, 170, 220, 130, 90, -150))],
    ],
    T: [
      ['Garis melintang ke kanan', line([0, TOP], [420, TOP])],
      ['Garis tegak ke bawah', line([210, TOP], [210, BASE]), [95, -60]],
    ],
    U: [
      ['Garis tegak ke bawah, lengkung, naik ke atas', join(line([0, TOP], [0, BASE + 160]), arc(160, BASE + 160, 160, 160, 180, 360), line([320, BASE + 160], [320, TOP]))],
    ],
    V: [
      ['Garis condong ke bawah', line([0, TOP], [220, BASE])],
      ['Garis condong ke atas', line([220, BASE], [440, TOP])],
    ],
    W: [
      ['Garis condong ke bawah', line([0, TOP], [140, BASE])],
      ['Garis condong ke atas', line([140, BASE], [280, TOP])],
      ['Garis condong ke bawah', line([280, TOP], [420, BASE])],
      ['Garis condong ke atas', line([420, BASE], [560, TOP])],
    ],
    X: [
      ['Garis condong ke bawah, ke kanan', line([0, TOP], [420, BASE])],
      ['Garis condong ke bawah, ke kiri', line([420, TOP], [0, BASE])],
    ],
    Y: [
      ['Garis condong dari kiri, ke tengah', line([0, TOP], [210, MID])],
      ['Garis condong dari kanan, ke tengah', line([420, TOP], [210, MID])],
      ['Garis tegak ke bawah', line([210, MID], [210, BASE]), [95, -80]],
    ],
    Z: [
      ['Garis melintang di atas', line([0, TOP], [400, TOP])],
      ['Garis condong ke bawah, ke kiri', line([400, TOP], [0, BASE])],
      ['Garis melintang di bawah', line([0, BASE], [400, BASE]), [-95, 0]],
    ],

    a: [bowlL(), ['Garis tegak ke bawah', line([STEM, XH], [STEM, BASE])]],
    b: [['Garis tegak ke bawah', line([0, TOP], [0, BASE])], bowlR()],
    c: [['Lengkung ke kiri, ke bawah', arc(120, BCY, 120, BRY, 40, 320)]],
    d: [bowlL(), ['Garis tegak ke bawah', line([STEM, TOP], [STEM, BASE])]],
    // e：横线画细一点、整个字瘦一点，空洞才够大，尾巴也能多绕一点
    e: [['Garis melintang ke kanan', line([0, BCY], [216, BCY]), null, W * 0.6], ['Lengkung ke kiri', arc(108, BCY, 108, BRY, 0, 306), [95, 0]]],
    f: [
      ['Lengkung ke kiri, kemudian garis tegak ke bawah', join(arc(150, TOP - 80, 80 / KX, 80, 25, 180), line([150 - 80 / KX, TOP - 80], [150 - 80 / KX, BASE]))],
      ['Garis melintang ke kanan', line([0, MID], [200, MID]), [-95, 0]],  // 横线中心压在第 2 条线上
    ],
    g: [bowlL(), ['Garis tegak ke bawah, lengkung ke kiri', hookLeft(STEM)]],
    h: [['Garis tegak ke bawah', line([0, TOP], [0, BASE])], ['Lengkung ke kanan, kemudian ke bawah', arch(0, 210), [-100, -10]]],
    i: [['Garis tegak ke bawah', line([0, XH], [0, BASE])], dot(0)],
    j: [['Garis tegak ke bawah, lengkung ke kiri', hookLeft(STEM)], dot(STEM)],
    k: [
      ['Garis tegak ke bawah', line([0, TOP], [0, BASE])],
      ...(() => { const yJ = (XH + BASE) / 2, d = 190; return [  // 起止线不变，斜线放平（约 30 度）让两画长一点
        ['Garis condong ke bawah, ke kiri', line([d, XH], [0, yJ])],
        ['Garis condong ke bawah, ke kanan', line([0, yJ], [d, BASE])]]; })(),
    ],
    l: [['Garis tegak ke bawah', line([0, TOP], [0, BASE])]],
    m: [
      ['Garis tegak ke bawah', line([0, XH], [0, BASE])],
      ['Lengkung ke kanan, kemudian ke bawah', arch(0, 175), [-100, -10]],
      ['Lengkung lagi, kemudian ke bawah', arch(175, 350), [0, 110]],
    ],
    n: [['Garis tegak ke bawah', line([0, XH], [0, BASE])], ['Lengkung ke kanan, kemudian ke bawah', arch(0, 210), [-100, -10]]],
    o: [['Bulatan: pusing ke kiri', arc(115, BCY, 115, BRY, 90, 448)]],
    p: [['Garis tegak ke bawah', line([0, XH], [0, DESC])], bowlR()],
    q: [bowlL(), ['Garis tegak ke bawah, kemudian cangkuk ke kanan', line([STEM, XH], [STEM, DESC], [STEM + 75, DESC + 70])]],
    r: [['Garis tegak ke bawah', line([0, XH], [0, BASE])], ['Lengkung kecil ke kanan', arc(100, XH - ARY, 100, ARY, 165, 40), [-100, -10]]],
    s: [['Lengkung ke kiri, kemudian lengkung ke kanan', (() => { const r = (XH - BASE) / 4; return join(arc(110, XH - r, 95, r, 30, 270), arc(110, BASE + r, 105, r, 90, -150)); })()]],
    t: [['Garis tegak ke bawah', line([75, TOP], [75, BASE])], ['Garis melintang ke kanan', line([0, MID], [170, MID]), [-95, 0]]],  // 竖线从第 1 条线写起；横线中心在第 2 条线上
    u: [
      ['Garis tegak ke bawah, lengkung ke kanan', join(line([0, XH], [0, BASE + 100]), arc(100, BASE + 100, 100, 100, 180, 348))],
      ['Garis tegak di kanan, ke bawah', line([STEM, XH], [STEM, BASE])],
    ],
    v: [['Garis condong ke bawah', line([0, XH], [130, BASE])], ['Garis condong ke atas', line([130, BASE], [260, XH])]],
    w: [
      ['Garis condong ke bawah', line([0, XH], [95, BASE])],
      ['Garis condong ke atas', line([95, BASE], [190, XH])],
      ['Garis condong ke bawah', line([190, XH], [285, BASE])],
      ['Garis condong ke atas', line([285, BASE], [380, XH])],
    ],
    x: [
      ['Garis condong ke bawah, ke kanan', line([0, XH], [240, BASE])],
      ['Garis condong ke bawah, ke kiri', line([240, XH], [0, BASE])],
    ],
    y: [
      ['Garis tegak ke bawah, lengkung ke kanan', join(line([0, XH], [0, BASE + 100]), arc(100, BASE + 100, 100, 100, 180, 348))],
      ['Garis tegak ke bawah, lengkung ke kiri', hookLeft(STEM)],
    ],
    z: [
      ['Garis melintang di atas', line([0, XH], [240, XH])],
      ['Garis condong ke bawah, ke kiri', line([240, XH], [0, BASE])],
      ['Garis melintang di bawah', line([0, BASE], [240, BASE]), [-95, 0]],
    ],
  };
  window.GRID = { B, W, XB };
  window.LETTERS = {};
  for (const ch in D) {
    const strokes = D[ch].map(([name, pts, badge, w]) => ({ name, pts, badge: badge || undefined, w }));
    // 左边对齐到 0，宽度 = 实际最右
    if (ch === ch.toLowerCase()) strokes.forEach(s => s.pts = s.pts.map(([x, y]) => [x * KX, y]));
    const xs = strokes.flatMap(s => s.pts.map(p => p[0])), x0 = Math.min(...xs);
    strokes.forEach(s => s.pts = s.pts.map(([x, y]) => [x - x0, y]));
    window.LETTERS[ch] = { ch, adv: Math.max(...xs) - x0, r: W / 2, strokes };
  }
})();
