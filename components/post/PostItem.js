'use client';
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function PostItem({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    if (!session) return alert("Login to like posts");
    try {
      const res = await fetch(`/api/posts/like/${post._id}`, { method: "PATCH" });
      if (res.ok) setLikes(post.likes.includes(session.user.id) ? likes - 1 : likes + 1);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <Link href={`/posts/${post.slug}`}>
        <h3 className="font-bold text-lg cursor-pointer hover:text-red-600">{post.title}</h3>
      </Link>
      <p className="mt-1">{post.content}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            {post.author.image ? <img src={post.author.image} className="w-full h-full rounded-full object-cover" /> : post.author.name?.[0].toUpperCase()}
          </div>
          <span>{post.author.name}</span>
        </div>
        <button onClick={handleLike} className="px-2 py-1 rounded bg-red-100 hover:bg-red-600 hover:text-white transition">
          ❤️ {likes}
        </button>
      </div>
    </div>
  );
}
