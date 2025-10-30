'use client';
import { useSession } from "next-auth/react";
import { useState } from "react";
import PostList from "@/components/post/PostList";

export default function PostsPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!session) return alert("Login to post!");
    if (!title || !content) return alert("Enter title and content");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, slug }),
      });
      if (res.ok) {
        setTitle(""); setContent(""); setSlug("");
        window.location.reload();
      } else {
        const err = await res.text();
        alert(err);
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-3xl min-h-screen mx-auto p-4 space-y-6">
      {session && (
        <div className="border p-4 rounded-lg shadow-sm bg-white space-y-2">
          <h2 className="font-bold text-lg">Create a Post</h2>
          <input type="text" placeholder="Post title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded"/>
          <input type="text" placeholder="Slug (optional)" value={slug} onChange={e => setSlug(e.target.value)} className="w-full border px-3 py-2 rounded"/>
          <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} className="w-full border px-3 py-2 rounded"/>
          <button onClick={handlePost} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Post</button>
        </div>
      )}
      <PostList />
    </div>
  );
}
