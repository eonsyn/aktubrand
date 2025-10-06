'use client';
import React, { useState ,useEffect } from 'react';
import { IoMdClose, IoMdSearch } from "react-icons/io";

function MobileBar({
  filter,
  setFilter,
  suggestions,
  suggestionsVisible,
  setSuggestionsVisible,
  search,
  setSearch,
  handleKeyDown,
  handleSuggestionClick,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const filterOptions = [
    { label: 'Quantum', value: 'quantum' },
    { label: 'Notes', value: 'notes' },
    { label: 'Both', value: 'both' },
  ];

  return (
    <div className="w-full md:hidden flex items-center h-12">
      <div className="w-full flex items-center justify-between gap-2">
        {/* Filter buttons or search input */}
        {isOpen ? (
          <div className="flex w-[80%] items-center justify-between p-1 rounded-xl bg-white backdrop-blur-lg shadow-lg">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {setFilter(option.value)
                  
                    setSearch('');
                    router.replace(`?search=`); 
                }}
                className={`px-4 py-2 rounded-md ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="relative w-[90%]">
            <div className="flex w-full">
              <button
                type="button"
                className="bg-white border border-gray-300 py-2.5 px-3 rounded-l-lg text-highlight text-2xl"
              >
                <IoMdSearch />
              </button>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSuggestionsVisible(true);
                }}
                onFocus={() => setSuggestionsVisible(true)}
                onBlur={() => setTimeout(() => setSuggestionsVisible(false), 100)}
                onKeyDown={handleKeyDown}
                placeholder="Search subjects..."
                className="w-full rounded-r-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none"
              />
            </div>
            {suggestionsVisible && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-20">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onMouseDown={() => handleSuggestionClick(s.subjectName)}
                  >
                    {s.subjectName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Toggle Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 rounded-full bg-red-400 flex items-center justify-center cursor-pointer"
        >
          {isOpen ? (
            <IoMdSearch className="text-white text-2xl" />
          ) : (
            <IoMdClose className="text-white text-2xl" />
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileBar;
