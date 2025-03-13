"use client";
import dynamic from 'next/dynamic';
import HeroSection from "./components/HeroSection";
import { useTheme } from './context/ThemeContext';

// 动态导入非关键组件
const ProjectsSection = dynamic(() => import("./projects/ProjectsSection"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const AboutSection = dynamic(() => import("./components/AboutSection"), {
  loading: () => <div>Loading...</div>
});

const EmailSection = dynamic(() => import("./components/EmailSection"), {
  loading: () => <div>Loading...</div>
});

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
