'use client';

import { FaArrowDown } from 'react-icons/fa';

export default function ButtonBounce() {
  const handleScroll = () => {
    const target = document.getElementById('quantum');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleScroll}
        className="flex  gap-2 items-center animate-bounce text-white bg-highlight px-6 py-3 rounded-full shadow-md cursor-pointer transition duration-300"
      >
        <span className="mb-1">Scroll down</span>
        <FaArrowDown className="text-lg" />
      </button>
    </div>
  );
}
