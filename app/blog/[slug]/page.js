// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ required
  const formattedTitle = slug.replaceAll('-', ' ');
  return {
    title: `${formattedTitle || 'Blog'} | aktu brand`,
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params; // ✅ required
  const res = await fetch(`${process.env.HOST_URL}/api/blog/${slug}`, {
    next: { revalidate: 60*60*10 }, // ✅ Enable ISR, revalidate every 60 seconds
  });

  const post = await res.json();
  const article = post.article;
  if (!article) {
    return <div className="min-h-screen">Article not found</div>;
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 ">By {article.author}</p>
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
          case 'heading': {
            const HeadingTag = `h${block.level || 1}`;
            return <HeadingTag key={index} className="text-2xl font-semibold mt-3 mb-1">{block.value}</HeadingTag>;
          }
          case 'paragraph':
            return <p key={index} className="text-base leading-relaxed mb-4">{block.value}</p>;
          case 'code':
            return (
              <pre key={index} className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto mb-4">
                <code>{block.value}</code>
              </pre>
            );
          case 'image':
            return (
              <div key={index} className="flex items-center flex-col h-[40vh]">
                <img title={block.alt} src={block.value} className="rounded-lg h-[90%]" alt={block.alt} />
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
    </main>
  );
}
