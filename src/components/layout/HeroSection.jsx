"use client";
import React from "react";
import HeroTextContent from "./HeroTextContent";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-12 place-items-center max-w-5xl mx-auto px-4">
        <HeroTextContent />
        <HeroImage />
      </div>
    </section>
  );
};

export default HeroSection;
