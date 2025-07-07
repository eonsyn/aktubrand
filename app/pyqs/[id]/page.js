// This is a Server Component by default (no 'use client')

import Link from 'next/link'

async function getSubjects(id) {
  try {
    const res = await fetch(`${process.env.HOST_URL}/api/subjects/semester`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ semester: id }),
      next: { revalidate: 60 }, // <-- ISR: revalidate every 60 seconds
    });

    const data = await res.json();
    return data.subject || [];
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
}

export async function generateStaticParams() {
 
  return ['1', '2', '3', '4'].map(id => ({ id }));
}

export default async function Page({ params }) {
  const id = params.id;
  const subjects = await getSubjects(id);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--surface)] text-[var(--text-primary)] dark:from-[var(--background)] dark:to-[var(--surface)] dark:text-[var(--text-primary)]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Subjects for Semester {id}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => (
          <Link
            key={index}
            href={subject.goto}
            className="block bg-[var(--surface)] rounded-2xl shadow-md p-6 border border-[var(--background)] hover:shadow-lg hover:border-[var(--link)] transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-[var(--link)] mb-1">
              {subject.subjectName}
            </h3>
            <p className="text-[var(--text-secondary)]">{subject.fullName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
