"use client";

import Link from "next/link";

const CosmicFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ];

  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/knowledge", label: "知识库" },
    { href: "/program", label: "作品集" },
    { href: "/lab", label: "实验室" },
  ];

  return (
    <footer className="relative z-10 mt-20">
      {/* 顶部装饰线 */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#7b2cbf]/50 to-transparent" />
      
      <div className="cosmic-bg py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 主要内容 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Logo 和描述 */}
              <div className="md:col-span-1">
                <Link href="/" className="inline-flex items-center space-x-3 group mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "linear-gradient(135deg, #7b2cbf 0%, #e94560 100%)",
                      boxShadow: "0 4px 20px rgba(123, 44, 191, 0.3)",
                    }}
                  >
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-[#7b2cbf] via-[#e94560] to-[#00d9ff] bg-clip-text text-transparent">
                    Nebula Lucent
                  </span>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  探索技术的星辰大海，记录成长的每一步。在代码的宇宙中，寻找属于自己的星光。
                </p>
              </div>

              {/* 导航链接 */}
              <div className="md:col-span-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#00d9ff] mr-2 animate-pulse" />
                  导航
                </h3>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-[#7b2cbf] dark:hover:text-[#00d9ff] transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 社交链接 */}
              <div className="md:col-span-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#e94560] mr-2 animate-pulse" style={{ animationDelay: "0.5s" }} />
                  联系
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#7b2cbf] hover:to-[#e94560] transition-all duration-300 hover:shadow-lg hover:shadow-[#7b2cbf]/20"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 装饰星星 */}
            <div className="relative h-8 mb-8">
              <div className="absolute left-1/4 top-1/2 w-1 h-1 rounded-full bg-[#f5d042] animate-pulse" />
              <div className="absolute left-1/2 top-0 w-1.5 h-1.5 rounded-full bg-[#00d9ff] animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="absolute right-1/4 top-1/2 w-1 h-1 rounded-full bg-[#e94560] animate-pulse" style={{ animationDelay: "0.6s" }} />
            </div>

            {/* 底部版权和签名 */}
            <div className="border-t border-[#7b2cbf]/10 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  © {currentYear} Nebula Lucent. All rights reserved.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                  Made with
                  <span className="mx-1 text-[#e94560] animate-pulse">♥</span>
                  and
                  <span className="mx-1">✨</span>
                  in the cosmos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CosmicFooter;
