"use client";
import EmailSection from "@components/EmailSection";
import PageTitle from "@components/PageTitle";
import PageContainer from "@components/PageContainer";

export default function ContactPage() {
  return (
    <PageContainer>
      <PageTitle title="Contact Me" />
      <div className="container mx-auto px-4">
        <EmailSection />
      </div>
    </PageContainer>
  );
}
