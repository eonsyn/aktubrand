'use client';
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ReplyItem({ reply }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(reply.likes?.length || 0);

  const handleLike = async () => {
    if (!session) return alert("Login to like replies");
    try {
      const res = await fetch(`/api/replies/${reply._id}/like`, { method: "PATCH" });
      if (res.ok) setLikes(reply.likes.includes(session.user.id) ? likes - 1 : likes + 1);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="border p-2 rounded bg-gray-50 flex justify-between items-center">
      <div>
        <p>{reply.content}</p>
        <p className="text-sm text-gray-500">By {reply.author.name}</p>
      </div>
      <button onClick={handleLike} className="px-2 py-1 rounded bg-red-100 hover:bg-red-600 hover:text-white transition">
        ❤️ {likes}
      </button>
    </div>
  );
}
