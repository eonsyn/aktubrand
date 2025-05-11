import React from "react";

export default function SecondYearQuantum() {
  const cards = [
    {
      title: "Understanding AKTU Quantum Series",
      content: `The AKTU Quantum Series is a collection of essential study materials for B.Tech students, compiled for each semester. These PDFs cover various topics in Mathematics, Computer Science, Engineering, and more, making it easier to grasp complex concepts and ace exams.`,
    },
    {
      title: "Why Use AKTU Quantum PDFs?",
      content: `The Quantum PDFs offer concise explanations, step-by-step solutions, and exam-focused content. Whether you're struggling with a subject or need a quick revision guide, Quantum PDFs are your go-to resource.`,
    },
    {
      title: "Subjects Covered in 2nd Year",
      content: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Mathematics-IV</li>
          <li>Technical Communication</li>
          <li>Python Programming</li>
          <li>Cyber Security</li>
          <li>Mechanics of Solids</li>
          <li>Energy Mechanics</li>
        </ul>
      ),
    },
    {
      title: "How to Maximize Your Learning",
      content: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Skim topics to get a general overview.</li>
          <li>Understand concepts via solved examples.</li>
          <li>Make notes of formulas and key points.</li>
          <li>Practice frequently to retain knowledge.</li>
          <li>Focus on topics often asked in exams.</li>
        </ul>
      ),
    },
    {
      title: "Where to Find Quantum PDFs",
      content: `Find resources from senior students, educational forums, or academic websites. Many platforms offer free and categorized PDF downloads for each branch and semester.`,
    },
    {
      title: "Top Tips for Second-Year Students",
      content: (
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Create a study plan and stick to it.</li>
          <li>Study in short sessions to stay focused.</li>
          <li>Use past papers for practice.</li>
          <li>Avoid last-minute cramming.</li>
          <li>Group study for tough subjects helps!</li>
        </ul>
      ),
    },
  ];

  return (
    <section className="p-6 sm:p-8 md:p-12   my-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-highlight">AKTU Quantum Resources</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
          Are you a second-year B.Tech student at AKTU? Explore essential Quantum Series study resources for every branch—helping you access PDFs, notes, and quick revision tools for exam success.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-bold text-highlight mb-2">{card.title}</h3>
            <div className="text-sm text-gray-600 leading-relaxed">{card.content}</div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
        The AKTU Quantum Series is your shortcut to smart learning. Stay focused, revise regularly, and use these resources wisely for your academic growth. ✨
      </p>
    </section>
  );
}
