"use client";
import React from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTheme } from '../context/ThemeContext';

const ProjectCard = ({ imgUrl, title, description, gitUrl }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`h-[400px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105
                    ${isDarkMode 
                      ? 'bg-[#073642] border border-[#586e75]' 
                      : 'bg-[#eee8d5] border border-[#93a1a1]'}`}>
      <div
        className="h-48 sm:h-52 md:h-52 relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className={`overlay items-center justify-center absolute top-0 left-0 w-full h-full 
                        ${isDarkMode ? 'bg-[#073642]' : 'bg-[#eee8d5]'}
                        bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 
                        transition-all duration-500`}>
          <Link
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`h-12 w-12 sm:h-14 sm:w-14 border-2 relative rounded-full 
                       ${isDarkMode 
                         ? 'border-[#93a1a1] hover:border-[#fdf6e3]' 
                         : 'border-[#93a1a1] hover:border-[#002b36]'} 
                       group/link`}
          >
            <CodeBracketIcon className={`h-8 w-8 sm:h-10 sm:w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
                                       ${isDarkMode 
                                         ? 'text-[#93a1a1] group-hover/link:text-[#fdf6e3]' 
                                         : 'text-[#93a1a1] group-hover/link:text-[#002b36]'}`} />
          </Link>
        </div>
      </div>
      <div className="py-4 sm:py-6 px-4 flex flex-col h-[calc(400px-208px)]">
        <h5 className={`text-lg sm:text-xl font-semibold mb-2 transition-colors duration-300
                       ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
          {title}
        </h5>
        <p className={`text-sm sm:text-base transition-colors duration-300
                      ${isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
