// app/course/page.js
import React from 'react';
import Link from 'next/link';
const courses = [
  'BTECH', 'BPHARM', 'MBA', 'MCA', 'MTECH',
  'BARCH', 'BFA', 'BFAD', 'BHMCT', 'MAM',
  'M PHARMA', 'M ARCH', 'MURP'
];

export default function CoursePage() {
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-900">
          Select Your Course
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Link
              key={course}
              href={`/course/${course.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-xl text-center hover:bg-blue-200 transition-all"
            >
              {course}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
