// Add native lazy-loading + async decoding to all content images.
// Covers in page headers are rendered separately by the theme and stay eager (LCP).
hexo.extend.filter.register('after_post_render', data => {
  const tag = '<img loading="lazy" decoding="async"';
  if (data.content) data.content = data.content.replace(/<img(?![^>]*\sloading=)/g, tag);
  if (data.excerpt) data.excerpt = data.excerpt.replace(/<img(?![^>]*\sloading=)/g, tag);
  return data;
});
