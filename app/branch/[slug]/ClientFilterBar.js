'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SubjectCard from '@/components/cards/SubjectCard';
import MobileBar from '@/components/branch/MobileBar';
import AktuBlogCardInFeed from '@/components/googleAds/AktuBlogCardInFeed';

// Wrap the client component in Suspense internally
export default function ClientFilterBarWrapper(props) {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading Subjects...</div>}>
      <ClientFilterBar {...props} />
    </Suspense>
  );
}

function ClientFilterBar({ subjects, branchSlug }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState('both');
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');

  const filteredSubjects = useMemo(() => {
    if (!search) return subjects;
    return subjects.filter((subject) => {
      const matchesSearch = subject.subjectName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = filter === 'both' || subject.type === filter;
      return matchesSearch && matchesType;
    });
  }, [search, filter, subjects]);

  const suggestions = useMemo(() => {
    if (!search) return [];
    return subjects
      .filter((s) => s.subjectName.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search, subjects]);

  const cardsWithAds = useMemo(() => {
    const result = [];
    filteredSubjects.forEach((subject, index) => {
      result.push(
        <SubjectCard
          key={subject._id || `subject-${index}`}
          subject={{ ...subject, _id: subject._id?.toString() }}
          index={index}
        />
      );
      if ((index + 1) % 3 === 0) {
        result.push(
          <div key={`ad-${index}`} className="col-span-1">
            <AktuBlogCardInFeed />
          </div>
        );
      }
    });
    return result;
  }, [filteredSubjects]);

  // Track scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setScrollDir(currentScrollY > lastScrollY ? 'down' : 'up');
        lastScrollY = currentScrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSuggestionClick = (value) => {
    setSearch(value);
    setSuggestionsVisible(false);
    router.replace(`?search=${encodeURIComponent(value)}#quantum`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      router.replace(`?search=${encodeURIComponent(search)}#quantum`);
      setSuggestionsVisible(false);
    }
  };

  return (
    <>
      {/* Sticky Filter/Search Bar */}
      <div
        className={`sticky z-10 py-2 md:py-4 bg-background/80 backdrop-blur-md transition-all duration-300 ${
          scrollDir === 'down' ? 'top-0' : 'top-14'
        }`}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="hidden md:flex w-full items-center gap-2 relative">
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
              className="w-full border bg-white border-gray-300 rounded-lg py-3 px-4 shadow-sm focus:ring-highlight focus:border-highlight"
            />

            <div className="flex gap-2">
              {['quantum', 'notes', 'both'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilter(type);
                    setSearch('');
                    router.replace(`?search=`); // reset URL
                  }}
                  className={`px-4 py-2 rounded-md ${
                    filter === type
                      ? 'bg-highlight text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
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

          <div className="md:hidden mt-2 w-full">
            <MobileBar
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              suggestions={suggestions}
              suggestionsVisible={suggestionsVisible}
              handleKeyDown={handleKeyDown}
              setSuggestionsVisible={setSuggestionsVisible}
              handleSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </div>

      {/* Subject Cards + Ads */}
      {filteredSubjects.length > 0 ? (
        <div
          id="quantum"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6"
        >
          {cardsWithAds}
        </div>
      ) : (
        <div
          id="quantum"
          className="text-center rounded-2xl flex items-center justify-center bg-red-400 h-[80vh] md:h-[50vh] py-10 mt-6"
        >
          <p className="text-xl text-white">
            <span className="text-4xl block font-bold">Search Another Subject</span>
            No subjects found matching your criteria.
          </p>
        </div>
      )}
    </>
  );
}
