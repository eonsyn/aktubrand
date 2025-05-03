'use client';

export default function ResourceInfo() {
  return (
    <section className="  p-8 rounded-3xl  my-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-amber-700">📚 What You'll Find Here</h2>
        <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">
          This page is your all-in-one AKTU study hub. Whether you're a CSE 3rd year student or in another branch, here’s what you get:
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-800 text-base font-medium">
        <li className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          ✅ Quantum PDFs for CSE, ECE, ME & more
        </li>
        <li className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          📖 Subject-wise breakdown for all semesters
        </li>
        <li className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          🧠 Notes for Software Engineering & Project Management
        </li>
        <li className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          🔍 One-click access to AKTU Quantum PDFs
        </li>
        <li className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          📌 Perfect for revision, assignments & last-minute prep
        </li>
        <li className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          🏷️ Filtered by semester, subject code, tags & type
        </li>
      </ul>

      <p className="mt-8 text-center text-sm text-gray-600 max-w-xl mx-auto">
        Commonly searched terms like <em>"aktu quantum 3rd year cse"</em>, <em>"software engineering aktu pdf"</em>, or <em>"aktu study resources"</em> — all lead right here. Bookmark this page or share it with friends!
      </p>
    </section>
  );
}
