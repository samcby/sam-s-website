"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const TabButton = ({ children, selectTab, active }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.button
      onClick={selectTab}
      className={`relative px-4 py-2 rounded-lg text-sm sm:text-base font-medium 
                 transition-all duration-300 ease-in-out
                 ${
                   active
                     ? isDarkMode
                       ? "bg-gradient-to-r from-[#58a6ff] to-[#3178c6] text-white shadow-lg"
                       : "bg-gradient-to-r from-[#2075c7] to-[#1d4ed8] text-white shadow-md"
                     : isDarkMode
                     ? "text-[#93a1a1] hover:text-white hover:bg-[#586e75]/20"
                     : "text-[#586e75] hover:text-[#2075c7] hover:bg-[#93a1a1]/10"
                 }
                 ${active ? "transform-none" : "hover:-translate-y-0.5"}
                 focus:outline-none focus:ring-2 
                 ${
                   isDarkMode
                     ? "focus:ring-[#58a6ff]/50"
                     : "focus:ring-[#2075c7]/50"
                 }`}
      whileHover={{ scale: active ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={false}
      animate={{
        y: active ? -2 : 0,
        transition: { duration: 0.2 },
      }}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-20"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default TabButton;
