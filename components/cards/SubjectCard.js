'use client';
import React, { useState, useEffect } from 'react';

function SubjectCard({ subject, index }) {
    const [countdown, setCountdown] = useState(null);
    const [downloadReady, setDownloadReady] = useState(false);

    const truncatedSubjectName = subject.subjectName.length > 17
        ? `${subject.subjectName.slice(0, 17)}..`
        : subject.subjectName;

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setDownloadReady(true);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (downloadReady) {
            window.open(subject.pdfUrl, '_blank');
            setDownloadReady(false);
        }
    }, [downloadReady, subject.pdfUrl]);

    const handleDownload = () => {
        setCountdown(5);
    };

    return (
        <div key={index} title={subject.subjectName} className="bg-white rounded-2xl shadow-lg overflow-hidden p-3 mb-6 hover:shadow-xl transition duration-300 transform">
            <div className="flex flex-col items-center">
                <img
                    src={subject.cardImageUrl}
                    alt={subject.subjectName}
                    className="w-full h-48 object-cover rounded-lg mb-6 border-2 border-amber-300"
                />

                <h2 title={subject.subjectName} className="text-2xl w-full font-bold text-amber-800 mb-2 tracking-tight transition-colors duration-300 hover:text-amber-600">
                    {truncatedSubjectName}
                </h2>

                <p className="text-gray-700 w-full text-sm leading-relaxed mb-6 ">
                    {subject.description}
                </p>

                <div className="flex justify-between w-full text-sm text-gray-600 mb-6">
                    <div>
                        <p className="text-sm font-medium">Subject Code:</p>
                        <p className="text-amber-600 font-semibold">{subject.subjectCode || "Not available"}</p>
                    </div>
                    <div className="flex justify-end items-center">
                        <button
                            onClick={handleDownload}
                            disabled={countdown !== null && countdown > 0}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
                        >
                            {countdown !== null && countdown > 0 ? `Downloading in ${countdown}s...` : "Download"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubjectCard;
