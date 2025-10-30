'use client';
import ReplyItem from "./ReplyItem";

export default function ReplyList({ replies }) {
  if (!replies.length) return <p>No replies yet. Be the first!</p>;

  return (
    <div className="space-y-2 mt-2">
      {replies.map((r) => <ReplyItem key={r._id} reply={r} />)}
    </div>
  );
}
