"use client"
import React, { useState } from 'react';

const faqs = [
  {
    question: "What is AKTU BRAND?",
    answer: "AKTU BRAND is a platform where AKTU students can access PDF notes, Quantum books, blog posts, and tips to crack semester exams efficiently.",
  },
  {
    question: "Are the resources free to download?",
    answer: "Yes, all essential resources like PDFs, previous year papers, and notes are freely available for download.",
  },
  {
    question: "How do I prepare for AKTU semester exams using this website?",
    answer: "Start with our subject-wise guides, download recommended PDFs, and read important blog posts written by toppers and educators.",
  },
  {
    question: "How often is the content updated?",
    answer: "Our content is regularly updated based on the latest AKTU syllabus, exam patterns, and student feedback.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
   <section className="py-12 px-6 md:px-20 bg-[var(--background)] text-[var(--text-primary)] dark:bg-[var(--background)] dark:text-[var(--text-primary)]">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-primary)] mb-10">
      Frequently Asked Questions
    </h2>

    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-[var(--surface)] rounded-lg shadow-md p-6 cursor-pointer transition hover:shadow-lg"
          onClick={() => toggleFAQ(index)}
        >
          <h3 className="text-lg font-semibold text-[var(--link)]">
            {faq.question}
          </h3>
          {openIndex === index && (
            <p className="mt-2 text-[var(--text-secondary)]">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

  );
}

export default FaqSection;
