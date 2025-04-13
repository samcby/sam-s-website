"use client";

// Constants for responsibilities
const RESPONSIBILITIES = {
  READER: "Grading assignments and providing feedback to students",
  TA: "Leading discussion sections, holding office hours, and grading assignments",
  TEST_SCRIPT_DEV:
    "Developing and maintaining test scripts for course assignments",
  WEB_DEV: "Developing and maintaining course web infrastructure",
};

// Helper function to validate teaching experience data
const validateTeachingExperience = (exp) => {
  const requiredFields = ["course", "role", "period", "responsibilities"];
  return requiredFields.every((field) => exp[field] !== undefined);
};

export const educationData = [
  {
    degree: "M.S. in Computer Science",
    period: "09/2024 - 01/2026",
    gpa: "4.0/4.0",
    courses: [
      "CS 214 - Big Data Systems",
      "CS 219 - Big Data Analytics",
      "CS 230 - Software Engineering",
      "CS 269-3 - Deformable Models in Computer Vision",
      "CS 495 - Teaching Assistant Training Seminar",
      "ECE 219 - Large-Scale Data Mining: Models and Algorithms",
      "ECE 232E - Large Scale Social and Complex Networks",
    ],
  },
  {
    degree: "B.S. in Computer Science",
    period: "09/2019 - 03/2024",
    gpa: "3.91/4.0",
    courses: [
      "CS 35L - Software Construction - Linux and Git",
      "CS 111 - Operating Systems Principles",
      "CS 118 - Computer Network Fundamentals",
      "CS 122 - Computer Security",
      {
        name: "CS 130 - Software Engineering",
        achievement:
          "The only student who achieved an A+ grade among 110 students",
      },
      "CS 131 - Programming Languages",
      "CS 134 - Distributed Systems",
      "CS 143 - Database Systems",
      "CS 144 - Web Applications",
      "CS M151B/EE M116C - Computer Systems Architecture",
      "CS M152A - Introductory Digital Design Laboratory",
      "CS 161 - Fundamentals of Artificial Intelligence",
      "CS 174A - Computer Graphics",
      "CS 180 - Introduction to Algorithms and Complexity",
      "CS 181 - Introduction to Formal Languages and Automata",
      "CS 188 - Software Security",
      "CS 199 - Directed Research",
      "CSM51A - Logic Design of Digital Systems",
    ],
    researchExperience: [
      {
        title: "Research Assistant - Software Security Lab",
        supervisor: "Prof. Yuan Tian",
        period: "10/2023 - 04/2024",
        description: [
          "Conducted research on binary program analysis and decompilation using machine learning approaches",
          "Developed models for automated vulnerability detection and binary code analysis",
          "Created training datasets and implemented binary code similarity analysis",
          "Delivered monthly paper review presentations on latest advancements in software security and ML",
        ],
        technologies: {
          "Reverse Engineering": ["IDA Pro", "Ghidra"],
          Development: ["LLVM", "Python"],
          "Machine Learning": ["TensorFlow"],
        },
      },
    ],
    teachingExperience: [
      {
        course: "CS 144 - Web Applications",
        role: "Reader",
        period: "Spring 2025",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 111 - Operating Systems Principles",
        role: "Teaching Assistant",
        period: "Winter 2025",
        responsibilities: RESPONSIBILITIES.TA,
      },
      {
        course: "CS 131 - Programming Languages",
        role: "Reader",
        period: "Fall 2024",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 130 - Software Engineering",
        role: "Reader",
        period: "Fall 2024",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 118 - Computer Network Fundamentals",
        role: "Reader",
        period: "Winter 2024",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 35L - Software Construction",
        role: "Test Script Developer",
        period: "Fall 2023",
        responsibilities: RESPONSIBILITIES.TEST_SCRIPT_DEV,
      },
      {
        course: "CS 246 - Web Information Management",
        role: "Web Developer",
        period: "Spring 2021",
        responsibilities: RESPONSIBILITIES.WEB_DEV,
      },
    ].map((exp) => {
      if (!validateTeachingExperience(exp)) {
        console.warn(
          `Invalid teaching experience data: ${JSON.stringify(exp)}`
        );
      }
      return exp;
    }),
  },
];
