"use client";
import AboutSection from "@components/AboutSection";
import PageTitle from "@components/PageTitle";
import PageContainer from "@components/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer>
      <PageTitle title="About Me" />
      <div className="container mx-auto px-4">
        <AboutSection />
      </div>
    </PageContainer>
  );
}
