"use client";
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FrontendQuadrant } from './quadrants/FrontendQuadrant';
import { BackendQuadrant } from './quadrants/BackendQuadrant';
import { DatabaseQuadrant } from './quadrants/DatabaseQuadrant';
import { DevopsQuadrant } from './quadrants/DevopsQuadrant';

const SKILLS_DATA = [
  // 前端 (左上象限)
  { name: 'HTML', iconName: 'SiHtml5', radius: 120, rotation: 135, color: '#E34F26', category: 'frontend' },
  { name: 'CSS', iconName: 'SiCss3', radius: 120, rotation: 90, color: '#1572B6', category: 'frontend' },
  { name: 'JavaScript', iconName: 'SiJavascript', radius: 180, rotation: 135, color: '#F7DF1E', category: 'frontend' },
  { name: 'TypeScript', iconName: 'SiTypescript', radius: 180, rotation: 90, color: '#3178C6', category: 'frontend' },
  { name: 'React', iconName: 'SiReact', radius: 120, rotation: 45, color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', iconName: 'SiNextdotjs', radius: 180, rotation: 45, color: '#000000', category: 'frontend' },
  
  // 后端 (右上象限)
  { name: 'Node.js', iconName: 'SiNodedotjs', radius: 120, rotation: -45, color: '#339933', category: 'backend' },
  { name: 'Python', iconName: 'SiPython', radius: 120, rotation: -90, color: '#3776AB', category: 'backend' },
  { name: 'Java', iconName: 'SiJava', radius: 180, rotation: -45, color: '#007396', category: 'backend' },
  { name: 'ASP.NET', iconName: 'SiDotnet', radius: 180, rotation: -90, color: '#512BD4', category: 'backend' },
  
  // 数据库 (左下象限)
  { name: 'MongoDB', iconName: 'SiMongodb', radius: 120, rotation: -135, color: '#47A248', category: 'database' },
  { name: 'MySQL', iconName: 'SiMysql', radius: 180, rotation: -135, color: '#4479A1', category: 'database' },
  { name: 'Prisma', iconName: 'SiPrisma', radius: 120, rotation: 180, color: '#2D3748', category: 'database' },
  
  // 开发工具 (右下象限)
  { name: 'Git', iconName: 'SiGit', radius: 120, rotation: -225, color: '#F05032', category: 'devops' },
  { name: 'VS Code', iconName: 'SiVisualstudiocode', radius: 180, rotation: -225, color: '#007ACC', category: 'devops' },
  { name: 'GitLab', iconName: 'SiGitlab', radius: 120, rotation: -270, color: '#FC6D26', category: 'devops' },
];

function SkillCircle() {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* 背景圆环 */}
      {[120, 180, 240].map((radius, index) => (
        <motion.div
          key={radius}
          className={`absolute border ${
            isDarkMode 
              ? 'border-[#586e75] border-opacity-40' 
              : 'border-[#93a1a1] border-opacity-60'
          } rounded-full`}
          style={{
            width: radius * 2,
            height: radius * 2,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        />
      ))}

      {/* 分区线 */}
      <motion.div
        className={`absolute w-full h-[1px] ${
          isDarkMode 
            ? 'bg-[#586e75] bg-opacity-40' 
            : 'bg-[#93a1a1] bg-opacity-60'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className={`absolute w-[1px] h-full ${
          isDarkMode 
            ? 'bg-[#586e75] bg-opacity-40' 
            : 'bg-[#93a1a1] bg-opacity-60'
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1 }}
      />

      {/* 对角线 */}
      <motion.div
        className={`absolute w-[0.5px] h-[140%] origin-center rotate-45 ${
          isDarkMode 
            ? 'bg-[#586e75] bg-opacity-30' 
            : 'bg-[#93a1a1] bg-opacity-30'
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className={`absolute w-[0.5px] h-[140%] origin-center -rotate-45 ${
          isDarkMode 
            ? 'bg-[#586e75] bg-opacity-30' 
            : 'bg-[#93a1a1] bg-opacity-30'
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* 添加中心点 */}
      <motion.div
        className={`absolute w-2 h-2 rounded-full ${
          isDarkMode 
            ? 'bg-[#586e75] bg-opacity-60' 
            : 'bg-[#93a1a1] bg-opacity-60'
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* 象限组件 */}
      <FrontendQuadrant isDarkMode={isDarkMode} />
      <BackendQuadrant isDarkMode={isDarkMode} />
      <DatabaseQuadrant isDarkMode={isDarkMode} />
      <DevopsQuadrant isDarkMode={isDarkMode} />

      {/* 分类标签 */}
      <motion.div
        className={`absolute bottom-0 left-0 text-sm font-medium ${
          isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        DATABASES
      </motion.div>
      <motion.div
        className={`absolute bottom-0 right-0 text-sm font-medium ${
          isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        DEVOPS & TOOLS
      </motion.div>
      <motion.div
        className={`absolute top-0 left-0 text-sm font-medium ${
          isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        FRONTEND
      </motion.div>
      <motion.div
        className={`absolute top-0 right-0 text-sm font-medium ${
          isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        BACKEND
      </motion.div>
    </div>
  );
}

export { SkillCircle as default }; 