"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { IoMdClose, IoMdSearch } from "react-icons/io";

function MobileBar({ filter, search }) {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { label: 'Quantum', value: 'quantum' },
    { label: 'Notes', value: 'notes' },
    { label: 'Both', value: 'both' },
  ];

  const getFilterLink = (type) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set('search', search);
    if (type !== 'both') queryParams.set('filter', type);
    return `?${queryParams.toString()}`;
  };

  return (
    <div className="w-full   md:hidden h-12 flex items-center   ">
      <div className="w-full flex items-center justify-evenly">
        {isOpen ? (
            <div className='flex w-[80%] items-center justify-between p-1 rounded-xl bg-white  backdrop-blur-lg shadow-lg'>
            {  filterOptions.map((option, idx) => (
            <Link key={idx} href={getFilterLink(option.value)}>
              <button
                className={`px-4 py-2 rounded-md ${
                  filter === option.value ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            </Link>
          ))   }
            </div>
         
        ) : (
            <form
            method="GET"
            className="flex items-center max-w-xl  p-2 rounded-2xl   "
          >
            {/* Input with icon inside */}
            <div className="relative flex">
             {/* Submit Button */}
            <button
              type="submit"
              className="bg-white border border-gray-300  text-highlight py-2.5 border-r-0 rounded-lg rounded-r-none text-2xl font-medium  transition"
            >
              <IoMdSearch />
            </button>
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search subjects..."
                className="w-full rounded-l-none  pr-4 py-2.5 bg-white border border-gray-300 border-l-0 rounded-lg text-sm   focus:outline-none pl-1  transition"
              />
              
            </div>
      
            
          </form>
        )}

        {/* Toggle Button with Slide Animation */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-12 w-12 overflow-hidden rounded-full bg-red-400 flex items-center justify-center cursor-pointer"
        >
          {/* Search Icon (Slide In/Out) */}
          <IoMdClose
            className={`absolute text-white text-2xl transform transition-all duration-300 ease-in-out ${
              isOpen ? '-translate-x-16 opacity-0' : 'translate-x-0 opacity-100'
            }`}
          />

          {/* Close Icon (Slide In/Out) */}
          <IoMdSearch
            className={`absolute text-white text-2xl transform transition-all duration-300 ease-in-out ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileBar;
