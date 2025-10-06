import React from "react";
import ArticleCard from "@/components/cards/ArticleCard";
import AktuBlogCardInFeed from "@/components/googleAds/AktuBlogCardInFeed";

export const revalidate = 60;

async function Page() {
  const host = process.env.HOST_URL || "http://localhost:3000";

  const res = await fetch(`${host}/api/blog/save-article`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${res.status}`);
    return <div>Article not found</div>;
  }

  const data = await res.json();
  const articles = data.articles || [];

  // Array to hold both article cards and ad components
  const cardsWithAds = [];

  // Randomly decide to insert ad after every 2 or 3 articles
  const interval = Math.random() > 0.5 ? 4 : 3;

  articles.forEach((article, idx) => {
    // Push the article card
    cardsWithAds.push(<ArticleCard key={`article-${idx}`} article={article} />);

    // After every 2 or 3 articles, insert an ad
    if ((idx + 1) % interval === 0) {
      cardsWithAds.push(
        <div key={`ad-${idx}`} className="col-span-1">
          <AktuBlogCardInFeed />
        </div>
      );
    }
  });

  return (
    <div className="min-h-screen px-6 py-8 bg-[var(--background)] text-[var(--text-primary)]">
      <h1 className="text-3xl font-bold mb-8 text-center text-[var(--text-primary)] drop-shadow-md">
        Explore Our Latest Blogs
      </h1>

      {cardsWithAds.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cardsWithAds}
        </div>
      ) : (
        <p className="text-center text-[var(--text-secondary)]">
          No blog posts found.
        </p>
      )}
    </div>
  );
}

export default Page;
