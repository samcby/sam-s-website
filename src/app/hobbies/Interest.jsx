"use client";
import React, { useState, useEffect, useCallback } from "react";
import DraggableWindow from "@/app/components/DraggableWindow";
import Image from "next/image";
import { useTheme } from '../context/ThemeContext';

const Interests = ({ containerRef }) => {
  const { isDarkMode } = useTheme();
  const [windows, setWindows] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });
  
  // 更新容器尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        // 获取视口高度
        const viewportHeight = window.innerHeight;
        // navbar 高度 (64px)
        const navbarHeight = 64;
        // 计算可用高度 (减去navbar，不减footer，因为我们要允许内容区域延伸)
        const availableHeight = viewportHeight - navbarHeight;
        
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: availableHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [containerRef]);

  // 初始化窗口位置
  useEffect(() => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0) return;

    const getRandomPosition = () => {
      const windowWidth = 300;
      const windowHeight = 300;
      const maxX = Math.max(0, containerDimensions.width - windowWidth);
      const maxY = Math.max(0, containerDimensions.height - windowHeight);

      return {
        position: {
          x: Math.max(0, Math.min(Math.random() * maxX, maxX)),
          y: Math.max(0, Math.min(Math.random() * maxY, maxY))
        },
        velocity: {
          x: (Math.random() - 0.5) * 1.5,
          y: (Math.random() - 0.5) * 1.5
        },
        isDragging: false,
        isVisible: true
      };
    };

    setWindows([
      { ...getRandomPosition(), id: 'photography' },
      { ...getRandomPosition(), id: 'music' },
      { ...getRandomPosition(), id: 'pet' },
      { ...getRandomPosition(), id: 'travel' },
      { ...getRandomPosition(), id: 'fitness' }
    ]);
  }, [containerDimensions]);

  // 处理窗口移动和碰撞
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    let animationFrameId;
    const windowWidth = 300;
    const windowHeight = 300;

    const updatePositions = () => {
      setWindows(prevWindows => 
        prevWindows.map(win => {
          if (win.isDragging || !win.isVisible) return win;

          // 计算窗口的新位置（四个边界）
          const newLeft = win.position.x + win.velocity.x;
          const newRight = newLeft + windowWidth;
          const newTop = win.position.y + win.velocity.y;
          const newBottom = newTop + windowHeight;

          let newVelocityX = win.velocity.x;
          let newVelocityY = win.velocity.y;

          // 水平方向的碰撞检测（左右边界）
          if (newLeft <= 0 || newRight >= containerDimensions.width) {
            newVelocityX = -win.velocity.x;
          }
          
          // 垂直方向的碰撞检测（上下边界）
          // navbar高度为64px，footer padding为16px
          const minTop = 0; // navbar的下边界对应容器的0位置
          const maxBottom = containerDimensions.height - 16; // 减去footer padding
          if (newTop <= minTop || newBottom >= maxBottom) {
            newVelocityY = -win.velocity.y;
          }

          // 确保窗口完全在可视区域内
          const boundedX = Math.max(0, Math.min(newLeft, containerDimensions.width - windowWidth));
          const boundedY = Math.max(minTop, Math.min(newTop, maxBottom - windowHeight));

          return {
            ...win,
            position: {
              x: boundedX,
              y: boundedY
            },
            velocity: {
              x: newVelocityX,
              y: newVelocityY
            }
          };
        })
      );

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, [windows, containerDimensions]);

  const handleDragStart = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: true } : win
      )
    );
  }, []);

  const handleDragStop = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: false } : win
      )
    );
  }, []);

  const handleDrag = useCallback((id, data) => {
    const windowWidth = 300;
    const windowHeight = 300;
    const maxBottom = containerDimensions.height - 16; // 减去footer padding
    
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id
          ? {
              ...win,
              position: {
                x: Math.max(0, Math.min(data.x, containerDimensions.width - windowWidth)),
                y: Math.max(0, Math.min(data.y, maxBottom - windowHeight))
              }
            }
          : win
      )
    );
  }, [containerDimensions]);

  const handleClose = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isVisible: false } : win
      )
    );
  }, []);

  if (!windows) return null;

  return (
    <div 
      className={`
        w-full 
        h-full
        pb-16 
        relative 
        transition-colors 
        duration-300
        ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}
      `}
      style={{
        height: `${containerDimensions.height}px`,
      }}
    >
      {windows.map((window) => (
        window.isVisible && (
          <DraggableWindow
            key={window.id}
            title={(() => {
              switch(window.id) {
                case 'photography': return "Photography";
                case 'music': return "Music";
                case 'pet': return "Pet";
                case 'travel': return "Travel";
                case 'fitness': return "Fitness";
                default: return "";
              }
            })()}
            defaultPosition={window.position}
            bounds="parent"
            onStart={() => handleDragStart(window.id)}
            onStop={() => handleDragStop(window.id)}
            onDrag={(e, data) => handleDrag(window.id, data)}
            position={window.position}
            onClose={() => handleClose(window.id)}
            className={`${isDarkMode ? 'bg-[#073642] text-[#93a1a1]' : 'bg-[#eee8d5] text-[#586e75]'}`}
          >
            {(() => {
              switch(window.id) {
                case 'photography':
                  return (
                    <div data-handle="true">
                      <p className="text-sm mb-4">
                        {"I love capturing landscapes and portraits."}
                      </p>
                      <Image 
                        src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
                        width={300} 
                        height={200} 
                        alt="photography"
                        className="rounded-md object-cover select-none pointer-events-none"
                        unoptimized
                      />
                    </div>
                  );
                case 'music':
                  return (
                    <div data-handle="true">
                      <p className="text-sm mb-4">
                        {"Listening to jazz and electronic music is my hobby. I also play DJ."}
                      </p>
                      <Image 
                        src="/images/DJ.png" 
                        width={300} 
                        height={200} 
                        alt="dj"
                        className="rounded-md select-none pointer-events-none"
                      />
                    </div>
                  );
                case 'pet':
                  return (
                    <div data-handle="true">
                      <p className="text-sm mb-4">
                        {'I love cat and dog. I have 2 cats named "DoiYuk" (white) and "WongChoi" (black).'}
                      </p>
                      <Image 
                        src="/images/cats.jpg" 
                        width={300} 
                        height={200} 
                        alt="myCat"
                        className="rounded-md select-none pointer-events-none"
                      />
                    </div>
                  );
                case 'travel':
                  return (
                    <div data-handle="true">
                      <p className="text-sm mb-4">
                        {"I love traveling and exploring new places. I've visited 10 countries in 2024, experiencing different cultures and capturing beautiful moments."}
                      </p>
                      <Image 
                        src="https://images.unsplash.com/photo-1488085061387-422e29b40080"
                        width={300} 
                        height={200} 
                        alt="travel"
                        className="rounded-md object-cover select-none pointer-events-none"
                        unoptimized
                      />
                    </div>
                  );
                case 'fitness':
                  return (
                    <div data-handle="true">
                      <p className="text-sm mb-4">
                        {"Staying active is important to me. I enjoy working out and maintaining a healthy lifestyle through regular exercise and proper nutrition."}
                      </p>
                      <Image 
                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
                        width={300} 
                        height={200} 
                        alt="fitness"
                        className="rounded-md object-cover select-none pointer-events-none"
                        unoptimized
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </DraggableWindow>
        )
      ))}
    </div>
  );
};

export default Interests;
