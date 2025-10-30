import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "AktuUser" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "AktuUser" }],
});

export default mongoose.models.Reply || mongoose.model("Reply", ReplySchema);
