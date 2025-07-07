'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function Page({ params }) {
  const id = params.id
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/subjects/semester', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ semester: id }),
        })
        const data = await res.json()
        setSubjects(data.subject)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

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

  )
}

export default Page
