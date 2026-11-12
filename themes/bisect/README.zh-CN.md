# Bisect · 二分

**一条线，两种颜色。** 一个蓝白分割的 [Hexo](https://hexo.io) 主题。

[English](README.md) · [在线预览](https://blog.liuxiu.us) · [反馈问题](https://github.com/LiuXiu233/hexo-theme-bisect/issues)

Bisect 只有一个视觉主角：一条贯穿全站的分界线。它把首页切成白和蓝两半，在文章页记录你读到了哪里，翻页时扫过屏幕，切换深浅色时把整站翻面。其余的一切都保持安静，让文字本身被读完。

## 特性

- **可以拖动的分界线。** 首页一半白、一半蓝，站点标题横跨分界线，两侧颜色相反。可以拖动手柄，也可以用方向键调整。
- **一张索引，而不是信息流。** 全部文章在一张列表里，按年份分组，可按分类筛选。鼠标悬停时蓝色划过整行，右侧浮出封面。
- **任何图片都是一套视觉。** 列表里的封面统一处理成蓝白双色调，照片、插画、截图放在一起也不打架；点进文章后恢复原色。
- **生成式封面。** 没有配图的文章，按标题生成一张蓝白构图。同一个标题永远得到同一张图。
- **阅读工具。** 左白右蓝的文章头部、阅读进度线和实时目录、章节编号、图片编号与说明、点击放大、代码块一键复制。
- **中文排版。** 中西文自动间距、标点挤压、着重号；指定分类的文章正文使用宋体。
- **深浅两色。** 跟随系统，也可以手动切换。切换和翻页时，一道蓝色从左切到右。
- **⌘K / Ctrl+K 命令面板。** 搜索标题、正文、标签，也可以输入命令：`>theme`、`>random`、`>top`、`>archive`。
- **照实的归档。** 没写文章的年份也留在时间轴上；标签按首字母（中文按拼音）排成书后索引。
- **常用功能都在。** utterances 或 giscus 评论、Chatra 在线聊天、赞赏码、CC 许可声明、Mermaid 图表、RSS。
- **多语言。** 简体中文、繁體中文、English。
- **没有框架，不需要构建。** 纯 HTML、CSS、JavaScript。关掉脚本也能完整阅读；尊重系统的「减少动态效果」设置。

## 安装

需要 Hexo 7 及以上版本和 EJS 渲染器（新建的 Hexo 站点默认已安装）。

```bash
git clone https://github.com/LiuXiu233/hexo-theme-bisect themes/bisect
```

然后在站点的 `_config.yml` 里启用：

```yaml
theme: bisect
```

### 推荐插件

```bash
npm install hexo-generator-searchdb hexo-generator-feed hexo-generator-sitemap
```

搜索依赖 `hexo-generator-searchdb` 生成的索引，在站点 `_config.yml` 里加上：

```yaml
search:
  path: search.xml
  field: post
  content: true
  format: html
```

### 推荐的站点设置

首页被设计成一张完整的文章索引。分页依然可用，但不分页效果最好：

```yaml
per_page: 0
index_generator:
  path: ''
  per_page: 0
  order_by: -date
```

站点的 `subtitle` 会作为口号，显示在首页和页脚的蓝色一侧。

### 标签、分类与关于页

```bash
hexo new page tags        # 在 front matter 里加上 type: tags
hexo new page categories  # 在 front matter 里加上 type: categories
hexo new page about
```

## 配置

把 `themes/bisect/_config.yml` 复制到站点根目录，命名为 `_config.bisect.yml`，在这份副本里修改。这样更新主题时，你的设置不会被覆盖。

| 选项 | 作用 |
| --- | --- |
| `nav` | 导航。用 `key` 使用内置的多语言标签，或用 `name` / `sub` 自定义。 |
| `hero` | 首页分割屏：`title`、`eyebrow`、`intro`，以及分界线默认位置 `split`（40–80）。 |
| `slogan_sub` | 口号下方的第二行，比如副标题的英文。 |
| `category_sub` | 分类的副标签，比如 `{ 写作: Writing }`。 |
| `serif_categories` | 这些分类下的文章使用宋体正文。 |
| `fonts` | 中文字体的来源，见下文。 |
| `social`、`sites` | 页脚链接。 |
| `creative_commons`、`reward`、`follow_me` | 文末信息。 |
| `comments` | `utterances`、`giscus` 或 `none`。 |
| `chatra`、`mermaid` | 附加功能，默认关闭或按需加载。 |

### 字体

Archivo 与 JetBrains Mono 随主题附带。中文字体是思源宋体与思源黑体 Heavy（Noto Serif SC / Noto Sans SC），用 `fonts.cjk` 选择加载方式：

- `google`（默认）：从 Google Fonts 加载。如果读者主要在中国大陆，把 `fonts.host` 换成镜像，比如 `https://fonts.loli.net`。
- `local`：完全自托管。运行一次下面的命令，再把它在 `source/` 里生成的文件一起提交：

  ```bash
  hexo bisect-fonts
  ```

  字体按 `unicode-range` 切片，每个页面只下载用到的字。
- `system`：只使用读者的系统字体。

### Front matter

| 字段 | 作用 |
| --- | --- |
| `cover` | 封面图。没有时依次使用 `photos[0]`、正文第一张图、生成式封面。 |
| `description` | 列表和文章头部显示的摘要，没有时使用 `<!-- more -->` 之前的内容。 |
| `body_font` | `serif` 或 `sans`，优先于 `serif_categories`。 |
| `comments: false` | 这篇文章不显示评论。 |
| `reward: false` | 这篇文章不显示赞赏按钮。 |

## 浏览器支持

Chrome、Edge、Safari、Firefox 的当前版本。支持视图转场的浏览器（Chromium、Safari 18+）会显示「一刀切」效果，其他浏览器正常跳转。

## 许可

[MIT](LICENSE) © 刘秀

Archivo 与 JetBrains Mono 使用 SIL Open Font License 1.1（见 `source/fonts`）。思源宋体与思源黑体（Noto Serif SC / Noto Sans SC）使用 SIL Open Font License 1.1，不包含在本仓库中。
