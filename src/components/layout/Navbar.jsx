"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import NavLink from "@/components/layout/NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "@/components/layout/MenuOverlay";
import Logo from "@/components/layout/Logo";
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const navLinks = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Hobbies",
    path: "/hobbies",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300
                ${isDarkMode 
                  ? 'border-t-[#586e75] bg-[#00212b] text-[#93a1a1]' 
                  : 'border-t-[#93a1a1] bg-[#eee8d5] text-[#586e75]'}`}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between px-3 py-0.5 md:py-1">
        {/* Logo */}
        <Link
          href={"/"}
          className={`text-xl md:text-4xl font-semibold transition-colors duration-300
                     ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'}`}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <NavLink key={index} href={link.path} title={link.title} />
          ))}
        </div>

        {/* 右侧工具栏 */}
        <div className="hidden md:flex items-center">
          {/* 社交媒体链接 */}
          <div className="flex items-center gap-8 mr-6">
            <motion.a
              href="https://github.com/samcby"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300
                ${isDarkMode 
                  ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                  : 'text-[#586e75] hover:text-[#002b36]'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/bingyu-chen-b85b36324/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300
                ${isDarkMode 
                  ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                  : 'text-[#586e75] hover:text-[#002b36]'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.a>

            <motion.a
              href="https://orcid.org/my-orcid?orcid=0009-0002-0844-408X"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300
                ${isDarkMode 
                  ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                  : 'text-[#586e75] hover:text-[#002b36]'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 1024 1024"
              >
                <path d="M373.7 709.3h-50.4V358.5h50.4v350.8zm74-350.8h136.2c129.7 0 186.7 92.7 186.7 175.5 0 90.1-70.4 175.5-186 175.5H447.7v-351zm50.4 305.6h80.2c114.3 0 140.5-86.8 140.5-130 0-70.4-44.9-130-143.1-130h-77.6v260zM381.6 285.5c0 18-14.7 33.1-33.1 33.1-18.3 0-33.1-15.1-33.1-33.1 0-18.3 14.7-33.1 33.1-33.1 18.3 0 33.1 15.1 33.1 33.1z"/>
              </svg>
            </motion.a>
          </div>

          {/* 暗色模式切换按钮 */}
          <motion.button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2
              ${isDarkMode 
                ? 'bg-[#00212b] border-[#586e75] text-[#93a1a1]' 
                : 'bg-[#eee8d5] border-[#93a1a1] text-[#586e75]'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">
              {isDarkMode ? 'Dark' : 'Light'}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isDarkMode ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* 移动端菜单按钮 */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className={`p-2 rounded-lg border-2 transition-colors duration-300
                      ${isDarkMode 
                        ? 'border-[#586e75] text-[#93a1a1] hover:border-[#93a1a1]' 
                        : 'border-[#93a1a1] text-[#586e75] hover:border-[#586e75]'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {navbarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {navbarOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden ${
            isDarkMode ? 'bg-[#00212b]/95' : 'bg-[#eee8d5]/95'
          }`}
        >
          <div className="flex flex-col items-center py-2">
            {/* 导航链接 */}
            <div className="w-full flex flex-col items-center">
              {navLinks.map((link, index) => (
                <div 
                  key={index} 
                  className={`text-center py-1.5 hover:bg-opacity-10 hover:bg-white w-full
                    ${isDarkMode 
                      ? 'hover:text-[#fdf6e3]' 
                      : 'hover:text-[#002b36]'}`}
                  onClick={() => setNavbarOpen(false)}
                >
                  <Link 
                    href={link.path}
                    className={`block text-base font-medium transition-colors duration-300
                      ${isDarkMode 
                        ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                        : 'text-[#586e75] hover:text-[#002b36]'}`}
                  >
                    {link.title}
                  </Link>
                </div>
              ))}
            </div>

            {/* 分隔线 */}
            <div className={`w-full h-[1px] my-1 ${isDarkMode ? 'bg-[#586e75]' : 'bg-[#93a1a1]'} opacity-30`}></div>

            {/* 社交媒体链接和主题切换 */}
            <div className="flex items-center justify-center gap-8 py-1.5 px-4">
              <motion.button
                onClick={toggleTheme}
                className={`transition-colors duration-300
                  ${isDarkMode 
                    ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                    : 'text-[#586e75] hover:text-[#002b36]'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isDarkMode ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    />
                  )}
                </svg>
              </motion.button>
              {/* GitHub */}
              <motion.a
                href="https://github.com/samcby"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300
                  ${isDarkMode 
                    ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                    : 'text-[#586e75] hover:text-[#002b36]'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/bingyu-chen-b85b36324/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300
                  ${isDarkMode 
                    ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                    : 'text-[#586e75] hover:text-[#002b36]'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </motion.a>
              {/* Instagram */}
              <motion.a
                href="https://orcid.org/my-orcid?orcid=0009-0002-0844-408X"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300
                  ${isDarkMode 
                    ? 'text-[#93a1a1] hover:text-[#fdf6e3]' 
                    : 'text-[#586e75] hover:text-[#002b36]'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M373.7 709.3h-50.4V358.5h50.4v350.8zm74-350.8h136.2c129.7 0 186.7 92.7 186.7 175.5 0 90.1-70.4 175.5-186 175.5H447.7v-351zm50.4 305.6h80.2c114.3 0 140.5-86.8 140.5-130 0-70.4-44.9-130-143.1-130h-77.6v260zM381.6 285.5c0 18-14.7 33.1-33.1 33.1-18.3 0-33.1-15.1-33.1-33.1 0-18.3 14.7-33.1 33.1-33.1 18.3 0 33.1 15.1 33.1 33.1z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
