// app/blog/page.jsx

export const revalidate = 60; // ⏱ Revalidate every 60 seconds (ISR)

import React from 'react';
import Link from 'next/link';

async function Page() {
  const host = process.env.HOST_URL || 'http://localhost:3000'; // fallback for dev

  const res = await fetch(`${host}/api/blog/save-article`, {
    next: { revalidate: 60 }, // 👈 This is required for ISR
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${res.status}`);
    return <div>Article not found</div>;
  }

  const data = await res.json();
  const articles = data.articles || [];

  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Explore Our Latest Blogs</h1>

      {articles.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <Link key={idx} href={`/blog/${article.slug}`}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                {article.thumbnailUrl && (
                  <img
                    src={article.thumbnailUrl}
                    alt={article.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                  <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
                    {article.tags?.slice(0, 3).join(', ')}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blog posts found.</p>
      )}
    </div>
  );
}

export default Page;
