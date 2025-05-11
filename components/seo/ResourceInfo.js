import React from "react";
import {
  FaBookOpenReader,
  FaDiagramProject,
  FaLightbulb,
  FaFilePdf,
  FaClipboardCheck,
  FaTags,
} from "react-icons/fa6";
import { FaBook } from "react-icons/fa";

export default function ResourceInfo() {
  const resources = [
    {
      label: "Quantum PDFs for CSE, ECE, ME & more",
      icon: <FaBookOpenReader className="text-amber-600 text-xl shrink-0" />,
    },
    {
      label: "Subject-wise breakdown for all semesters",
      icon: <FaDiagramProject className="text-amber-600 text-xl shrink-0" />,
    },
    {
      label: "Notes for Software Engineering & Project Management",
      icon: <FaLightbulb className="text-amber-600 text-xl shrink-0" />,
    },
    {
      label: "One-click access to AKTU Quantum PDFs",
      icon: <FaFilePdf className="text-amber-600 text-xl shrink-0" />,
    },
    {
      label: "Perfect for revision, assignments & last-minute prep",
      icon: <FaClipboardCheck className="text-amber-600 text-xl shrink-0" />,
    },
    {
      label: "Filtered by semester, subject code, tags & type",
      icon: <FaTags className="text-amber-600 text-xl shrink-0" />,
    },
  ];

  return (
    <section className="p-6 sm:p-10 my-12   ">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-amber-700 tracking-tight mb-2">
            What You'll Find Here
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your all-in-one AKTU study hub — tailored for CSE 3rd year students and beyond.
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resources.map((item, idx) => (
          <li
            key={idx}
            className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              {item.icon}
              <p className="text-gray-800 font-medium group-hover:text-amber-700 transition">
                {item.label}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center text-sm text-gray-600 max-w-xl mx-auto px-4">
        Common searches like <em className="text-gray-700">"aktu quantum 3rd year cse"</em>,{" "}
        <em className="text-gray-700">"software engineering aktu pdf"</em>, or{" "}
        <em className="text-gray-700">"aktu study resources"</em> all lead here. Bookmark this page or share it with friends!
      </p>
    </section>
  );
}
