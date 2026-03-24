import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    movieName: { type: String, required: true },
    year: { type: Number },
    language: { type: String },
    screenshot: { type: String },
    status: { type: String, enum: ["pending", "completed"], default: "pending" }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
