"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FrontendQuadrant } from "./quadrants/FrontendQuadrant";
import { BackendQuadrant } from "./quadrants/BackendQuadrant";
import { DatabaseQuadrant } from "./quadrants/DatabaseQuadrant";
import { DevopsQuadrant } from "./quadrants/DevopsQuadrant";

function SkillCircle() {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center px-4 sm:px-8 md:px-16 py-8 sm:py-12 overflow-hidden">
      {/* 背景圆环 */}
      {[100, 150, 200].map((radius, index) => (
        <motion.div
          key={radius}
          className={`absolute border ${
            isDarkMode
              ? "border-[#586e75] border-opacity-40"
              : "border-[#93a1a1] border-opacity-60"
          } rounded-full`}
          style={{
            width: radius * 2,
            height: radius * 2,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        />
      ))}

      {/* 分区线 */}
      <motion.div
        className={`absolute w-[90%] h-[1px] ${
          isDarkMode
            ? "bg-[#586e75] bg-opacity-40"
            : "bg-[#93a1a1] bg-opacity-60"
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className={`absolute w-[1px] h-[90%] ${
          isDarkMode
            ? "bg-[#586e75] bg-opacity-40"
            : "bg-[#93a1a1] bg-opacity-60"
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1 }}
      />

      {/* 对角线 */}
      <motion.div
        className={`absolute w-[0.5px] h-[90%] origin-center rotate-45 ${
          isDarkMode
            ? "bg-[#586e75] bg-opacity-20"
            : "bg-[#93a1a1] bg-opacity-20"
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className={`absolute w-[0.5px] h-[90%] origin-center -rotate-45 ${
          isDarkMode
            ? "bg-[#586e75] bg-opacity-20"
            : "bg-[#93a1a1] bg-opacity-20"
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* 添加中心点 */}
      <motion.div
        className={`absolute w-2 h-2 rounded-full ${
          isDarkMode
            ? "bg-[#586e75] bg-opacity-60"
            : "bg-[#93a1a1] bg-opacity-60"
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* 象限组件 */}
      <FrontendQuadrant isDarkMode={isDarkMode} />
      <BackendQuadrant isDarkMode={isDarkMode} />
      <DatabaseQuadrant isDarkMode={isDarkMode} />
      <DevopsQuadrant isDarkMode={isDarkMode} />

      {/* 分类标签 */}
      <motion.div
        className={`absolute bottom-0 left-0 text-sm font-medium ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        DATABASES
      </motion.div>
      <motion.div
        className={`absolute bottom-0 right-0 text-sm font-medium ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        DEVOPS & TOOLS
      </motion.div>
      <motion.div
        className={`absolute top-0 left-0 text-sm font-medium ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        FRONTEND
      </motion.div>
      <motion.div
        className={`absolute top-0 right-0 text-sm font-medium ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        BACKEND
      </motion.div>
    </div>
  );
}

export { SkillCircle as default };
