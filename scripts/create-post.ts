#!/usr/bin/env node
/**
 * 快速创建新博客文章的工具
 * 用法: npm run create-post "文章标题"
 * 或: npx tsx scripts/create-post.ts "文章标题"
 */

import fs from "fs";
import path from "path";
import readline from "readline";

const postsDirectory = path.join(process.cwd(), "content", "posts");

// 生成 slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 移除特殊字符
    .replace(/\s+/g, "-") // 空格替换为连字符
    .replace(/-+/g, "-") // 多个连字符合并为一个
    .trim();
}

// 生成文件名
function generateFileName(title: string): string {
  const slug = slugify(title);
  const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return `${timestamp}-${slug}.mdx`;
}

// 生成 frontmatter
function generateFrontmatter(title: string): string {
  const now = new Date().toISOString().split("T")[0];
  return `---
title: "${title}"
date: "${now}"
excerpt: ""
tags: []
author: ""
---

# ${title}

开始写作...

`;
}

// 交互式创建文章
async function createPostInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  try {
    const title = await question("请输入文章标题: ");
    if (!title.trim()) {
      console.error("标题不能为空！");
      process.exit(1);
    }

    const excerpt = await question("请输入文章摘要（可选，直接回车跳过）: ");
    const tagsInput = await question("请输入标签，用逗号分隔（可选）: ");
    const author = await question("请输入作者名称（可选，直接回车跳过）: ");

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const fileName = generateFileName(title);
    const filePath = path.join(postsDirectory, fileName);

    if (fs.existsSync(filePath)) {
      console.error(`文件已存在: ${fileName}`);
      process.exit(1);
    }

    // 生成 frontmatter
    const frontmatter = `---
title: "${title}"
date: "${new Date().toISOString().split("T")[0]}"
excerpt: "${excerpt || ""}"
tags: ${tags.length > 0 ? JSON.stringify(tags) : "[]"}
author: "${author || ""}"
---

# ${title}

开始写作...

`;

    // 确保目录存在
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(filePath, frontmatter, "utf8");

    console.log(`\n✅ 文章已创建: ${filePath}`);
    console.log(`\n📝 你可以使用以下编辑器打开：`);
    console.log(`   - VS Code: code ${filePath}`);
    console.log(`   - Typora: typora ${filePath}`);
    console.log(`   - MarkText: marktext ${filePath}`);
    console.log(`\n🔗 访问地址: /posts/${slugify(title)}`);
  } catch (error) {
    console.error("创建文章时出错:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 从命令行参数创建文章
async function createPostFromArgs() {
  const title = process.argv[2];
  if (!title) {
    console.log("使用方法:");
    console.log('  npm run create-post "文章标题"');
    console.log("  或");
    console.log("  npm run create-post");
    console.log("  （交互式创建）");
    process.exit(1);
  }

  const fileName = generateFileName(title);
  const filePath = path.join(postsDirectory, fileName);

  if (fs.existsSync(filePath)) {
    console.error(`文件已存在: ${fileName}`);
    process.exit(1);
  }

  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  // 写入文件
  const frontmatter = generateFrontmatter(title);
  fs.writeFileSync(filePath, frontmatter, "utf8");

  console.log(`✅ 文章已创建: ${filePath}`);
  console.log(`🔗 访问地址: /posts/${slugify(title)}`);
}

// 主函数
async function main() {
  if (process.argv.length > 2) {
    await createPostFromArgs();
  } else {
    await createPostInteractive();
  }
}

main().catch(console.error);
