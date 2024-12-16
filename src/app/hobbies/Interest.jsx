import React, { useState } from "react";
import DraggableWindow from "@/app/components/DraggableWindow";
import Image from "next/image";

const Interests = ({ containerRef }) => {
  const [isWindow1Open, setIsWindow1Open] = useState(true);
  const [isWindow2Open, setIsWindow2Open] = useState(true);
  const [isWindow3Open, setIsWindow3Open] = useState(true);

  // 随机初始位置逻辑
  const getRandomPosition = () => {
    const paddingX = 0; // 去除左右 padding
    const paddingY = 0; // 去除上下 padding

    const width = containerRef.current?.offsetWidth || window.innerWidth;
    const height = containerRef.current?.offsetHeight || window.innerHeight;

    return {
      x: Math.floor(Math.random() * (width - 300 - paddingX * 2) + paddingX),
      y: Math.floor(Math.random() * (height - 200 - paddingY * 2) + paddingY),
    };
  };
  const window1Position = getRandomPosition();
  const window2Position = getRandomPosition();
  const window3Position = getRandomPosition();

  return (
    <>
      {isWindow1Open && (
        <DraggableWindow
          title="Photography"
          defaultPosition={window1Position}
          bounds="parent"
        >
          <p className="text-sm">I love capturing landscapes and portraits.</p>
        </DraggableWindow>
      )}

      {isWindow2Open && (
        <DraggableWindow
          title="Music"
          defaultPosition={window2Position}
          bounds="parent"
        >
          <p className="text-sm">
            Listening to jazz and electronic music is my hobby. I also play DJ.
          </p>
          <Image src="/images/DJ.png" width={300} height={200} />
        </DraggableWindow>
      )}

      {isWindow3Open && (
        <DraggableWindow
          title="Pet"
          defaultPosition={window3Position}
          bounds="parent"
        >
          <p className="text-sm">
            I love cat and dog. I have a 2 cats named "DoiYuk" (white) and
            "WongChoi" (black).
          </p>
          <Image src="/images/cats.jpg" width={300} height={200} />
        </DraggableWindow>
      )}
    </>
  );
};

export default Interests;
