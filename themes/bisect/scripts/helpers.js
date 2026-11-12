/* global hexo */
'use strict';

const { stripHTML, escapeHTML } = require('hexo-util');

const CJK = /[㐀-鿿豈-﫿]/g;

// 字数与阅读时长：中文按字计，西文按词计
hexo.extend.helper.register('bs_count', function(content) {
  const text = stripHTML(content || '');
  const cjk = (text.match(CJK) || []).length;
  const words = (text.replace(CJK, ' ').match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
  return {
    total  : cjk + words,
    minutes: Math.max(1, Math.round(cjk / 400 + words / 220))
  };
});

// 封面：front matter 的 cover 优先，其次 photos，否则取正文第一张图
hexo.extend.helper.register('bs_cover', function(post) {
  if (post.cover) return this.url_for(post.cover);
  if (Array.isArray(post.photos) && post.photos.length) return this.url_for(post.photos[0]);
  const m = (post.content || '').match(/<img[^>]+src="([^"]+)"/i);
  return m ? m[1] : null;
});

// 语言包取值：值为空时 Hexo 会返回键名，这里改成返回空字符串
hexo.extend.helper.register('bs_t', function(key, ...args) {
  const out = this.__(key, ...args);
  return out === key ? '' : out;
});

// 导航标签：key 走语言包，name/sub 可覆盖
hexo.extend.helper.register('bs_nav_label', function(item) {
  const t = key => { const out = this.__(key); return out === key ? '' : out; };
  const name = item.name || (item.key ? t('menu.' + item.key) : '') || item.url;
  const sub = item.sub !== undefined && item.sub !== null ? item.sub : (item.key ? t('menu.' + item.key + '_sub') : '');
  return { name, sub };
});

// 第一篇文章的年份
hexo.extend.helper.register('bs_first_year', function() {
  const first = this.site.posts.sort('date').first();
  return first ? first.date.year() : new Date().getFullYear();
});

// Creative Commons 许可链接
hexo.extend.helper.register('bs_cc', function() {
  const cc = this.theme.creative_commons;
  if (!cc || !cc.license) return null;
  const license = String(cc.license).toLowerCase();
  const url = license === 'cc-zero'
    ? 'https://creativecommons.org/publicdomain/zero/1.0/'
    : `https://creativecommons.org/licenses/${license}/4.0/` + (cc.language ? 'deed.' + cc.language : '');
  const name = license === 'cc-zero' ? 'CC0 1.0' : 'CC ' + license.toUpperCase() + ' 4.0';
  return { url, name };
});

// 站点信息流地址（安装了 hexo-generator-feed 才有）
hexo.extend.helper.register('bs_feed', function() {
  const feed = this.config.feed;
  if (!feed) return null;
  const path = Array.isArray(feed.path) ? feed.path[0] : feed.path || 'atom.xml';
  return this.url_for(path);
});

// 文章编号：按发布时间从 1 开始
hexo.extend.helper.register('bs_no', function(post) {
  const ids = this.site.posts.sort('date').map(p => p._id);
  return ids.indexOf(post._id) + 1;
});

hexo.extend.helper.register('bs_pad', (n, len = 2) => String(n).padStart(len, '0'));

// 正文字体：写作类默认宋体，可用 body_font 覆盖
hexo.extend.helper.register('bs_body_font', function(post) {
  if (post.body_font) return post.body_font;
  const serifCats = this.theme.serif_categories || [];
  const cats = post.categories ? post.categories.map(c => c.name) : [];
  return cats.some(c => serifCats.includes(c)) ? 'serif' : 'sans';
});

// ---------------------------------------------------------------
// 生成式封面：同一个标题永远得到同一张蓝白构图
// ---------------------------------------------------------------
function hash(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0) ^ (h1 >>> 0);
}

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = n => Math.round(n * 10) / 10;

