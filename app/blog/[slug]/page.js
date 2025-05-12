// app/blog/[slug]/page.jsx
import Link from "next/link";
import BlogSuggestions from '@/components/blog/BlogSuggestions';

import ArticleCard from "@/components/cards/ArticleCard";
import ImageComponent from "@/components/blog/ImageComponent";
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${process.env.HOST_URL}/api/blog/${slug}`, {
      next: { revalidate: 60 * 60 },
    });

    const { article } = await res.json();

    if (!article) {
      return {
        title: 'Blog Not Found | aktu brand',
        description: 'This blog post does not exist or has been removed.',
      };
    }

    const formattedTitle = article.title || slug.replaceAll('-', ' ');
    const description =
      article.content?.find((b) => b.type === 'paragraph')?.value.slice(0, 160) ||
      'Read the latest article on aktu brand.';
    const image = article.thumbnailUrl || 'https://aktubrand.vercel.app/default-thumbnail.jpg';

    return {
      title: `${formattedTitle} | aktu brand`,
      description,
      keywords: article.tags?.join(', '),

      openGraph: {
        title: `${formattedTitle} | aktu brand`,
        description,
        url: `https://aktubrand.vercel.app/blog/${slug}`,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: formattedTitle,
          },
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${formattedTitle} | aktu brand`,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Blog | aktu brand',
      description: 'Read the latest blog posts on aktu brand.',
    };
  }
}
export const revalidate = 7200;

export async function generateStaticParams() {
  const host = process.env.HOST_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${host}/api/blog/save-article`);
    if (!res.ok) {
      console.error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const articles = data.articles || [];

    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('generateStaticParams error:', error);
    return [];
  }
}

export default async function BlogPage({ params }) {
  const { slug } = params;
  const host = process.env.HOST_URL || 'http://localhost:3000';

  const res = await fetch(`${host}/api/blog/${slug}`, { next: { revalidate: 72000 } });

  if (!res.ok) {
    return <div>Article not found</div>;
  }

  const post = await res.json();
  const article = post.article;

  if (!article) {
    return <div className="min-h-screen">Article not found</div>;
  }
 

  function renderTextWithLinks(text) {
    if (!text || typeof text !== 'string') return null;

    // Regex to match [label](url), **bold**, and *italic*
    const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match[1]) {
        // Link match
        parts.push(
          <Link
            key={match[3] + match.index}
            href={match[3]}
            className="text-blue-500 font-bold mx-1 hover:text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[2]}
          </Link>
        );
      } else if (match[4]) {
        // Bold match (**text**)
        parts.push(<strong key={'b' + match.index}>{match[5]}</strong>);
      } else if (match[6]) {
        // Italic match (*text*)
        parts.push(<em key={'i' + match.index}>{match[7]}</em>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500">By {article.author}</p>
      <span className="text-sm text-gray-500 mb-6 block">
        {new Date(article.createdAt).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })}
      </span>
      <hr />

      {article.content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            const HeadingTag = `h${block.level || 1}`;
            return <HeadingTag key={index} className="text-2xl font-semibold mt-3 mb-1">{renderTextWithLinks(block.value)}</HeadingTag>;
          case 'paragraph':
            return <p key={index} className="text-base leading-relaxed mb-4">{renderTextWithLinks(block.value)}</p>;
          case 'code':
            return (
              <pre key={index} className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto mb-4">
                <code>{block.value}</code>
              </pre>
            );
          case 'image':
            return (
              <div key={index} className="flex items-center flex-col py-3 h-[40vh]">

                <ImageComponent imageUrl={block.value} alt={block.alt} />
                <span className="italic">{block.alt}</span>
              </div>
            );
          case 'list':
            return (
              <ul key={index} className="list-disc list-inside mb-4">
                {block.value.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}

      <div className="mt-8 text-sm text-gray-500">
        Tags: {article.tags?.map((tag, i) => (
          <span key={i} className="bg-gray-200 px-2 py-1 rounded mr-2">
            #{tag}
          </span>
        ))}
      </div>

    <BlogSuggestions tags={article.tags} slug={article.slug} />
    </main>
  );
}
