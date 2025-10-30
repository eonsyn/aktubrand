import ReplyList from "@/components/post/ReplyList";
import ReplyBox from "@/components/post/ReplyBox";

// ✅ Revalidate this page every 60 seconds
export const revalidate = 60;

// ✅ Generate all post paths at build time
// ✅ Safe version of generateStaticParams
export async function generateStaticParams() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("⚠️ Failed to fetch posts:");
      return [];
    }

    const posts = await res.json();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (err) {
    console.warn("⚠️ generateStaticParams error:", err);
    return [];
  }
}


// ✅ Fetch a single post by slug
async function getPost(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`, {
    next: { revalidate: 60 }, // 🔄 ISR: Revalidate every 60s
  });

  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

async function getReplies(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}/replies`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function SinglePostPage({ params }) {
  const { slug } = params;
  const [post, replies] = await Promise.all([
    getPost(slug),
    getReplies(slug),
  ]);

  return (
    <div className="max-w-3xl min-h-screen mx-auto p-4 space-y-4">
      <div className="border p-4 rounded-lg shadow-sm bg-white">
        <h2 className="font-bold text-xl">{post.title}</h2>
        <p className="mt-2">{post.content}</p>
        <p className="text-sm text-gray-500 mt-1">By {post.author.name}</p>
      </div>

      {/* ✅ Client components for interactive parts */}
      <ReplyBox postId={post._id} slug={slug} />
      <ReplyList replies={replies} />
    </div>
  );
}
