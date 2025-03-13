"use client";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./projects/ProjectsSection";
import AchievementsSection from "./components/AchievementsSection";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const { isDarkMode } = useTheme();
  
  return (
    <main className={`flex min-h-screen flex-col ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 mt-16 sm:mt-20 md:mt-24">
        <HeroSection />
        <AboutSection />
        {/* <AchievementsSection /> */}
        <ProjectsSection />
        <EmailSection />
      </div>
    </main>
  );
}
