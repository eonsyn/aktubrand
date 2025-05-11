// app/blog/page.jsx

export const revalidate = 60; // ⏱ Revalidate every 60 seconds (ISR)
 
import React from 'react';
 
import ArticleCard from "@/components/cards/ArticleCard";
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
        <div className="grid gap-6 grid-cols-1  sm:grid-cols-2   lg:grid-cols-3">
          {articles.map((article, idx) => (
             <ArticleCard key={idx} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blog posts found.</p>
      )}
    </div>
  );
}

export default Page;
