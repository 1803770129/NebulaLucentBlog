import { getAllPosts, type PostMeta } from "@/src/lib/posts";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale/zh-CN";
import Link from "next/link";

export default async function Home() {
  let posts: PostMeta[] = [];
  try {
    posts = getAllPosts();
  } catch (error) {
    console.error("Error loading posts:", error);
    posts = [];
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 头部 */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nebula Lucent Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            一个现代化的个人博客
          </p>
        </header>

        {/* 文章列表 */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                暂无文章，在 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">content/posts</code> 目录下创建文章开始写作吧！
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <time
                    className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0"
                    dateTime={post.date}
                  >
                    {format(new Date(post.date), "yyyy年MM月dd日", {
                      locale: zhCN,
                    })}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>

                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium group"
                >
                  阅读更多
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))
          )}
        </div>

        {/* 页脚 */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Nebula Lucent Blog. 使用 Next.js + MDX 构建</p>
        </footer>
      </div>
    </main>
  );
}
