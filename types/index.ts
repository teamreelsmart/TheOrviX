export type DownloadLink = {
  quality: "480p" | "720p" | "1080p" | "4K" | string;
  size: string;
  link: string;
};

export type Movie = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  releaseYear: number;
  imdbRating: number;
  genre: string[];
  language: string;
  type: "movie" | "series";
  poster: string;
  screenshots: string[];
  downloadLinks: DownloadLink[];
  createdAt: string;
};

export type MovieRequest = {
  _id: string;
  movieName: string;
  year?: number;
  language?: string;
  screenshot?: string;
  status: "pending" | "completed";
  createdAt: string;
};
