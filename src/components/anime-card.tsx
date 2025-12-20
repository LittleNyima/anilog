import React from "react";
import type { Anime } from "@/types";

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  return (
    <div
      className="group relative cursor-pointer break-inside-avoid"
      onClick={() => onClick(anime)}
    >
      {/* Aspect Ratio Container (2:3 for posters) */}
      <div className="relative w-full aspect-2/3 overflow-hidden rounded-lg bg-zinc-900 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-zinc-900/20 border border-zinc-800/50">
        <img
          src={anime.posterUrl}
          alt={anime.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-75 opacity-90 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0"
        />

        {/* Overlay - visible on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <h3 className="text-lg font-serif font-medium text-white mb-2 leading-snug drop-shadow-sm">
              {anime.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-zinc-300 font-mono tracking-wider uppercase opacity-90">
              <span>{anime.watchedDate.replace(/-/g, ".")}</span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1">
                ★ {anime.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
