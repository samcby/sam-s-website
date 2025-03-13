"use client";
import React, { useRef } from "react";
import Interests from "./Interest";
import { useTheme } from '../context/ThemeContext';

export default function HobbiesPage() {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}`}>
      <div
        ref={containerRef}
        className="relative mx-auto py-8 px-4 h-[calc(100vh-4rem)] overflow-hidden"
      >
        <Interests containerRef={containerRef} />
      </div>
    </div>
  );
}
