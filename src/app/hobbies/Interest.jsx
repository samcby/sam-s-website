"use client";
import React, { useState, useEffect } from "react";
import DraggableWindow from "@/app/components/DraggableWindow";
import Image from "next/image";

const Interests = () => {
  const [windowPositions, setWindowPositions] = useState([]);

  // 在客户端生成随机位置
  useEffect(() => {
    const getRandomPosition = () => {
      const paddingX = 20;
      const paddingY = 20;

      const width = window.innerWidth - 300 - paddingX * 2; // 确保窗口宽度内可拖拽
      const height = window.innerHeight - 200 - paddingY * 2; // 确保窗口高度内可拖拽

      return {
        x: Math.floor(Math.random() * width + paddingX),
        y: Math.floor(Math.random() * height + paddingY),
      };
    };

    setWindowPositions([
      getRandomPosition(),
      getRandomPosition(),
      getRandomPosition(),
    ]);
  }, []); // 空依赖数组，保证只在初次渲染时执行

  return (
    <>
      {windowPositions.length > 0 && (
        <>
          <DraggableWindow
            title="Photography"
            defaultPosition={windowPositions[0]}
            bounds="parent"
          >
            <p className="text-sm">
              {" I love capturing landscapes and portraits. "}
            </p>
          </DraggableWindow>

          <DraggableWindow
            title="Music"
            defaultPosition={windowPositions[1]}
            bounds="parent"
          >
            <p className="text-sm">
              {
                "Listening to jazz and electronic music is my hobby. I also play DJ."
              }
            </p>
            <Image src="/images/DJ.png" width={300} height={200} alt="dj" />
          </DraggableWindow>

          <DraggableWindow
            title="Pet"
            defaultPosition={windowPositions[2]}
            bounds="parent"
          >
            <p className="text-sm">
              {
                ' I love cat and dog. I have 2 cats named "DoiYuk" (white) and "WongChoi" (black). '
              }
            </p>
            <Image
              src="/images/cats.jpg"
              width={300}
              height={200}
              alt="myCat"
            />
          </DraggableWindow>
        </>
      )}
    </>
  );
};

export default Interests;
