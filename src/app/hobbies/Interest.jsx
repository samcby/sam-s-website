"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const isInitializedRef = useRef(false);
  const previousDimensionsRef = useRef({ width: 0, height: 0 });
  
  // 防抖函数
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // 更新容器尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const viewportHeight = window.innerHeight;
        const navbarHeight = 64;
        const availableHeight = viewportHeight - navbarHeight;
        
        const newDimensions = {
          width: containerRef.current.offsetWidth,
          height: availableHeight
        };

        setContainerDimensions(newDimensions);
      }
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 100);
    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);
    return () => window.removeEventListener('resize', debouncedUpdateDimensions);
  }, [containerRef, debounce]);

  // 处理窗口位置更新
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    const { width: prevWidth, height: prevHeight } = previousDimensionsRef.current;
    if (prevWidth === 0 && prevHeight === 0) {
      previousDimensionsRef.current = containerDimensions;
      return;
    }

    if (prevWidth !== containerDimensions.width || prevHeight !== containerDimensions.height) {
      const scaleX = containerDimensions.width / prevWidth;
      const scaleY = containerDimensions.height / prevHeight;

      setWindows(prevWindows => 
        prevWindows.map(win => ({
          ...win,
          position: {
            x: Math.min(Math.floor(win.position.x * scaleX), containerDimensions.width - 300),
            y: Math.min(Math.floor(win.position.y * scaleY), containerDimensions.height - 300)
          }
        }))
      );

      previousDimensionsRef.current = containerDimensions;
    }
  }, [containerDimensions]);

  // 初始化窗口位置
  useEffect(() => {
    if (isInitializedRef.current || !containerDimensions.width || !containerDimensions.height) return;

    const getInitialPosition = (index, total) => {
      const windowWidth = 300;
      const windowHeight = 300;
      const maxX = Math.max(0, containerDimensions.width - windowWidth);
      const maxY = Math.max(0, containerDimensions.height - windowHeight);

      const cols = Math.ceil(Math.sqrt(total));
      const rows = Math.ceil(total / cols);
      const col = index % cols;
      const row = Math.floor(index / cols);

      const x = (maxX / (cols - 1 || 1)) * col;
      const y = (maxY / (rows - 1 || 1)) * row;

      return {
        position: {
          x: Math.max(0, Math.min(x, maxX)),
          y: Math.max(0, Math.min(y, maxY))
        },
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        },
        isDragging: false,
        isVisible: true
      };
    };

    const windowIds = ['photography', 'music', 'pet', 'travel', 'fitness'];
    setWindows(
      windowIds.map((id, index) => ({
        ...getInitialPosition(index, windowIds.length),
        id
      }))
    );
    
    isInitializedRef.current = true;
    previousDimensionsRef.current = containerDimensions;
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
                        sizes="(max-width: 640px) 100vw, 300px"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
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
                        sizes="(max-width: 640px) 100vw, 300px"
                        quality={75}
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
                        sizes="(max-width: 640px) 100vw, 300px"
                        quality={75}
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
                        sizes="(max-width: 640px) 100vw, 300px"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
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
