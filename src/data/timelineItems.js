const TIMELINE_ITEMS = [
  {
    date: "Sep 2025 - TBD",
    title: "Master of Electrical and Computer Engineering",
    location: "UCLA | Los Angeles, CA",
    description:
      "GPA: TBD | Focused on Circuit Design and Computer Architecture.",
    logo: "https://p.ipic.vip/q1ysgx.png",
    details:
      "Key Courses: TBD | Expected Graduation: 2027",
  },
  {
    date: "Jan 2025 - Jul 2025",
    title: "Research on Accelerating Diffusion Channel Decoder",
    location: "SYSU | Shenzhen, Guangdong, China",
    description: "I applied the diffusion model and Transformer to channel decoding, and achieved superior performance while reducing complexity through model distillation and dynamic compression technology. This research result was eventually rated as an outstanding undergraduate thesis at the school level.",
    logo: "/images/sysu.jpg",
    details:
      "Explored the use of diffusion models and Transformers for channel decoding, enhancing a current framework with progressive distillation and dynamic Transformer compression to reduce model complexity. Validated the approach on multiple linear codes and channel conditions, achieving competitive or superior FER/BER compared to existing baselines. The results were formed into an undergraduate thesis and won the school-level Outstanding Thesis Award.",
  },
  {
    date: "Jan 2025 - May 2025",
    title: "Research on Building a Comprehensive Benchmark for AMS Circuits",
    location: "UCLA | BTD | Research Assistant",
    description:
      "By systematically combing through textbook knowledge on analog chip design, we built an evaluation system to assess the professional capabilities of large language models (LLMs), and co-authored the relevant research results into a paper and submitted it to NeurIPS.",
    logo: "https://p.ipic.vip/q1ysgx.png",
    details:
      "Collect and organize all the analog IC related textbooks currently on the market, such as the Razavi version, and grade the knowledge according to the difficulty level for undergraduates and postgraduates. Based on the relevant knowledge in textbooks, design test plans, test question types, etc. to fully test the current LLM's ability in Analog IC. Collaborated with team members to write a paper, which has been submitted to NeurIPS. ",
  },
  {
    date: "Jul 2024 - Dec 2024",
    title: "Research on AI Generating Analog and Mixed Signal Circuits",
    location: "UCLA | Research Assistant",
    description:
      "The design and performance optimization of analog circuits (op amps/ADCs) are carried out using AI methods such as large language models (LLMs) and Bayesian optimization. The relevant results have been co-authored into a paper and accepted by the ACM TODAES journal.",
    logo: "https://p.ipic.vip/q1ysgx.png",
    details: "Leveraged large language models (e.g., GPT-4o) and graph-based retrieval-augmented generation (RAG) to design transistor-level OPAMP circuits by exploring the AMSnet dataset with a Python triplet program. Applied Bayesian Optimization and the gm/ID method in Cadence Virtuoso to size analog blocks, building testbenches and evaluating performance across different circuit configurations. Analyzed various ADC architectures, particularly Sigma-Delta ADCs, and investigated the relationship between system-level specs and submodule design. Co-authored a paper accepted by ACM TODAES. Paper: Yichen Shi, Zhuofu Tao, Bingyu Chen et al. AMSnet-KG: A Netlist Dataset for LLM-Based AMS Circuit Auto Design Using Knowledge Graph RAG. ACM Transactions on Design Automation of Electronic Systems. (2025) https://doi.org/10.1145/3736166",
  },
  {
    date: "Jan 2024 - Jul 2024",
    title: "Intelligent Control Chip Based on Robei EDA | Team Leader",
    location: "SYSU | Shenzhen, Guangdong, China",
    description:
      "According to Robei's requirements, we used the company's EDA software and FPGA hardware to design and assemble a robot ourselves, enabling it to perform functions such as gripping and transferring goods with a robotic arm, moving, avoiding obstacles, traversing complex terrain, and remote control.",
    logo: "/images/sysu.jpg",
    details:
      "Implemented a Bluetooth-controlled robotic car and arm system through hardware-software co-design: wrote Verilog for FPGA through Robei’s EDA(a tool without any IP cores) and developed a C# host program, achieving smooth, precise control via PID algorithms. ",
  },
  {
    date: "Jan 2024 - Feb 2024",
    title: "Computer Hardware Engineer Intern",
    location: "Guangdong Greater Bay Area Institute of Integrated Circuit and System | Guangzhou, Guangdong, China",
    description:
      "Altium Designer was used to complete the schematic drawing and PCB layout design of the evaluation board for ADI's AD9213 that meets the requirements.",
    logo: "/images/giics.jpg",
    details:
      "Used Altium Designer to draw the schematic diagram for the AD9213 evaluation board of ADI Company. Drew the PCB layout for the core board of the AD9213 evaluation board of ADI Company.",
  },
  {
    date: "Jul 2023 - Jan 2024",
    title: "Research on Two-dimensional Materials and Luminescence | Team Leader",
    location: "SYSU | Shenzhen, Guangdong, China",
    description:
      "As the team leader, I collaborated with my team members to complete a paper on the luminescence research of two-dimensional materials, and submitted it to the journal Nanomaterials.",
    logo: "/images/sysu.jpg",
    details:
      "Read extensive literature about the two-dimensional materials and luminescence, and gave presentations in the group about influential works.Independently finished a paper writing based on our findings and has been submitted to Nanomaterials.",
  },
  {
    date: "Oct 2022 - Jan 2023",
    title: "Research on Optimization of 4-bit Absolute Value Detector | Team Leader",
    location: "UCLA Online | Shenzhen, Guangdong, China",
    description:
      "By reconstructing the adder's carry block and optimizing transistor size and supply voltage, I reduced the circuit's power consumption by 68.16% while still meeting speed requirements. ",
    logo: "https://p.ipic.vip/q1ysgx.png",
    details:
      "Redesigned the adder by extracting and restructuring the carry-out module from a mirror adder, significantly reducing power and improving efficiency. Performed path effort-based delay analysis and used Excel Solver for sizing and VDD optimization, achieving 68.16% power reduction with delay kept within 1.5× the minimum.The related paper is published as follows: Bingyu Chen. An Optimal Low Energy Cost 4-bit Absolute Value Detector with 55.5 FO4 (1V) Based on CMOS Process, AIP Conference Proceedings. (2023) https://doi.org/10.1063/5.0171160",
  },
  {
    date: "Sept 2021 - June 2025",
    title: "Bachelor of Microelectronic Science and Engineering",
    location: "SYSU | Guangzhou, Guangdong, China",
    description:
      "GPA: 3.7/4.0 | Outstanding Undergraduate Thesis of SYSU | Second-class Scholarship for Academic Excellence.",
    logo: "/images/sysu.jpg",
    details:
      "Focusing on microelectronics science and engineering, his major courses include Analog Integrated Circuit Design, Digital Integrated Circuit Design (A), Semiconductor Physics (A+), and Artificial Intelligence and Hardware Acceleration (A+). He conducted research in the laboratories of Professors Meiqi Wang and Shasha Li in various fields, including hardware acceleration, FPGAs, intelligent robotics, and two-dimensional materials.",
  },
];

export default TIMELINE_ITEMS;
