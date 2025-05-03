import React from 'react';
import connectDB from '@/utils/db';
import Subject from '@/models/Subject';

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);

  await connectDB();

  const subject = await Subject.findOne({
    $or: [
      { subjectName: new RegExp(`^${slug}$`, 'i') },
      { tags: new RegExp(`^${slug}$`, 'i') }
    ]
  });

  if (!subject) {
    return <div><h1>Subject not found</h1></div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{subject.subjectName}</h1>
      <p><strong>Branch:</strong> {subject.branch}</p>
      <p><strong>Type:</strong> {subject.type}</p>
      <p><strong>Description:</strong> {subject.description}</p>
      <p><strong>PDF:</strong> <a href={subject.pdfUrl} target="_blank" className="text-blue-600 underline">View PDF</a></p>
      {subject.cardImageUrl && (
        <img src={subject.cardImageUrl} alt={subject.subjectName} className="mt-4 max-w-sm rounded shadow" />
      )}
    </div>
  );
}
