'use client';
import { useState } from "react";

export default function ReplyBox({slug, postId, fetchReplies }) {
  const [content, setContent] = useState("");

  const handleReply = async () => {
    if (!content) return alert("Enter reply content");
    const res = await fetch(`/api/posts/${slug}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      setContent("");
      fetchReplies();
    }
  };

  return (
    <div className="border p-4 rounded-lg bg-white mt-2">
      <textarea
        placeholder="Write a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <button onClick={handleReply} className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Reply {slug}
      </button>
    </div>
  );
}
