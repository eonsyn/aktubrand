import connectDB from "@/utils/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  await connectDB();
  const posts = await Post.find({})
    .populate("author", "name image")
    .sort({ createdAt: -1 });
  return new Response(JSON.stringify(posts), { status: 200 });
}
function generateSlug(input) {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-")         // replace spaces with -
    .replace(/-+/g, "-");         // collapse multiple -
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { title, content, slug } = await req.json();
  if (!title || !content)
    return new Response("Missing fields", { status: 400 });

  await connectDB();

  // ✅ Generate and sanitize slug
  let safeSlug = slug ? generateSlug(slug) : generateSlug(title);

  // ✅ Ensure uniqueness
  let uniqueSlug = safeSlug;
  let counter = 1;
  while (await Post.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${safeSlug}-${counter++}`;
  }

  // ✅ Create post
  const post = await Post.create({
    title,
    content,
    slug: uniqueSlug,
    author: session.user._id,
  });

  const populatedPost = await post.populate("author", "name image");
  return new Response(JSON.stringify(populatedPost), { status: 201 });
}