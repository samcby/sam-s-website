"use client";
import Image from "next/image";
import TimelineDynamics from "@/components/experience/TimelineDynamics";
import { useTheme } from "@/context/ThemeContext";
import SkillCircle from "@/components/skills/SkillCircle";
import { educationData } from "@/data/educationData";
import { FaGraduationCap, FaCalendarAlt, FaBook } from "react-icons/fa";
import { BsAward, BsSearch } from "react-icons/bs";
import { GiAchievement } from "react-icons/gi";

const cardStyle = (isDarkMode) => `
  p-6 rounded-lg
  ${
    isDarkMode
      ? "bg-[#1a1f24] hover:bg-[#1f252c]"
      : "bg-[#f0f0f0] hover:bg-[#e6e6e6]"
  }
  ${
    isDarkMode
      ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      : "shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
  }
`;

const TabDataContent = () => {
  const { isDarkMode } = useTheme();
  
  const TAB_DATA = [
    {
      title: "Experience",
      id: "experience",
      content: (
        <div className="flex flex-col items-center justify-center w-full overflow-visible min-h-[500px]">
          <TimelineDynamics />
        </div>
      ),
    },
/*     {
      title: "Skills",
      id: "skills",
      content: (
        <div className="flex justify-center items-center w-full">
          <SkillCircle />
        </div>
      ),
    }, */
    {
      title: "Education",
      id: "education",
      content: (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 sm:px-6">
          <div className="relative group w-full flex justify-center mb-8">
          <Image
              src={
                isDarkMode
                  ? "/images/UCLA_Samueli_CS_block_cmyk_rev.svg"
                  : "/images/UCLA_Samueli_CS_block_cmyk.svg"
              }
              alt="UCLA School of Engineering"
            width={300}
            height={300}
              className="rounded-lg w-full max-w-[250px] sm:max-w-[300px] transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
              priority
            />
          </div>

          <div className="w-full space-y-4 sm:space-y-6" role="list">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`${cardStyle(
                  isDarkMode
                )} transform transition-all duration-300 hover:translate-x-2 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none`}
                role="listitem"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaGraduationCap
                    className={`text-xl ${
                      isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                    }`}
                  />
                  <h3
                    className={`text-lg font-bold
                    ${isDarkMode ? "text-white" : "text-[#002b36]"}`}
                    id={`degree-${index}`}
                  >
                    {edu.degree}
                  </h3>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-[#93a1a1]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-[#93a1a1]"
                      }`}
                      aria-label="Study period"
                    >
                      {edu.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GiAchievement
                      className={`text-base ${
                        isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium
                      ${isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"}`}
                      aria-label="Grade Point Average"
                    >
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaBook
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-[#586e75]"
                      }`}
                    />
                    <h4
                      className={`text-sm font-semibold
                      ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                      id={`courses-${index}`}
                    >
                      Key Courses
                    </h4>
                  </div>
                  <div
                    className="grid grid-cols-1 gap-[0.5rem] pl-6"
                    role="list"
                    aria-labelledby={`courses-${index}`}
                  >
                    {edu.courses.map((course, idx) => (
                      <div
                        key={idx}
                        className={`text-sm py-[0.4rem] px-2 rounded relative
                          ${
                            isDarkMode
                              ? "bg-[#232930] text-gray-300"
                              : "bg-[#e6e6e6] text-[#586e75]"
                          }
                          before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2
                          before:w-1.5 before:h-1.5 before:rounded-full
                          ${
                            isDarkMode
                              ? "before:bg-gray-500"
                              : "before:bg-[#93a1a1]"
                          }`}
                        role="listitem"
                      >
                        {typeof course === "string" ? (
                          course
                        ) : (
                          <div>
                            <div className="flex justify-between items-center">
                              <span>{course.name}</span>
                              <span
                                className={`text-xs font-medium ml-2 px-2 py-0.5 rounded flex items-center gap-1
                                ${
                                  isDarkMode
                                    ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                    : "bg-[#2075c7]/20 text-[#2075c7]"
                                }`}
                                aria-label="Course achievement"
                              >
                                <GiAchievement className="text-xs" />
                                {course.achievement}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {edu.teachingExperience && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <GiAchievement
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-[#586e75]"
                        }`}
                      />
                      <h4
                        className={`text-sm font-semibold
                        ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                        id={`teaching-${index}`}
                      >
                        Teaching Experience
                      </h4>
                    </div>
                    <div
                      className="grid grid-cols-1 gap-[0.5rem] pl-6"
                      role="list"
                      aria-labelledby={`teaching-${index}`}
                    >
                      {edu.teachingExperience.map((exp, idx) => (
                        <div
                          key={idx}
                          className={`text-sm py-[0.4rem] px-2 rounded relative
                            ${
                              isDarkMode
                                ? "bg-[#232930] text-gray-300"
                                : "bg-[#e6e6e6] text-[#586e75]"
                            }
                            before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2
                            before:w-1.5 before:h-1.5 before:rounded-full
                            ${
                              isDarkMode
                                ? "before:bg-gray-500"
                                : "before:bg-[#93a1a1]"
                            }`}
                          role="listitem"
                        >
                          <div className="flex justify-between items-center">
                            <span>{exp.course}</span>
                            <span
                              className={`text-xs font-medium ml-2 px-2 py-0.5 rounded
                              ${
                                isDarkMode
                                  ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                  : "bg-[#2075c7]/20 text-[#2075c7]"
                              }`}
                            >
                              {exp.role}
                            </span>
                          </div>
                          <div
                            className={`text-xs mt-1
                            ${isDarkMode ? "text-gray-400" : "text-[#93a1a1]"}`}
                          >
                            {exp.period}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {edu.researchExperience && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <BsSearch
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-[#586e75]"
                        }`}
                      />
                      <h4
                        className={`text-sm font-semibold
                        ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                        id={`research-${index}`}
                      >
                        Research Experience
                      </h4>
                    </div>
                    <div
                      className="grid grid-cols-1 gap-[0.5rem] pl-6"
                      role="list"
                      aria-labelledby={`research-${index}`}
                    >
                      {edu.researchExperience.map((exp, idx) => (
                        <div
                          key={idx}
                          className={`text-sm py-[0.4rem] px-2 rounded relative
                            ${
                              isDarkMode
                                ? "bg-[#232930] text-gray-300"
                                : "bg-[#e6e6e6] text-[#586e75]"
                            }
                            before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2
                            before:w-1.5 before:h-1.5 before:rounded-full
                            ${
                              isDarkMode
                                ? "before:bg-gray-500"
                                : "before:bg-[#93a1a1]"
                            }`}
                          role="listitem"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{exp.title}</span>
                            <span
                              className={`text-xs font-medium ml-2 px-2 py-0.5 rounded
                              ${
                                isDarkMode
                                  ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                  : "bg-[#2075c7]/20 text-[#2075c7]"
                              }`}
                            >
                              {exp.period}
                            </span>
                          </div>
                          <div
                            className={`text-xs mt-1 mb-2
                            ${
                              isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                            }`}
                          >
                            {exp.supervisor}
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs space-y-1">
                              {exp.description.map((desc, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="min-w-[6px]">•</span>
                                  <span>{desc}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center text-xs">
                                <span
                                  className={`font-medium
                                  ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-[#93a1a1]"
                                  }`}
                                >
                                  Tools:&nbsp;
                                </span>
                                <span
                                  className={`
                                  ${
                                    isDarkMode
                                      ? "text-[#58a6ff]"
                                      : "text-[#2075c7]"
                                  }`}
                                >
                                  {Object.values(exp.technologies)
                                    .flat()
                                    .join(" | ")}
                                </span>
                              </div>
                            </div>
              </div>
              </div>
                      ))}
              </div>
              </div>
                )}
              </div>
            ))}
              </div>
        </div>
      ),
    },
    {
      title: "Certifications",
      id: "certifications",
      content: (
        <div className="flex justify-center items-center">
          <ul
            className={`list-disc pl-4 flex flex-col items-start leading-tight
                         ${isDarkMode ? "text-[#ADB7BE]" : "text-[#586e75]"}`}
          >
            <li></li>
          </ul>
        </div>
      ),
    },
    {
      title: "Awards",
      id: "awards",
      content: (
        <div className="flex flex-col justify-center items-center">
          <Image src="/images/sysu.jpg" alt="sce" width={150} height={150} />
          <ul
            className={`list-disc pl-4 text-center mt-4
                         ${isDarkMode ? "text-[#ADB7BE]" : "text-[#586e75]"}`}
          >
            <li>Second-class Scholarship for Academic Excellence of SYSU</li>
          </ul>
        </div>
      ),
    },
  ];

  return TAB_DATA;
};

export default TabDataContent;
