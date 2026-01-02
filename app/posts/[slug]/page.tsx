import { getAllPostSlugs, getPostBySlug } from "@/src/lib/posts";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale/zh-CN";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import "highlight.js/styles/github-dark.css";
import CosmicBackground from "@/components/cosmic/CosmicBackground";

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "文章未找到" };
  }

  return {
    title: `${post.title} | Nebula Lucent Blog`,
    description: post.excerpt || post.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <main className="min-h-screen relative">
      <CosmicBackground variant="subtle" starCount={40} showAurora={true} />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* 返回按钮 */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#7b2cbf] dark:hover:text-[#00d9ff] transition-all duration-300 group mb-8 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回文章列表
        </Link>

        {/* 文章容器 */}
        <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* 顶部装饰条 */}
          <div className="h-1 bg-gradient-to-r from-[#7b2cbf] via-[#e94560] to-[#00d9ff]" />
          
          <div className="p-8 md:p-12 lg:p-16">
            {/* 文章头部 */}
            <header className="mb-12">
              {/* 标签 */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 标题 */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* 元信息 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-700">
                <time dateTime={post.date} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {format(new Date(post.date), "yyyy年MM月dd日", { locale: zhCN })}
                </time>
                {post.author && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {post.author}
                  </span>
                )}
              </div>
            </header>

            {/* 文章内容 - 飞书风格 */}
            <div className="feishu-doc">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // 标题
                  h1: ({ children }: { children?: React.ReactNode }) => (
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }: { children?: React.ReactNode }) => (
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }: { children?: React.ReactNode }) => (
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }: { children?: React.ReactNode }) => (
                    <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200 mt-5 mb-2">
                      {children}
                    </h4>
                  ),
                  // 段落
                  p: ({ children }: { children?: React.ReactNode }) => (
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-7 my-4">
                      {children}
                    </p>
                  ),
                  // 链接
                  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
                    <a 
                      href={href} 
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-300 dark:decoration-blue-600 underline-offset-2 transition-colors"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                  // 无序列表
                  ul: ({ children }: { children?: React.ReactNode }) => (
                    <ul className="my-4 space-y-2 pl-0 list-none">
                      {children}
                    </ul>
                  ),
                  // 有序列表
                  ol: ({ children }: { children?: React.ReactNode }) => (
                    <ol className="my-4 space-y-2 pl-0 list-none">
                      {children}
                    </ol>
                  ),
                  // 列表项
                  li: ({ children }: { children?: React.ReactNode }) => (
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2.5"></span>
                      <span className="flex-1 leading-7">{children}</span>
                    </li>
                  ),
                  // 引用块
                  blockquote: ({ children }: { children?: React.ReactNode }) => (
                    <blockquote className="my-6 pl-4 py-3 border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                      <div className="text-gray-700 dark:text-gray-300 italic">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  // 代码
                  pre: ({ children }: { children?: React.ReactNode }) => {
                    // 从 children 中提取语言信息
                    let language = 'code';
                    if (children && typeof children === 'object' && 'props' in (children as React.ReactElement)) {
                      const codeElement = children as React.ReactElement<{ className?: string }>;
                      const className = codeElement.props?.className || '';
                      const match = /language-(\w+)/.exec(className);
                      if (match) {
                        language = match[1];
                      }
                    }
                    
                    return (
                      <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            <span className="w-3 h-3 rounded-full bg-green-400"></span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase">{language}</span>
                        </div>
                        <pre className="p-4 bg-gray-900 overflow-x-auto text-sm leading-6">
                          {children}
                        </pre>
                      </div>
                    );
                  },
                  code: ({ className, children, ...props }: CodeProps) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="px-1.5 py-0.5 mx-0.5 text-sm font-mono bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 rounded" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={`${className || ''}`} {...props}>
                        {children}
                      </code>
                    );
                  },
                  // 图片
                  img: ({ src, alt }: { src?: string; alt?: string }) => (
                    <figure className="my-8">
                      <img 
                        src={src} 
                        alt={alt || ''} 
                        className="w-full rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                      />
                      {alt && (
                        <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
                  // 表格
                  table: ({ children }: { children?: React.ReactNode }) => (
                    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                      <table className="w-full text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }: { children?: React.ReactNode }) => (
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      {children}
                    </thead>
                  ),
                  th: ({ children }: { children?: React.ReactNode }) => (
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      {children}
                    </th>
                  ),
                  td: ({ children }: { children?: React.ReactNode }) => (
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                      {children}
                    </td>
                  ),
                  // 分割线
                  hr: () => (
                    <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                  ),
                  // 强调
                  strong: ({ children }: { children?: React.ReactNode }) => (
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }: { children?: React.ReactNode }) => (
                    <em className="italic text-gray-700 dark:text-gray-300">
                      {children}
                    </em>
                  ),
                  // 删除线
                  del: ({ children }: { children?: React.ReactNode }) => (
                    <del className="text-gray-400 line-through">
                      {children}
                    </del>
                  ),
                } as unknown as Components}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* 页脚导航 */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md transition-all group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文章列表
          </Link>
        </div>
      </div>
    </main>
  );
}
