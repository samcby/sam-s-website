"use client";
import React, { useRef } from "react";
import Interests from "./Interest";

export default function HobbiesPage() {
  // 定义父容器的引用
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto py-8 h-screen w-full overflow-hidden"
    >
      <Interests containerRef={containerRef} />
    </div>
  );
}
