import React from 'react';
import Link from 'next/link';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function Page() {
  return (
    <div className="min-h-screen md:min-h-[80vh] bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-orange-800">
          Choose Your Year
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {years.map((year, index) => (
            <Link href={`/pyqs/${index + 1}`} key={index}>
              <div className="cursor-pointer bg-orange-100 hover:bg-orange-200 text-orange-900 font-medium py-4 px-6 rounded-xl shadow-md text-center transition duration-200">
                {year}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
