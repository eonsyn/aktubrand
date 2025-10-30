'use client';
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  if (!posts.length) return <p>No posts yet. Be the first to post!</p>;

  return (
    <div className="space-y-4">
      
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}
