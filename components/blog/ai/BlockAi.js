'use client';
import { FaRobot } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import React, { useState } from 'react';
import AiPopUp from './AiPopUp';

function BlockAi({ article }) {
  const [isBotOpen, setIsBotOpen] = useState(false);
   
  const toggleBot = () => {
    setIsBotOpen(!isBotOpen);
  };

  return (
    <div className="w-full relative text-xl z-50">
      {isBotOpen && <AiPopUp isBotOpen={isBotOpen} article={article} onClose={toggleBot} />}

      <div
        onClick={toggleBot}
        className="fixed bottom-4 right-4 bg-[#C8281D] hover:bg-red-700 text-white text-sm px-4 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-lg"
      >
        <FaRobot className="text-lg" />
        <span className="font-semibold">Ask to Arya</span>
      </div>
    </div>
  );
}

export default BlockAi;
