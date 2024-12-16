import HeroSection from "./components/HeroSection";
import ProjectsSection from "./projects/ProjectsSection";
import AchievementsSection from "./components/AchievementsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        {/* <AchievementsSection /> /*/}
        <ProjectsSection />
      </div>
    </main>
  );
}
