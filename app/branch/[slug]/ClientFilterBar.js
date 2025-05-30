'use client';

import { useState, useMemo } from 'react';
import SubjectCard from '@/components/cards/SubjectCard';
import MobileBar from '@/components/branch/MobileBar';

export default function ClientFilterBar({ subjects, branchSlug }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('both');

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesSearch = subject.subjectName.toLowerCase().includes(search.toLowerCase());
      const matchesType = filter === 'both' || subject.type === filter;
      return matchesSearch && matchesType;
    });
  }, [search, filter, subjects]);

  return (
    <>
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
              {['quantum', 'notes', 'both'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-md ${filter === type ? 'bg-highlight text-white' : 'bg-gray-200'}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-2 w-full">
            <MobileBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>

      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
          {filteredSubjects.map((subject, index) => (
            <SubjectCard
              key={subject._id || index}
              subject={{
                ...subject,
                _id: subject._id?.toString()
              }}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 mt-6">
          <p className="text-xl text-gray-600">
            No subjects found matching your criteria for "{branchSlug.toUpperCase()}".
          </p>
        </div>
      )}
    </>
  );
}
