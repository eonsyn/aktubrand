import connectDB from "@/utils/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const postId = params.id;
  await connectDB();
  const post = await Post.findById(postId);
  if (!post) return new Response("Post not found", { status: 404 });

  const userId = session.user.id;
  if (post.likes.includes(userId)) {
    post.likes.pull(userId); // unlike
  } else {
    post.likes.push(userId); // like
  }

  await post.save();
  return new Response(JSON.stringify(post.likes), { status: 200 });
}
