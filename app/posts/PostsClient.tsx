"use client";

import { type PostMeta } from "@/src/lib/posts";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale/zh-CN";
import Link from "next/link";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import CosmicBackground from "@/components/cosmic/CosmicBackground";

// 获取所有唯一标签
function getAllTags(posts: PostMeta[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

interface PostsClientProps {
  posts: PostMeta[];
}

export default function PostsClient({ posts }: PostsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const allTags = useMemo(() => getAllTags(posts), [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return posts;
    }
    return posts.filter(
      (post) => post.tags && post.tags.includes(selectedTag)
    );
  }, [posts, selectedTag]);

  const getColumnCount = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  const layoutMasonry = useCallback(() => {
    if (!containerRef.current || filteredPosts.length === 0) return;

    const container = containerRef.current;
    const columnCount = getColumnCount();
    const gap = 24;
    const containerWidth = container.offsetWidth;
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;

    itemRefs.current = itemRefs.current.slice(0, filteredPosts.length);
    const columnHeights = new Array(columnCount).fill(0);
    const positions: Array<{ top: number; left: number }> = [];

    itemRefs.current.forEach((item) => {
      if (!item) return;
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const left = shortestColumnIndex * (columnWidth + gap);
      const top = columnHeights[shortestColumnIndex];
      positions.push({ top, left });
      columnHeights[shortestColumnIndex] += item.offsetHeight + gap;
    });

    itemRefs.current.forEach((item, index) => {
      if (!item || !positions[index]) return;
      item.style.position = "absolute";
      item.style.left = `${positions[index].left}px`;
      item.style.top = `${positions[index].top}px`;
      item.style.width = `${columnWidth}px`;
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });

    const maxHeight = Math.max(...columnHeights);
    container.style.height = `${maxHeight}px`;
  }, [filteredPosts]);

  useEffect(() => {
    if (!mounted || filteredPosts.length === 0) return;
    const timer = setTimeout(() => {
      layoutMasonry();
    }, 0);
    return () => clearTimeout(timer);
  }, [filteredPosts, mounted, selectedTag, layoutMasonry]);

  useEffect(() => {
    if (!mounted) return;
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        layoutMasonry();
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [mounted, layoutMasonry]);

  // 随机颜色组合
  const cardColors = [
    { gradient: "from-[#7b2cbf] to-[#e94560]", glow: "rgba(123, 44, 191, 0.3)" },
    { gradient: "from-[#00d9ff] to-[#7b2cbf]", glow: "rgba(0, 217, 255, 0.3)" },
    { gradient: "from-[#e94560] to-[#f5d042]", glow: "rgba(233, 69, 96, 0.3)" },
    { gradient: "from-[#f5d042] to-[#00d9ff]", glow: "rgba(245, 208, 66, 0.3)" },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 宇宙背景 - 增强版 */}
      <CosmicBackground variant="hero" starCount={60} showAurora={true} showOrbs={true} />
      
      {/* 额外装饰层 */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* 角落光晕 */}
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123, 44, 191, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        {/* 头部 - 增强版 */}
        <header className="mb-16 text-center pt-16 relative">
          <div className="relative inline-block">
            {/* 光环效果 */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7b2cbf]/20 via-[#e94560]/20 to-[#00d9ff]/20 rounded-full blur-2xl animate-pulse-slow" />
            
            <h1 className="relative text-5xl md:text-6xl font-bold mb-6 glow-text" data-text="博客文章">
              博客文章
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            探索技术的边界，记录思考的轨迹
          </p>
          
          {/* 装饰性星点 */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i}
                className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                style={{ 
                  background: ["#7b2cbf", "#e94560", "#00d9ff", "#f5d042", "#7b2cbf"][i],
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </header>

        {/* 标签筛选 - 增强版 */}
        {allTags.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSelectedTag(null)}
                className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 overflow-hidden ${
                  selectedTag === null
                    ? "text-white shadow-lg shadow-[#7b2cbf]/30 scale-105"
                    : "bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50 border border-white/20"
                }`}
              >
                {selectedTag === null && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7b2cbf] via-[#e94560] to-[#7b2cbf] bg-[length:200%_100%] animate-gradient" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  全部 ({posts.length})
                </span>
              </button>
              
              {allTags.map((tag, i) => {
                const count = posts.filter((post) => post.tags && post.tags.includes(tag)).length;
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? "text-white shadow-lg scale-105"
                        : "bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:scale-105 border border-white/20"
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 8px 30px ${cardColors[i % 4].glow}` : undefined,
                    }}
                  >
                    {isSelected && (
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${cardColors[i % 4].gradient}`}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-white" : `bg-gradient-to-r ${cardColors[i % 4].gradient}`}`} />
                      {tag} ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 文章列表 */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {selectedTag
                  ? `没有找到标签为 "${selectedTag}" 的文章`
                  : "暂无文章，开始创作吧！"}
              </p>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ minHeight: "400px" }}
          >
            {filteredPosts.map((post, index) => {
              const colorScheme = cardColors[index % 4];
              const isHovered = hoveredIndex === index;
              
              return (
                <article
                  key={post.slug}
                  ref={(el) => {
                    if (el) itemRefs.current[index] = el;
                  }}
                  className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 ${
                    mounted ? "" : "opacity-0"
                  }`}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transitionDelay: `${(index % 6) * 80}ms`,
                    boxShadow: isHovered 
                      ? `0 20px 60px ${colorScheme.glow}, 0 0 0 1px rgba(255,255,255,0.1)` 
                      : "0 4px 30px rgba(0, 0, 0, 0.1)",
                    transform: isHovered ? "translateY(-8px) scale(1.02)" : undefined,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* 渐变边框 */}
                  <div 
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      padding: "1px",
                      background: `linear-gradient(135deg, ${colorScheme.glow}, transparent, ${colorScheme.glow})`,
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  
                  {/* 顶部渐变条 */}
                  <div 
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorScheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  
                  {/* 角落光点 */}
                  <div 
                    className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.glow.replace("0.3", "1")})`,
                      boxShadow: `0 0 10px ${colorScheme.glow}`,
                      animation: "twinkle-bright 3s ease-in-out infinite",
                      animationDelay: `${index * 0.5}s`,
                    }}
                  />

                  <Link href={`/posts/${post.slug}`} className="block p-6 relative z-10">
                    {/* 日期 */}
                    <div className="flex items-center gap-2 mb-3">
                      <time
                        className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase"
                        dateTime={post.date}
                      >
                        {format(new Date(post.date), "yyyy.MM.dd", { locale: zhCN })}
                      </time>
                    </div>

                    {/* 标签 */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${cardColors[tagIndex % 4].glow.replace("0.3", "0.15")}, transparent)`,
                              border: `1px solid ${cardColors[tagIndex % 4].glow.replace("0.3", "0.3")}`,
                              color: cardColors[tagIndex % 4].glow.replace("0.3)", "1)").replace("rgba", "rgb"),
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 标题 */}
                    <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7b2cbf] group-hover:via-[#e94560] group-hover:to-[#00d9ff] transition-all duration-500 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* 摘要 */}
                    {post.excerpt && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {post.excerpt}
                      </p>
                    )}

                    {/* 阅读更多 */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
                        <span>阅读全文</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                          style={{ color: colorScheme.glow.replace("0.3)", "1)").replace("rgba", "rgb") }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      
                      {/* 阅读时间估算 */}
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        约 {Math.max(1, Math.ceil((post.excerpt?.length || 100) / 200))} 分钟
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* 统计信息 - 增强版 */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <div 
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-xl"
              style={{
                background: "rgba(123, 44, 191, 0.1)",
                border: "1px solid rgba(123, 44, 191, 0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7b2cbf] animate-pulse" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {filteredPosts.length} / {posts.length} 篇文章
                </span>
              </div>
              {selectedTag && (
                <>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                  <span className="text-sm text-[#7b2cbf] dark:text-[#00d9ff] font-medium">
                    #{selectedTag}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
