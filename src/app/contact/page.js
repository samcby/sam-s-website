"use client";
import EmailSection from "@components/EmailSection";
import { useTheme } from '../context/ThemeContext';

export default function ContactPage() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}`}>
      <div className="container mx-auto px-12 py-24">
        <EmailSection />
      </div>
    </div>
  );
}
