import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
  {
    quality: { type: String, required: true },
    size: { type: String, required: true },
    link: { type: String, required: true }
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    imdbRating: { type: Number, required: true },
    genre: [{ type: String }],
    language: { type: String, required: true },
    type: { type: String, enum: ["movie", "series"], required: true },
    poster: { type: String, required: true },
    screenshots: [{ type: String }],
    downloadLinks: [downloadSchema]
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
