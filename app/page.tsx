"use client";
import MovieRecommendationCard from "@/components/movie-recommendation-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <MovieRecommendationCard />
    </main>
  );
}
