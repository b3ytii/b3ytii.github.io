# Bisect

**One line, two colors.** A blue/white split theme for [Hexo](https://hexo.io).

[简体中文](README.zh-CN.md) · [Live demo](https://blog.liuxiu.us) · [Report an issue](https://github.com/LiuXiu233/hexo-theme-bisect/issues)

Bisect is built around a single idea: one divider runs through the whole site. It splits the home page into white and blue, tracks your reading progress, sweeps across the screen when you change pages, and flips the site between light and dark. Everything else stays quiet so your writing can be read.

## Features

- **A divider you can drag.** The home page is split into white and blue. The site title crosses the line and changes color on each side. Drag the handle, or use the arrow keys.
- **An index, not a feed.** All posts in one list, grouped by year and filterable by category. Hovering a row sweeps it blue and shows the cover.
- **One look for any image.** Covers in lists are rendered as blue/white duotones, so photos, illustrations and screenshots all sit in the same system. Inside a post they show in full color.
- **Generated covers.** A post without images gets a blue/white composition built from its title. The same title always gets the same cover.
- **Reading tools.** Split post header, a progress rail with a live table of contents, numbered sections, figure captions, image zoom, and code blocks with a copy button.
- **CJK typography.** Automatic spacing between Chinese and Latin text, punctuation trimming, emphasis dots, and a serif body for the categories you choose.
- **Light and dark.** Follows the system, or the visitor's choice. The switch, and every page navigation, uses a blue "cut" view transition.
- **⌘K / Ctrl+K palette.** Search titles, text and tags, or run commands: `>theme`, `>random`, `>top`, `>archive`.
- **Honest archive.** Years with no posts stay in the timeline. Tags are indexed by initial letter (pinyin for Chinese).
- **The usual extras.** utterances or giscus comments, Chatra chat, reward QR codes, Creative Commons notice, Mermaid diagrams, RSS link.
- **Languages.** English, 简体中文, 繁體中文.
- **No framework, no build step.** Plain HTML, CSS and JavaScript. Pages stay readable without JavaScript, and motion respects `prefers-reduced-motion`.

## Install

Bisect needs Hexo 7 or later and the EJS renderer (included in new Hexo sites).

```bash
git clone https://github.com/LiuXiu233/hexo-theme-bisect themes/bisect
```

Then set the theme in your site's `_config.yml`:

```yaml
theme: bisect
```

### Recommended plugins

```bash
npm install hexo-generator-searchdb hexo-generator-feed hexo-generator-sitemap
```

Search reads the index built by `hexo-generator-searchdb`. Add this to your site's `_config.yml`:

```yaml
search:
  path: search.xml
  field: post
  content: true
  format: html
```

### Recommended site settings

The home page is designed as one index of every post. Pagination still works, but the theme looks best without it:

```yaml
per_page: 0
index_generator:
  path: ''
  per_page: 0
  order_by: -date
```

The `subtitle` of your site becomes the slogan on the blue side of the home page and footer.

### Tags, categories and about pages

```bash
hexo new page tags        # then add `type: tags` to its front matter
hexo new page categories  # then add `type: categories`
hexo new page about
```

## Configuration

Copy `themes/bisect/_config.yml` to your site root as `_config.bisect.yml` and edit that copy. Your settings then survive theme updates.

| Option | What it does |
| --- | --- |
| `nav` | Menu items. Use `key` for built-in translated labels, or `name` / `sub` for your own. |
| `hero` | Home page split: `title`, `eyebrow`, `intro`, and the default `split` position (40–80). |
| `slogan_sub` | A second line under the slogan, e.g. a translation of your subtitle. |
| `category_sub` | Secondary labels for categories, e.g. `{ 写作: Writing }`. |
| `serif_categories` | Categories whose posts use the serif body font. |
| `fonts` | Where CJK fonts come from. See below. |
| `social`, `sites` | Footer links. |
| `creative_commons`, `reward`, `follow_me` | Post footer. |
| `comments` | `utterances`, `giscus` or `none`. |
| `chatra`, `mermaid` | Extras, off or on demand. |

### Fonts

Archivo and JetBrains Mono ship with the theme. The CJK fonts are Source Han Serif and Source Han Sans Heavy (Noto Serif SC / Noto Sans SC). Pick how to load them with `fonts.cjk`:

- `google` (default): load from Google Fonts. Set `fonts.host` to a mirror, such as `https://fonts.loli.net`, if many readers are in mainland China.
- `local`: self-host. Run this once, then commit the files it creates in `source/`:

  ```bash
  hexo bisect-fonts
  ```

  Fonts are split by `unicode-range`, so each page downloads only the characters it uses.
- `system`: use the reader's system fonts only.

### Front matter

| Field | Effect |
| --- | --- |
| `cover` | Cover image. Falls back to `photos[0]`, then the first image in the post, then a generated cover. |
| `description` | Summary shown in lists and the post header. Falls back to the excerpt. |
| `body_font` | `serif` or `sans`, overriding `serif_categories`. |
| `comments: false` | Hide comments on this post. |
| `reward: false` | Hide the reward button on this post. |

## Browser support

Current versions of Chrome, Edge, Safari and Firefox. View transitions run where supported (Chromium, Safari 18+); other browsers navigate normally.

## License

[MIT](LICENSE) © Liu Xiu

Archivo and JetBrains Mono are licensed under the SIL Open Font License 1.1 (see `source/fonts`). Noto Serif SC and Noto Sans SC are licensed under the SIL Open Font License 1.1 and are not included in this repository.
