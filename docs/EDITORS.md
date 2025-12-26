# Markdown 编辑器推荐

写博客文章时，推荐使用以下 Markdown 编辑器，它们都支持实时预览：

## 🌟 推荐编辑器

### 1. **Typora**（最推荐）⭐
- **价格**: 付费（$14.99，一次性购买）
- **平台**: Windows、macOS、Linux
- **特点**:
  - 所见即所得（WYSIWYG）
  - 支持数学公式、表格、代码高亮
  - 界面简洁美观
  - 导出多种格式
- **下载**: https://typora.io/

### 2. **MarkText**（免费）⭐
- **价格**: 免费开源
- **平台**: Windows、macOS、Linux
- **特点**:
  - 实时预览
  - 支持表格、数学公式
  - 多种主题
  - 完全免费
- **下载**: https://marktext.app/

### 3. **Obsidian**（功能强大）⭐
- **价格**: 免费（个人使用）
- **平台**: Windows、macOS、Linux、移动端
- **特点**:
  - 强大的笔记管理功能
  - 支持插件扩展
  - 双向链接
  - 图谱视图
  - 可本地存储或云端同步
- **下载**: https://obsidian.md/

### 4. **VS Code 扩展**（在开发环境中编辑）
如果你习惯在 VS Code 中工作，可以安装以下扩展：

**推荐扩展**:
- **Markdown Preview Enhanced**: 强大的预览和导出功能
- **Markdown All in One**: 快捷键、目录生成等
- **Markdown Preview GitHub Styling**: GitHub 风格的预览

**安装方式**:
```bash
# 在 VS Code 中按 Ctrl+Shift+X，搜索并安装：
# - Markdown Preview Enhanced
# - Markdown All in One
```

### 5. **在线编辑器**
- **StackEdit**: https://stackedit.io/
- **Dillinger**: https://dillinger.io/
- **HackMD**: https://hackmd.io/

## 🚀 快速创建文章

### 使用 CLI 工具

项目已包含快速创建文章的脚本：

```bash
# 交互式创建
npm run create-post

# 直接创建（指定标题）
npm run create-post "我的新文章"
```

这将自动：
- 生成文件（带日期前缀）
- 创建 frontmatter 模板
- 生成正确的 slug

## 📝 使用建议

1. **日常写作**: 推荐使用 **Typora** 或 **MarkText**
   - 实时预览
   - 专注写作体验

2. **笔记管理**: 推荐使用 **Obsidian**
   - 适合长期维护博客
   - 支持知识图谱

3. **快速编辑**: 使用 **VS Code**
   - 如果已经在开发环境
   - 适合小修改

4. **协作编辑**: 使用 **在线编辑器**
   - 多人协作场景
   - 需要分享预览链接时

## 💡 使用技巧

### Typora 设置
1. 打开文件 → 偏好设置 → 编辑器
2. 启用 "自动保存"
3. 设置默认打开目录为 `content/posts`

### MarkText 设置
1. 文件 → 首选项 → 编辑器
2. 启用自动保存
3. 可以设置默认字体和主题

### Obsidian 设置
1. 设置 → 文件与链接
2. 将笔记存储位置设置为 `content/posts`
3. 安装 "Markdown Post" 插件（可选）

## 🔗 相关资源

- [Markdown 语法指南](https://www.markdownguide.org/)
- [Markdown 数学公式](https://www.mathjax.org/)
- [Emoji 列表](https://emojipedia.org/)
