const PROJECT_DATA = [
  {
    id: 1,
    title: "Research on AI Generating Analog and Mixed Signal Circuits",
    description:
      "The design and performance optimization of analog circuits (op amps/ADCs) are carried out using AI methods such as large language models (LLMs) and Bayesian optimization. The relevant results have been co-authored into a paper and accepted by the ACM TODAES journal.",
    image: "/images/projects/AMSGEN.png",
    tag: ["All", "EDA"],
    gitUrl: "https://doi.org/10.1145/3736166",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Research on Building a Comprehensive Benchmark for AMS Circuits",
    description:
      "By systematically combing through textbook knowledge on analog chip design, we built an evaluation system to assess the professional capabilities of large language models (LLMs), and co-authored the relevant research results into a paper and submitted it to NeurIPS.",
    image: "/images/projects/dataset.png",
    tag: ["All", "EDA"],
    gitUrl:
      "https://openreview.net/forum?id=m7paXIoQyz#discussion",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Research on Accelerating Diffusion Channel Decoder",
    description:
      "I applied the diffusion model and Transformer to channel decoding, and achieved superior performance while reducing complexity through model distillation and dynamic compression technology. This research result was eventually rated as an outstanding undergraduate thesis at the school level.",
    image: "/images/projects/ddecc.jpg",
    tag: ["All", "HARDWARE ACC"],
    gitUrl: "",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Intelligent Control Chip Based on Robei EDA",
    description:
      "According to Robei's requirements, we used the company's EDA software and FPGA hardware to design and assemble a robot ourselves, enabling it to perform functions such as gripping and transferring goods with a robotic arm, moving, avoiding obstacles, traversing complex terrain, and remote control.",
    image: "/images/projects/robeicar.jpg",
    tag: ["All", "EMBEDDED"],
    gitUrl: "",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Research on Two-dimensional Materials and Luminescence",
    description:
      "As the team leader, I collaborated with my team members to complete a paper on the luminescence research of two-dimensional materials, and submitted it to the journal Nanomaterials.",
    image: "/images/projects/materials.png",
    tag: ["All"],
    gitUrl:
      "",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Research on Optimization of 4-bit Absolute Value Detector",
    description:
      "By reconstructing the adder's carry block and optimizing transistor size and supply voltage, I reduced the circuit's power consumption by 68.16% while still meeting speed requirements. ",
    image: "/images/projects/adder.png",
    tag: ["All", "IC DESIGN"],
    gitUrl: "https://doi.org/10.1063/5.0171160",
    previewUrl: "/",
  },
  {
    id: 7,
    title: "CNN Hardware Accelerating",
    description:
      "Used Python and Verilog to implement CNN hardware acceleration on the EGO1 FPGA, incorporating hierarchical parallelization of input/output channels and feature maps, along with custom I/O buffer design for efficient deployment.",
    image: "/images/projects/cnn.png",
    tag: ["All", "HARDWARE ACC"],
    gitUrl: "",
    previewUrl: "/",
  },  
];

export default PROJECT_DATA;
