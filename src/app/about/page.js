"use client";
import AboutSection from "@components/AboutSection";
import { useTheme } from '../context/ThemeContext';

export default function AboutPage() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}`}>
      <div className="container mx-auto px-12 py-4">
        <AboutSection />
      </div>
    </div>
  );
}
