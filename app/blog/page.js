import GoogleBlogAds from '@/components/googleAds/GoogleBlogAds';
export const revalidate = 60;

import React from 'react';
import ArticleCard from "@/components/cards/ArticleCard";

async function Page() {
  const host = process.env.HOST_URL || 'http://localhost:3000';

  const res = await fetch(`${host}/api/blog/save-article`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${res.status}`);
    return <div>Article not found</div>;
  }

  const data = await res.json();
  const articles = data.articles || [];

  const numberOfAds = Math.min(3, Math.floor(articles.length / 2)); // Max 3 ads, 1 ad per 2 articles
  const adIndexes = new Set();

  while (adIndexes.size < numberOfAds) {
    const randomIndex = Math.floor(Math.random() * (articles.length + 1));
    adIndexes.add(randomIndex);
  }

  const cardsWithAds = [];

  articles.forEach((article, idx) => {
    if (adIndexes.has(idx)) {
      cardsWithAds.push(
        <div key={`ad-${idx}`} className="col-span-1">
          <GoogleBlogAds />
        </div>
      );
    }

    cardsWithAds.push(
      <ArticleCard key={`article-${idx}`} article={article} />
    );
  });

  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Explore Our Latest Blogs</h1>

      {cardsWithAds.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cardsWithAds}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blog posts found.</p>
      )}
    </div>
  );
}

export default Page;
