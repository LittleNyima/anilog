import React, { useState } from "react";
import { AnimeCard } from "@/components/anime-card";
import { AnimeDetailDialog } from "@/components/anime-dialog";
import animes from "@/animes.json";
import type { Anime } from "@/types";

const App: React.FC = () => {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Add a small delay before clearing selection for smooth animation
    setTimeout(() => setSelectedAnime(null), 300);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/60 glass-panel">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <h1 className="text-lg font-serif tracking-tight font-semibold">
              Anilog.
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">
              Journal
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Lists
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-zinc-500 hidden sm:block">
              {animes.length} ENTRIES
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <span className="text-xs font-medium">ME</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Intro */}
        <section className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white leading-tight">
            Recent Watchlist
          </h2>
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            A curated log of anime experienced recently. Notes on visuals,
            direction, and the feelings lingering after the credits roll.
          </p>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {animes.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={handleAnimeClick}
            />
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm">
          <p>&copy; 2025 Anilog. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Minimalist</span>
            <span>•</span>
            <span>Anime</span>
            <span>•</span>
            <span>Journal</span>
          </div>
        </footer>
      </main>

      {/* Dialog */}
      <AnimeDetailDialog
        anime={selectedAnime}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default App;
