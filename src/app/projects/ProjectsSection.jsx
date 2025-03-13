"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectTag from "../components/ProjectTag";
import { motion, useInView } from "framer-motion";
import PROJECT_DATA from "./projectData";
import { useTheme } from '../context/ThemeContext';

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
    <section
      id="projects"
      className={`flex flex-col my-8 sm:my-12 py-12 sm:py-24 gap-6 sm:gap-8 relative items-center px-4 sm:px-6`}
    >
      <h2 className={`text-center text-3xl sm:text-4xl font-bold mt-4 mb-2 md:mb-4 transition-colors duration-300
                    ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
        My Projects
      </h2>
      <div className={`flex flex-wrap justify-center items-center gap-2 sm:gap-3 py-4 sm:py-6 transition-colors duration-300
                    ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="ML"
          isSelected={tag === "ML"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
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
