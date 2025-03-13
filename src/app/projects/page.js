"use client";
import ProjectsSection from "@/app/projects/ProjectsSection";
import { useTheme } from '../context/ThemeContext';

export default function ProjectPage() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}`}>
      <div className="container mx-auto px-12 py-4">
        <ProjectsSection />
      </div>
    </div>
  );
}
