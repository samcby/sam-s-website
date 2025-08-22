"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectTag from "@/components/projects/ProjectTag";
import { motion, useInView } from "framer-motion";
import PROJECT_DATA from "@/data/projectData";
import { useTheme } from '@/context/ThemeContext';

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDarkMode } = useTheme();

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = PROJECT_DATA.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="flex flex-col items-center">
      <div className={`flex flex-wrap justify-center items-center gap-2 sm:gap-3 py-6 sm:py-8 transition-colors duration-300
                    ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="EDA"
          isSelected={tag === "EDA"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="IC DESIGN"
          isSelected={tag === "IC DESIGN"}
        />        
        <ProjectTag
          onClick={handleTagChange}
          name="HARDWARE ACC"
          isSelected={tag === "HARDWARE ACC"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="EMBEDDED"
          isSelected={tag === "EMBEDDED"}
        />
      </div>
      <ul ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 w-full max-w-[1200px]">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
