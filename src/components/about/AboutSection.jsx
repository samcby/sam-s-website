"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TabButton from "@/components/ui/TabButton";
import TabDataContent from "@/data/tabData";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { MdWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { FaGraduationCap, FaCertificate, FaTrophy } from "react-icons/fa";

const AboutSection = () => {
  const [tab, setTab] = useState("experience");
  const [isPending, startTransition] = useTransition();
  const { isDarkMode } = useTheme();
  const TAB_DATA = TabDataContent();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section
      id="about"
      className={`flex flex-col gap-6 sm:gap-8 relative items-center theme-text ${
        isDarkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        {/* Content area - Image and text side by side */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Image area */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-full max-w-[300px] relative rounded-xl overflow-hidden theme-shadow">
              <Image
                src="/images/selfies.jpeg"
                alt="Rick Yang"
                width={300}
                height={300}
                priority
                className="w-full h-auto rounded-xl transition-transform duration-300 hover:scale-105"
                unoptimized
              />
            </div>
          </div>

          {/* Text area */}
          <div className="md:col-span-8 w-full">
            <h3 className="text-xl font-bold mb-4 theme-primary">About Me</h3>

            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-left leading-relaxed">
              <p>
                I am <span className="font-semibold">Rick Yang</span>, a
                passionate Full Stack Developer with a strong foundation in
                Computer Science, holding a B.S. and pursuing an M.S. from UCLA.
                I came from Canton, 🇨🇳, and I am currently living in Los
                Angeles, CA, 🇺🇸. I can speak Cantonese, Mandarin, and English,
                and currently learning Japanese.
              </p>

              <p>
                I specialize in creating dynamic, scalable, and user-focused web
                and mobile applications using technologies such as{" "}
                <span className="font-medium theme-primary">
                  React, Vue, Angular, Redux, Node.js, Express, Spring Boot,
                  PostgreSQL, and MongoDB
                </span>
                , etc.. My expertise spans front-end and back-end development,
                complemented by a solid understanding of software architecture
                and machine learning.
              </p>

              <p>
                I have multiple hands-on internship experience in different{" "}
                <span className="font-semibold theme-secondary">BIG TECH</span>{" "}
                companies like
                <span className="font-semibold theme-accent">
                  {" "}
                  Alibaba, ByteDance, and Nvidia
                </span>
                .
              </p>

              <p>
                Beyond coding, I&apos;m a DJ🎵, an avid traveler 🌠 (10+
                countries this year), a furry lover 🐱🐶, a designer 🎨, and a
                strategic gamer 🎮. I balance my technical pursuits with fitness
                and outdoor activities.
              </p>
              <p className="mt-3 text-sm italic theme-primary">
                <Link
                  href="/hobbies"
                  className="cursor-pointer hover:underline"
                >
                  Know more about my hobbies →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px my-8 theme-divider"></div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full">
          <TabButton
            selectTab={() => handleTabChange("experience")}
            active={tab === "experience"}
          >
            <span className="flex items-center gap-1.5">
              <MdWork className="text-lg" />
              <span>Experience</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("skills")}
            active={tab === "skills"}
          >
            <span className="flex items-center gap-1.5">
              <GiSkills className="text-lg" />
              <span>Skills</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("education")}
            active={tab === "education"}
          >
            <span className="flex items-center gap-1.5">
              <FaGraduationCap className="text-lg" />
              <span>Education</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("certifications")}
            active={tab === "certifications"}
          >
            <span className="flex items-center gap-1.5">
              <FaCertificate className="text-lg" />
              <span>Certifications</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("awards")}
            active={tab === "awards"}
          >
            <span className="flex items-center gap-1.5">
              <FaTrophy className="text-lg" />
              <span>Awards</span>
            </span>
          </TabButton>
        </div>

        {/* Tab content with card style */}
        <motion.div
          className="mt-6 sm:mt-8 w-full p-4 sm:p-6 rounded-xl theme-card theme-shadow theme-border border"
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {TAB_DATA.find((t) => t.id === tab)?.content}
        </motion.div>
      </div>

      {/* CSS变量 */}
      <style jsx global>{`
        /* 浅色主题 */
        .light-theme {
          --color-primary: #2075c7;
          --color-secondary: #6236ff;
          --color-accent: #e05252;
          --color-text: #24292f;
          --color-muted: #57606a;
          --color-bg: #f6f8fa;
          --color-card-bg: #eee8d5;
          --color-border: #d0d7de;
          --color-divider: #d8dee4;
          --shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
        }

        /* 深色主题 */
        .dark-theme {
          --color-primary: #58a6ff;
          --color-secondary: #d2a8ff;
          --color-accent: #ff7b72;
          --color-text: #e6edf3;
          --color-muted: #8b949e;
          --color-bg: #0d1117;
          --color-card-bg: #161b22;
          --color-border: #30363d;
          --color-divider: #30363d;
          --shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
        }

        /* 应用CSS变量的工具类 */
        .theme-text {
          color: var(--color-text);
        }
        .theme-primary {
          color: var(--color-primary);
        }
        .theme-secondary {
          color: var(--color-secondary);
        }
        .theme-accent {
          color: var(--color-accent);
        }
        .theme-muted {
          color: var(--color-muted);
        }
        .theme-bg {
          background-color: var(--color-bg);
        }
        .theme-card {
          background-color: var(--color-card-bg);
        }
        .theme-border {
          border-color: var(--color-border);
        }
        .theme-divider {
          background-color: var(--color-divider);
        }
        .theme-shadow {
          box-shadow: var(--shadow);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
