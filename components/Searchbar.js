'use client';
import Link from 'next/link';
import { FiCpu, FiSettings } from 'react-icons/fi';
import React from 'react';

const Searchbar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6">
      {/* CSE Button */}
      <Link
        href="/branch/cse"
        className="flex items-center gap-3 bg-[var(--accent)] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[var(--accent-hover)] transition shadow-md hover:shadow-lg"
      >
        <FiCpu className="text-2xl" />
        Computer Science
      </Link>

      {/* Mechanical Button */}
      <Link
        href="/branch/mechanical"
        className="flex items-center gap-3 bg-[var(--accent)] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[var(--accent-hover)] transition shadow-md hover:shadow-lg"
      >
        <FiSettings className="text-2xl" />
        Mechanical Engg.
      </Link>
    </div>
  );
};

export default Searchbar;
