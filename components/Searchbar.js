'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const [showModal, setShowModal] = useState(false);

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
      link: '/branch/me'
    }
    // Add more branches if needed
  ];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer text-2xl"
      >
        <FiSearch />
        Search Now
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
        <div className="bg-background max-w-5xl w-full rounded-2xl shadow-xl overflow-hidden max-h-[90vh]">
          
          {/* Sticky Header */}
          <div className="sticky top-0 z-10  flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Choose Your Branch</h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-red-500 text-3xl font-bold leading-none"
            >
              &times;
            </button>
          </div>
      
          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 max-h-[calc(90vh-64px)] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm flex flex-col md:flex-row overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full md:w-1/2 h-40 object-cover"
                />
                <div className="flex flex-col justify-between p-4 w-full md:w-1/2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{branch.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{branch.description}</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={branch.link}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                    >
                      Go To
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      )}
    </>
  );
};

export default Searchbar;