hexo.extend.helper.register('bs_gen_cover', function(post, no) {
  const title = post.title || 'untitled';
  const seed = hash(title);
  const rand = rng(seed);
  const id = 'g' + seed.toString(36);
  const W = 1200, H = 800;
  const glyph = (title.match(/[㐀-鿿A-Za-z0-9]/) || ['·'])[0];
  const kind = seed % 4;

  // 蓝色区域的形状
  let blue;
  if (kind === 0) {
    const x = W * (0.42 + rand() * 0.2);
    blue = `<rect x="${r1(x)}" y="0" width="${r1(W - x)}" height="${H}"/>`;
  } else if (kind === 1) {
    const a = W * (0.3 + rand() * 0.25), b = W * (0.55 + rand() * 0.3);
    blue = `<polygon points="${r1(a)},0 ${W},0 ${W},${H} ${r1(b)},${H}"/>`;
  } else if (kind === 2) {
    const y = H * (0.46 + rand() * 0.18);
    blue = `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(H - y)}"/>`;
  } else {
    const cx = W * (0.55 + rand() * 0.25), cy = H * (0.35 + rand() * 0.3), r = H * (0.42 + rand() * 0.14);
    blue = `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}"/>`;
  }

  // 纹理：细线或点阵，只落在蓝色区域
  let texture = '';
  if (rand() < 0.5) {
    const gap = 14 + Math.floor(rand() * 10);
    for (let y = gap; y < H; y += gap) texture += `M0 ${y}H${W}`;
    texture = `<path d="${texture}" class="bs-gen__e" stroke-width="1.5" fill="none" opacity=".35"/>`;
  } else {
    const gap = 36 + Math.floor(rand() * 16);
    let dots = '';
    for (let y = gap / 2; y < H; y += gap) for (let x = gap / 2; x < W; x += gap) dots += `M${x} ${y}h.01`;
    texture = `<path d="${dots}" class="bs-gen__e" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/>`;
  }

  const gx = r1(W * (0.08 + rand() * 0.22));
  const label = `NO.${String(no || 0).padStart(2, '0')}`;
  const year = post.date ? post.date.year() : '';

  return `<svg class="bs-gen" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMinYMid slice" role="img" aria-label="${escapeHTML(title)}">
<defs><clipPath id="${id}">${blue}</clipPath></defs>
<rect class="bs-gen__w" width="${W}" height="${H}"/>
<text class="bs-gen__glyph bs-gen__b" x="${gx}" y="${H * 0.86}">${escapeHTML(glyph)}</text>
<g clip-path="url(#${id})"><rect class="bs-gen__b" width="${W}" height="${H}"/>${texture}<text class="bs-gen__glyph bs-gen__w" x="${gx}" y="${H * 0.86}">${escapeHTML(glyph)}</text></g>
<text class="bs-gen__label" x="40" y="64">${label} / ${year}</text>
</svg>`;
});

// 正文图片懒加载
hexo.extend.filter.register('after_post_render', data => {
  data.content = data.content.replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"');
  return data;
});

// 标签索引的首字母：中文按拼音分组（借助 ICU 拼音排序的分界字）
const PINYIN_BOUNDS = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '丌', '咔', '垃', '妈', '拏', '噢', '妑', '七', '呥', '仨', '他', '屲', '夕', '丫', '帀'];
const PINYIN_LETTERS = 'ABCDEFGHJKLMNOPQRSTWXYZ';
const collator = new Intl.Collator('zh-Hans-CN-u-co-pinyin');

hexo.extend.helper.register('bs_initial', name => {
  const ch = String(name).trim().charAt(0);
  if (/[A-Za-z]/.test(ch)) return ch.toUpperCase();
  if (/[㐀-鿿]/.test(ch)) {
    let letter = '#';
    PINYIN_BOUNDS.forEach((b, i) => { if (collator.compare(ch, b) >= 0) letter = PINYIN_LETTERS[i]; });
    return letter;
  }
  return '#';
});

hexo.extend.helper.register('bs_sort_zh', list => list.slice().sort((a, b) => collator.compare(a.name, b.name)));
