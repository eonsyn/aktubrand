import connectDB from "@/utils/db";
import Post from "@/models/Post";
import Reply from "@/models/Reply";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const slug = req.nextUrl.pathname.split("/posts/")[1].split("/replies")[0];
  await connectDB();

  const post = await Post.findOne({ slug });
  if (!post) return new Response("Post not found", { status: 404 });

  const replies = await Reply.find({ postId: post._id })
    .populate("author", "name image")
    .sort({ createdAt: 1 });

  return new Response(JSON.stringify(replies), { status: 200 });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const slug = req.nextUrl.pathname.split("/posts/")[1].split("/replies")[0];
  const { content } = await req.json();
  if (!content) return new Response("Content required", { status: 400 });

  await connectDB();
  const post = await Post.findOne({ slug });
  if (!post) return new Response("Post not found", { status: 404 });

  const reply = await Reply.create({
    postId: post._id,
    author: session.user._id,
    content,
  });

  const populatedReply = await reply.populate("author", "name image");
  return new Response(JSON.stringify(populatedReply), { status: 201 });
}
