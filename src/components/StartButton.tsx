"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type GameStartButtonProps = {
  onClick: () => void;
};

export const GameStartButton = ({ onClick }: GameStartButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative overflow-hidden rounded-full bg-green-500 text-white font-bold text-2xl py-6 px-12
          transform transition-all duration-300 ease-in-out
          hover:bg-green-400 hover:scale-105 hover:shadow-lg
          active:bg-green-600 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-green-300
        `}
      >
        <span className="relative z-10 flex items-center justify-center">
          <Play className={`mr-2 ${isHovered ? "animate-bounce" : ""}`} />
          Start Game
        </span>
        <span
          className={`
            absolute inset-0 bg-white
            transition-all duration-300 ease-in-out
            ${isHovered ? "opacity-20 scale-100" : "opacity-0 scale-0"}
          `}
        />
      </button>
    </div>
  );
};
