"use client";
import ProjectsSection from "@/app/projects/ProjectsSection";
import PageTitle from "@components/PageTitle";
import PageContainer from "@components/PageContainer";

export default function ProjectPage() {
  return (
    <PageContainer>
      <PageTitle title="My Projects" />
      <div className="container mx-auto px-4">
        <ProjectsSection />
      </div>
    </PageContainer>
  );
}
