"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/knowledge", label: "知识库" },
    { href: "/program", label: "作品集" },
    { href: "/lab", label: "实验室" },
  ];

  return (
    <nav
      className={`nav-cosmic fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "scrolled" : ""
      }`}
      style={{ position: 'fixed' }}
    >
      {/* 星光边框效果 - 滚动时显示 */}
      <div className={`nav-starlight-border ${isScrolled ? "active" : ""}`} />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with pulse animation */}
          <Link
            href="/"
            className="flex items-center space-x-3 group relative"
          >
            <div className="logo-glow relative">
              {/* Logo脉冲光晕 */}
              <div className="logo-pulse-ring" />
              <div 
                className="relative w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #7b2cbf 0%, #e94560 100%)",
                  boxShadow: "0 4px 20px rgba(123, 44, 191, 0.3)",
                }}
              >
                <span className="text-white font-bold text-xl">N</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-[#7b2cbf] via-[#e94560] to-[#00d9ff] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient group-hover:opacity-80 transition-opacity duration-300">
                Nebula Lucent
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-cosmic relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "active text-[#7b2cbf] dark:text-[#00d9ff]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#7b2cbf] dark:hover:text-[#00d9ff]"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* 星光扩散下划线 */}
                  <span className="nav-link-starlight" />
                  {isActive && (
                    <span 
                      className="absolute inset-0 rounded-lg -z-0"
                      style={{
                        background: "rgba(123, 44, 191, 0.1)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#7b2cbf]/10 transition-colors relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? "rotate-45 translate-y-2 bg-[#e94560]" 
                    : "bg-gray-700 dark:bg-gray-300"
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? "opacity-0" 
                    : "bg-gray-700 dark:bg-gray-300"
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? "-rotate-45 -translate-y-2 bg-[#e94560]" 
                    : "bg-gray-700 dark:bg-gray-300"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-80 opacity-100 pb-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 space-y-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 transform ${
                    isActive
                      ? "text-[#7b2cbf] dark:text-[#00d9ff] scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#7b2cbf] dark:hover:text-[#00d9ff] hover:translate-x-2"
                  }`}
                  style={{
                    background: isActive ? "rgba(123, 44, 191, 0.1)" : "transparent",
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
