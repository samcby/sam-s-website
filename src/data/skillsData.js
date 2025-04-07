import * as Si from 'react-icons/si';
import { TbBrandFlask } from 'react-icons/tb';
import { FaJava } from 'react-icons/fa';

export const BACKEND_SKILLS = [
  { 
    name: 'Node.js', 
    Icon: Si.SiNodedotjs, 
    baseRadius: 180, 
    baseAngle: -45, 
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#339933',
    darkColor: '#43BB43'
  },
  { 
    name: 'Java',
    Icon: FaJava,
    baseRadius: 160, 
    baseAngle: -50, 
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#007396',
    darkColor: '#0088B3'
  },
  { 
    name: 'Python', 
    Icon: Si.SiPython, 
    baseRadius: 120, 
    baseAngle: -30, 
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#3776AB',
    darkColor: '#4584BD'
  },
  { 
    name: 'Postman',
    Icon: Si.SiPostmanapi,
    baseRadius: 140,
    baseAngle: -65,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#FF6C37',
    darkColor: '#FF8F66'
  },
  { 
    name: 'Flask', 
    Icon: TbBrandFlask, 
    baseRadius: 180, 
    baseAngle: -75, 
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#000000',
    darkColor: '#CCCCCC'
  },
  { 
    name: 'Swift', 
    Icon: Si.SiSwift, 
    baseRadius: 140, 
    baseAngle: -25, 
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#F05138',
    darkColor: '#FF6B52'
  },
  { 
    name: 'C++', 
    Icon: Si.SiCplusplus, 
    baseRadius: 200, 
    baseAngle: -40, 
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#00599C',
    darkColor: '#0071C9'
  },
  { 
    name: 'REST API', 
    Icon: Si.SiOpenapi, 
    baseRadius: 120, 
    baseAngle: -15, 
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#38B832',
    darkColor: '#4ACA44'
  }
];

export const FRONTEND_SKILLS = [
  { 
    name: 'HTML', 
    Icon: Si.SiHtml5, 
    baseRadius: 120,
    baseAngle: -170,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#E34F26',
    darkColor: '#FF6B52'
  },
  { 
    name: 'CSS', 
    Icon: Si.SiCss3, 
    baseRadius: 140,
    baseAngle: -150,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#1572B6',
    darkColor: '#2A8FE5'
  },
  { 
    name: 'JavaScript', 
    Icon: Si.SiJavascript, 
    baseRadius: 160,
    baseAngle: -130,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#F7DF1E',
    darkColor: '#FFE94A'
  },
  { 
    name: 'TypeScript', 
    Icon: Si.SiTypescript, 
    baseRadius: 180,
    baseAngle: -110,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#3178C6',
    darkColor: '#4595E5'
  },
  { 
    name: 'React', 
    Icon: Si.SiReact, 
    baseRadius: 200,
    baseAngle: -140,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#61DAFB',
    darkColor: '#7DE3FF'
  },
  { 
    name: 'Next.js', 
    Icon: Si.SiNextdotjs, 
    baseRadius: 220,
    baseAngle: -120,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#000000',
    darkColor: '#FFFFFF'
  }
];

export const DATABASE_SKILLS = [
  { 
    name: 'MongoDB', 
    Icon: Si.SiMongodb,
    baseRadius: 120,
    baseAngle: 100,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#47A248',
    darkColor: '#59B45A'
  },
  { 
    name: 'MySQL', 
    Icon: Si.SiMysql,
    baseRadius: 140,
    baseAngle: 140,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#4479A1',
    darkColor: '#5C91B9'
  },
  { 
    name: 'Prisma', 
    Icon: Si.SiPrisma,
    baseRadius: 160,
    baseAngle: 120,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#2D3748',
    darkColor: '#3D4B5F'
  },
  { 
    name: 'PostgreSQL', 
    Icon: Si.SiPostgresql,
    baseRadius: 180,
    baseAngle: 160,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#336791',
    darkColor: '#4479A3'
  }
];

export const DEVOPS_SKILLS = [
  { 
    name: 'Git', 
    Icon: Si.SiGit,
    baseRadius: 120,
    baseAngle: 15,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#F05032',
    darkColor: '#FF6B52'
  },
  { 
    name: 'GitHub', 
    Icon: Si.SiGithub,
    baseRadius: 140,
    baseAngle: 45,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#181717',
    darkColor: '#FFFFFF'
  },
  { 
    name: 'GitLab', 
    Icon: Si.SiGitlab,
    baseRadius: 160,
    baseAngle: 30,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#FC6D26',
    darkColor: '#FD8343'
  },
  { 
    name: 'VS Code', 
    Icon: Si.SiVisualstudiocode,
    baseRadius: 180,
    baseAngle: 60,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#007ACC',
    darkColor: '#0098FF'
  },
  { 
    name: 'Docker', 
    Icon: Si.SiDocker,
    baseRadius: 200,
    baseAngle: 75,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#2496ED',
    darkColor: '#40A6EF'
  },
  { 
    name: 'Kubernetes', 
    Icon: Si.SiKubernetes,
    baseRadius: 220,
    baseAngle: 85,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: '#326CE5',
    darkColor: '#4D7EE8'
  }
]; 