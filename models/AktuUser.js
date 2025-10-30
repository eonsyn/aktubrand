import mongoose from "mongoose";

const AktuUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AktuUser || mongoose.model("AktuUser", AktuUserSchema);
