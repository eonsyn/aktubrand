import React from 'react';

function WhyChooseUs() {
  return (
    <section className=" py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose <span className="text-highlight">AKTU BRAND</span>?</h2>
        <p className="text-gray-600 mb-10">Your all-in-one resource hub to crack AKTU semester exams with ease.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Download PDFs</h3>
            <p className="text-gray-600">Get access to Quantum books, handwritten notes, previous year papers, and essential PDFs for all subjects.</p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Crack Exams Easily</h3>
            <p className="text-gray-600">We provide carefully curated content that focuses on exam patterns, frequently asked questions, and must-study topics.</p>
          </div>

          <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-pink-700 mb-3">Important Blog Posts</h3>
            <p className="text-gray-600">Explore tips, strategies, time management hacks, and subject-wise preparation guides from toppers and faculty.</p>
          </div>
        </div>

        <div className="mt-10">
          <a 
            href="/resources" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Explore Resources
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
