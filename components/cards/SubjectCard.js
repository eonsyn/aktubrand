import React from 'react'
import Link from 'next/link'

function SubjectCard({ subject, index }) {
    const truncatedSubjectName = subject.subjectName.length > 17
        ? `${subject.subjectName.slice(0, 17)}..`
        : subject.subjectName;

    return (
        <div key={index} title={subject.subjectName} className="bg-white rounded-2xl shadow-lg overflow-hidden p-3 mb-6 hover:shadow-xl transition duration-300 transform ">
            <div  className="flex flex-col items-center">
                {/* Card Image */}
                <img
                    src={subject.cardImageUrl}
                    alt={subject.subjectName}
                    className="w-full h-48 object-cover rounded-lg mb-6 border-2 border-amber-300"
                />

                {/* Subject Name */}
                <h2 title={subject.subjectName} className="text-2xl w-full font-bold text-amber-800 mb-2  tracking-tight transition-colors duration-300 hover:text-amber-600">
                    {truncatedSubjectName}
                </h2>

                {/* Subject Description */}
                <p className="text-gray-700 w-full text-sm leading-relaxed mb-6 ">
                    {subject.description}
                </p>

                {/* PDF Type and Subject Code */}
                <div className="flex justify-between w-full text-sm text-gray-600 mb-6">
                    <div>
                        <p className="text-sm font-medium">Subject Code:</p>
                        <p className="text-amber-600 font-semibold">{subject.subjectCode? (subject.subjectCode):("Not available")}</p>
                    </div>
                    <div className="flex justify-end items-center">
                        <p className="text-sm text-gray-500">
                            <Link
                                href={subject.pdfUrl}
                                target="_blank"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                            >
                                download
                            </Link>
                            {/* PDF Type: <span className="font-medium text-blue-600">{subject.type}</span> */}
                        </p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default SubjectCard
