import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[300px] h-auto">
        <Image
          src="/images/RICK_logo_vaporwave.png"
          alt="Logo"
          width={200}
          height={200}
          objectFit="contain" // 保持原比例
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
