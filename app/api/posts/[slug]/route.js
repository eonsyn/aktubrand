import connectDB from "@/utils/db";
import Post from "@/models/Post";

export async function GET(req) {
  const slug = req.nextUrl.pathname.split("/posts/").pop();
  console.log("slug is :",slug)
  await connectDB();
  const post = await Post.findOne({ slug }).populate("author", "name image");
  if (!post) return new Response("Post not found", { status: 404 });
  return new Response(JSON.stringify(post), { status: 200 });
}
