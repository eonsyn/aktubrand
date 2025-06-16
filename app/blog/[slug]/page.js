// app/blog/[slug]/page.jsx
import Link from "next/link";
import BlogSuggestions from '@/components/blog/BlogSuggestions';
import UserBlogRender from "@/components/blog/UserBlogRender";
import ImageComponent from "@/components/blog/ImageComponent";
import BlockAi from "@/components/blog/ai/BlockAi";
import GoogleVerticleAd from "@/components/ads/GoogleVerticleAd";
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.HOST_URL}/api/blog/${slug}`, {
      next: { revalidate: 60 * 10 },
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
export const revalidate = 3600;

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

  const res = await fetch(`${host}/api/blog/${slug}`, { next: { revalidate: 3600 } });

  if (!res.ok) { 
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-semibold mb-2">Article Not Found</h2>
        <p className="text-sm">Sorry, the article you're looking for doesn't exist or may have been removed.</p>
      </div>
    </div>
  );
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
function extractPlainTextFromContent(contentArray) {
  return contentArray
    .filter(block => block.type === 'paragraph' || block.type === 'heading')
    .map(block => {
      if (block.type === 'heading') {
        return `${'#'.repeat(block.level || 1)} ${block.value}`;
      }
      return block.value;
    })
    .join('\n\n');
}

  return (
    <><main className="min-h-screen mb-4 w-full flex">
  {/* Left Side - Red */}
  <div className="hidden md:block  w-[20%] px-4 ">
     <GoogleVerticleAd slot="6204322368"/> 
  </div>

  {/* Center Content */}
  <div className="w-full px-3 md:w-[60%]    md:mx-auto md:px-4 pt-2 pb-4 md:py-8 text-gray-800  ">
    <div className="fixed bottom-4 right-4 h-6 w-6 z-50">
    <BlockAi article={extractPlainTextFromContent(article.content)} />
    </div>

    <UserBlogRender article={article} />

    <div className="mt-8 text-sm text-gray-500">
      Tags: {article.tags?.map((tag, i) => (
        <span key={i} className="bg-gray-200 px-2 py-1 rounded mr-2">
          #{tag}
        </span>
      ))}
    </div>

  </div>
    

  {/* Right Side - Black */}
  <div className="w-[20%] hidden   md:flex  flex-col p-2 overflow-y-auto">
    <BlockAi article={extractPlainTextFromContent(article.content)} />
  </div>
</main>
<hr />
<div className=" rounded-2xl mx-5 px-2 pt-2 pb-3.5 transition-all ease-in-out duration-300">
<BlogSuggestions  tags={article.tags} slug={article.slug} />

</div>
    </>
   

  );
}
