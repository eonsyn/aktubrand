import React from 'react';

function WhyChooseUs() {
  return (
    <section className="py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Choose <span className="text-highlight">AKTU Quantum & Notes</span>?
        </h2>
        <p className="text-gray-600 mb-10">
          The ultimate destination for AKTU students to download Quantum books, important notes, and previous year papers to ace semester exams effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-10">
  {/* Card 1 */}
  <div className="bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
    <div className="h-48 overflow-hidden">
      <img
        src="https://prastutibooks.com/cdn/shop/files/IMG-20240405-WA0005_700x.jpg?v=1712296188"
        alt="AKTU Quantum Book"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col justify-between">
      <h3 className="text-xl font-bold text-blue-700 mb-2">AKTU Quantum Books PDF</h3>
      <p className="text-gray-600 text-sm">
        Instantly download updated Quantum PDFs for all AKTU subjects like B.Tech, B.Pharm, and MBA. Start preparing with the most trusted material.
      </p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="bg-green-50 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
    <div className="h-48 overflow-hidden">
      <img
        src="https://prastutibooks.com/cdn/shop/files/IMG-20240405-WA0005_700x.jpg?v=1712296188"
        alt="Handwritten Notes"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col justify-between">
      <h3 className="text-xl font-bold text-green-700 mb-2">Handwritten Notes & PYQs</h3>
      <p className="text-gray-600 text-sm">
        Get access to high-quality handwritten notes, important questions, and previous year papers – all curated for AKTU semester exams.
      </p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
    <div className="h-48 overflow-hidden">
      <img
        src="https://prastutibooks.com/cdn/shop/files/IMG-20240405-WA0005_700x.jpg?v=1712296188"
        alt="AKTU Exam Blog"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col justify-between">
      <h3 className="text-xl font-bold text-pink-700 mb-2">Exam Tips & AKTU Blogs</h3>
      <p className="text-gray-600 text-sm">
        Learn how to prepare smartly for AKTU exams with expert blogs, topper strategies, time-saving hacks, and revision tips.
      </p>
    </div>
  </div>
</div>


        <div className="mt-10">
          <a
            href="/branch/cse"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Browse AKTU Study Resources CSE
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
