"use client";
import React, { useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaLightbulb,
} from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';

const timelineData = [
  {
    id: 1,
    date: "2024",
    title: "Graduated B.S. from UCLA",
    icon: FaGraduationCap,
    color: "bg-[#268bd2]", // Solarized blue
  },
  {
    id: 2,
    date: "2024",
    title: "First Job",
    icon: FaBriefcase,
    color: "bg-[#859900]", // Solarized green
  },
  {
    id: 3,
    date: "2021",
    title: "SWE Internship at Alibaba",
    icon: FaAward,
    color: "bg-[#b58900]", // Solarized yellow
  },
  {
    id: 4,
    date: "2022",
    title: "SWE Internship at Student Medicover",
    icon: FaLightbulb,
    color: "bg-[#6c71c4]", // Solarized violet
  },
];

const Timeline = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const { isDarkMode } = useTheme();

  const sortedTimelineData = [...timelineData].sort(
    (a, b) => parseInt(b.date) - parseInt(a.date)
  );

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const closeModal = () => {
    setSelectedMilestone(null);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className={`border-2-2 absolute border-opacity-20 h-full border left-1/2 transition-colors duration-300
                        ${isDarkMode ? 'border-[#586e75]' : 'border-[#93a1a1]'}`}></div>
        {sortedTimelineData.map((milestone, index) => (
          <div
            key={milestone.id}
            className={`mb-8 flex justify-between items-center w-full ${
              index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="order-1 w-5/12"></div>
            <div className={`z-20 flex items-center order-1 shadow-xl w-8 h-8 rounded-full min-w-fit p-2
                           transition-colors duration-300
                           ${isDarkMode ? 'bg-[#586e75]' : 'bg-[#93a1a1]'}`}>
              <h1 className={`mx-auto font-semibold text-lg transition-colors duration-300
                            ${isDarkMode ? 'text-[#fdf6e3]' : 'text-[#fdf6e3]'}`}>
                {milestone.date}
              </h1>
            </div>
            <button
              onClick={() => handleMilestoneClick(milestone)}
              className={`order-1 w-5/12 px-6 py-4 rounded-lg shadow-xl ${
                milestone.color
              } text-white cursor-pointer transition-all duration-300 transform hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-offset-2 hover:opacity-90`}
            >
              <h3 className="mb-3 font-bold text-xl">{milestone.title}</h3>
              <milestone.icon className="text-4xl mb-3 inline-block" />
              <p className="text-sm leading-snug tracking-wide text-opacity-100">
                Click for more details
              </p>
            </button>
          </div>
        ))}
      </div>

      {selectedMilestone && (
        <div
          className={`fixed inset-0 overflow-y-auto h-full w-full z-50 transition-colors duration-300
                     ${isDarkMode ? 'bg-[#002b36]/50' : 'bg-[#073642]/30'}`}
          onClick={closeModal}
        >
          <div
            className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md transition-colors duration-300
                       ${isDarkMode 
                         ? 'bg-[#002b36] border-[#073642]' 
                         : 'bg-[#eee8d5] border-[#93a1a1]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <selectedMilestone.icon
                className={`mx-auto text-6xl ${selectedMilestone.color.replace(
                  "bg-",
                  "text-"
                )}`}
              />
              <h3 className={`text-lg leading-6 font-medium mt-4 transition-colors duration-300
                            ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
                {selectedMilestone.title}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className={`text-sm transition-colors duration-300
                             ${isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'}`}>
                  Detailed information about{" "}
                  {selectedMilestone.title.toLowerCase()} milestone. This
                  section can include more specific details, achievements, or
                  reflections related to this particular point in your career.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeModal}
                  className={`px-4 py-2 text-base font-medium rounded-md w-full shadow-sm transition-colors duration-300
                            ${isDarkMode 
                              ? 'bg-[#073642] text-[#93a1a1] hover:bg-[#586e75] hover:text-[#fdf6e3]' 
                              : 'bg-[#93a1a1] text-[#fdf6e3] hover:bg-[#586e75]'}
                            focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
