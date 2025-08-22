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
    degree: "M.S. in Electrical and Computer Engineering",
    period: "09/2025 - TBD",
    gpa: "TBD",
    courses: [
    ],
  },
  {
    degree: "B.E. in Microelectronics Science and Engineering",
    period: "09/2021 - 06/2025",
    gpa: "3.7/4.0",
    courses: [
      "MR - Analogue Circuit",
      "MR - Experiment of Analog Circuit",
      "MR - Digital Circuit",
      {
        name: "MR - Digital Circuit Experiment",
        achievement:
          "Achieved 98/100 overall",
      },
      "MR - Analog Integrated Circuits Design",
      {
        name: "MR -  Experiment of Analog Integrated Circuit Design",
        achievement:
          "Achieved 97/100 overall",
      },      
      "MR - Hardware Description Language and FPGA Design",
      "MR - Signals and Systems",
      "ME -  Data Structures and Algorithm Design",
      {
        name: "MR - Semiconductor Physics",
        achievement:
          "Ranked No.1 among 87 students",
      },        
      "MR -  Design of Digital Integrated Circuits",
      "MR - Experiment of Digital Integrated Circuits Design",
      "MR -  Microcomputer Principle and Embedded System",
      "ME -  Electronic design automation",
      "ME -  Open Experiment of Artificial Intelligence System Design",
      "ME -   Hardware Accelerator for Artificial Intelligence",
      "MR - Advanced Packaging Technology",
      "MR - Advanced Micro/Nano-electronic Devices",
      {
        name: "MR -  Methodology of Integrated Circuit",
        achievement:
          "This is a graduate/doctoral level course and there are only 11 undergraduate students in the class taking this course",
      },
    ],
    researchExperience: [
      {
        title: "Research Assistant - Research on Optimization of 4-bit Absolute Value Detector",
        supervisor: "Prof. Shasha Li",
        period: "10/2022 - 01/2023",
        description: [
          "Read extensive literature about the two-dimensional materials and luminescence",
          "Gave presentations in the group about influential works",
          "Independently finished a paper writing based on our findings and has been submitted to Nanomaterials",
        ],
        technologies: {
         "Design Tools": ["Adobe Illustrator"], 
        },
      },
      {
        title: "Research Assistant - CNN Hardware Accelerating",
        supervisor: "Prof. Meiqi Wang",
        period: "04/2024 - 06/2024",
        description: [
          "Used Python and Verilog to implement CNN hardware acceleration on the EGO1 FPGA",
          "Incorporating hierarchical parallelization of input/output channels and feature maps, along with custom I/O buffer design for efficient deployment",
        ],
        technologies: {
         "Design Tools": ["Pytorch", "Verilog", "Python", "Matlab", "Xilinx Vivado"], 
        },
      },
      {
        title: "Research Assistant -  Intelligent Control Chip Based on Robei EDA ",
        supervisor: "Prof. Meiqi Wang",
        period: "01/2024 - 07/2024",
        description: [
          "Implemented a Bluetooth-controlled robotic car and arm system through hardware-software co-design",
          "Wrote Verilog for FPGA through Robei’s EDA(a tool without any IP cores) and developed a C# host program",
          "Achieving smooth, precise control via PID algorithms",
        ],
        technologies: {
         "Design Tools": ["Verilog", "Python", "Matlab", "Xilinx Vivado", "Robei EDA"], 
        },
      },      
      {
        title: "Research Assistant - Research on Accelerating Diffusion Channel Decoder ",
        supervisor: "Prof. Siyu Liao",
        period: "01/2025 - 07/2025",
        description: [
          "Explored the use of diffusion models and Transformers for channel decoding, enhancing a current framework with progressive distillation and dynamic Transformer compression to reduce model complexity",
          "Validated the approach on multiple linear codes and channel conditions, achieving competitive or superior FER/BER compared to existing baselines",        
          "The results were formed into an undergraduate thesis and won the school-level Outstanding Thesis Award",        
        ],
        technologies: {
         "Design Tools": ["Pytorch", "Python", "Overleaf"], 
        },
      },
    ],
    teachingExperience: [
      {},
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