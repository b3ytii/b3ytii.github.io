// Injects a "Part of the <series> series" nav at the end of series posts,
// linking to sibling writeups ordered by date.
//
// Notes: post slugs in this site are "ctf/<name>" (posts live in source/_posts/ctf/),
// and locals.get('posts') is unreliable mid-render -> use the Post model.
const path = require('path');

const SERIES = [
  { name: 'Freeda', ctf: 'HeroCTF', slugs: ['freedasimplehook-heroctf', 'freedanotroot-heroctf', 'freedanativehook-heroctf'] },
  { name: 'Frida', ctf: 'Pwnsec CTF', slugs: ['cutefrida-pwnsec-ctf', 'freakyfrida-pwnsec-ctf', 'rudefrida-pwnsec-ctf'] },
  { name: 'Secure Catalog', ctf: 'Cyberchaze CTF', slugs: ['securecatalog-cyberchaze-ctf', 'supersecurecatalog-cyberchaze-ctf'] },
];

const pad = n => String(n).padStart(2, '0');

hexo.extend.filter.register('after_post_render', data => {
  const bare = String(data.slug || '').replace(/^ctf\//, '');
  const series = SERIES.find(s => s.slugs.includes(bare));
  if (!series || series.slugs.length < 2) return data;

  const bySlug = {};
  hexo.model('Post').forEach(p => { bySlug[p.slug.replace(/^ctf\//, '')] = p; });

  const siblings = series.slugs.map(s => bySlug[s]).filter(Boolean);
  if (siblings.length < 2) return data;

  siblings.sort((a, b) => new Date(a.date) - new Date(b.date));
  const items = siblings.map(p => {
    const url = hexo.config.permalink
      .replace(':year', String(p.date.year()))
      .replace(':month', pad(p.date.month() + 1))
      .replace(':day', pad(p.date.date()))
      .replace(':title', p.slug);
    const href = '/' + url.replace(/^\/+/, '');
    const title = p.title || path.basename(bare);
    return p.slug.replace(/^ctf\//, '') === bare
      ? `<li aria-current="page">${title}</li>`
      : `<li><a href="${href}">${title}</a></li>`;
  }).join('');

  data.content += `<nav class="bs-series" aria-label="Series">
<p class="bs-series__label">Part of the ${series.name} series · ${series.ctf}</p>
<ol>${items}</ol>
</nav>`;
  return data;
});
