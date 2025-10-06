'use client';

import { useState, useMemo } from 'react';
import SubjectCard from '@/components/cards/SubjectCard';
import MobileBar from '@/components/branch/MobileBar';
import AktuBlogCardInFeed from '@/components/googleAds/AktuBlogCardInFeed';

export default function ClientFilterBar({ subjects, branchSlug }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('both');

  // Filter subjects based on search and filter type
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch = subject.subjectName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = filter === 'both' || subject.type === filter;
      return matchesSearch && matchesType;
    });
  }, [search, filter, subjects]);

  // Combine subjects with ads after every 3 cards
  const cardsWithAds = useMemo(() => {
    const result = [];
    filteredSubjects.forEach((subject, index) => {
      result.push(
        <SubjectCard
          key={subject._id || `subject-${index}`}
          subject={{
            ...subject,
            _id: subject._id?.toString(),
          }}
          index={index}
        />
      );

      // Insert ad after every 3 subject cards
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

  return (
    <>
      {/* Sticky Filter/Search Bar */}
      <div className="sticky top-14 z-10 py-2 md:py-4 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Desktop Search */}
          <div className="hidden md:flex w-full items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subjects..."
              className="w-full border bg-white border-gray-300 rounded-lg py-3 px-4 shadow-sm focus:ring-highlight focus:border-highlight"
            />
            <div className="flex gap-2">
              {['quantum', 'notes', 'both'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
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
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-2 w-full">
            <MobileBar
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>
      </div>

      {/* Subject Cards + Ads */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
          {cardsWithAds}
        </div>
      ) : (
        <div className="text-center py-10 mt-6">
          <p className="text-xl text-gray-600">
            No subjects found matching your criteria for “{branchSlug.toUpperCase()}”.
          </p>
        </div>
      )}
    </>
  );
}
