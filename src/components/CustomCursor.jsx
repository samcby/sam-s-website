"use client";
import { useState, useEffect, useCallback } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  // 使用useCallback优化事件处理函数
  const updatePosition = useCallback((e) => {
    // 使用requestAnimationFrame优化渲染性能
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      
      // 检查鼠标指针下的元素类型并设置相应的鼠标指针样式
      const target = e.target;
      
      // 优化条件判断，使用更简洁的方式
      if (target.matches('a, button, [role="button"]') || 
          target.closest('a, button, [role="button"]')) {
        setCursorType('link');
      } else if (target.matches('input, textarea, [contenteditable], p, h1, h2, h3, h4, h5, h6, span')) {
        setCursorType('text');
      } else if (target.disabled || target.matches('.disabled, [disabled]')) {
        setCursorType('not-allowed');
      } else if (target.matches('.loading, .processing, .busy-cursor')) {
        setCursorType('busy');
      } else {
        setCursorType('');
      }
    });
  }, []);
  
  useEffect(() => {
    // 添加鼠标进入/离开页面的处理
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // 优化性能：只在用户移动鼠标时更新位置
    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // 确保初始状态可见（如果鼠标已在页面上）
    if (typeof document !== 'undefined' && document.hasFocus()) {
      setIsVisible(true);
    }
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [updatePosition]);
  
  // 如果不可见则不渲染
  if (!isVisible) return null;
  
  return (
    <div 
      className={`custom-cursor ${cursorType}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0
      }}
    />
  );
};

export default CustomCursor; 