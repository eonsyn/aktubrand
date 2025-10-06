'use client';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import React from 'react';

const Searchbar = () => {
  const branches = [
    {
      name: 'Computer Science',
      image: 'https://ellenkicet.ac.in/wp-content/uploads/2024/11/CSE3.png',
      description: 'Explore algorithms, software development, and emerging technologies in Computer Science.',
      link: '/branch/cse'
    },
    {
      name: 'Mechanical Engg.',
      image: 'https://mitkannur.ac.in/wp-content/uploads/2024/01/MECHANICAL-ENGINEERING-COVER-IMAGE.jpg',
      description: 'Dive into the world of machines, design, thermodynamics, and manufacturing.',
      link: '/branch/mechanical'
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6">
      {branches.map((branch, index) => (
        <Link
          key={index}
          href={branch.link}
          className="group relative w-full sm:w-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[var(--border)]"
        >
          <img
            src={branch.image}
            alt={branch.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 bg-[var(--card-background)]">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <FiSearch className="text-[var(--accent)]" /> {branch.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-2">{branch.description}</p>
            <div className="mt-4">
              <button className="bg-[var(--accent)] text-white px-4 py-2 rounded-full hover:bg-[var(--accent-hover)] transition">
                Go To {branch.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Searchbar;
