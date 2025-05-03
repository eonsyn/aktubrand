import React from 'react';
import Link from 'next/link';
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
];

function BranchSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {branches.map((branch, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md   flex flex-col md:flex-row overflow-hidden"
        >
          <img
            src={branch.image}
            alt={branch.name}
            className="w-full md:w-1/2 h-full object-cover"
          />
          <div className="flex flex-col justify-between p-4 w-full md:w-1/2">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{branch.name}</h2>
              <p className="text-gray-600 text-base tracking-tight">{branch.description}</p>
            </div>
            <div className="mt-6 md:mt-auto">
              <Link
                href={branch.link}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Go To
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BranchSection;
