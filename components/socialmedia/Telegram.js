"use client";
import React from "react";
import Link from "next/link"; 
import { FaTelegramPlane } from "react-icons/fa";
import { FaRobot } from 'react-icons/fa';

function Telegram() {
  return (
    <Link
      href="https://t.me/aktu_brand"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex z-100 items-center fixed bottom-4 left-4 gap-2 bg-blue-400 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-full  cursor-pointer transition-all duration-300"
    >
      <FaTelegramPlane className="text-xl" />
      Join Now</Link>
  );
}

export default Telegram;
