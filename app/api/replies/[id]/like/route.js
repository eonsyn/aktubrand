import connectDB from "@/utils/db";
import Reply from "@/models/Reply";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const replyId = params.id;
  await connectDB();
  const reply = await Reply.findById(replyId);
  if (!reply) return new Response("Reply not found", { status: 404 });

  const userId = session.user._id;
  if (reply.likes.includes(userId)) {
    reply.likes.pull(userId); // unlike
  } else {
    reply.likes.push(userId); // like
  }

  await reply.save();
  return new Response(JSON.stringify(reply.likes), { status: 200 });
}
