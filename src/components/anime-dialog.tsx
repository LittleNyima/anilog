import React, { useEffect } from "react";
import type { Anime } from "@/types";
import { Badge } from "@/components/badge";

interface AnimeDetailDialogProps {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
}

// Icon Components
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-4 h-4 ${filled ? "text-white" : "text-zinc-700"}`}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HalfStarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-white"
  >
    <defs>
      <clipPath id="halfStarClip">
        <rect x="0" y="0" width="12" height="24" />
      </clipPath>
    </defs>
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill="currentColor"
      clipPath="url(#halfStarClip)"
    />
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill="none"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const AnimeDetailDialog: React.FC<AnimeDetailDialogProps> = ({
  anime,
  isOpen,
  onClose,
}) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !anime) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog Content */}
      <div
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-in fade-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button - Sticky on Mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-zinc-400 hover:text-white rounded-full transition-colors backdrop-blur-md"
        >
          <CloseIcon />
        </button>

        {/* Poster Section */}
        <div className="w-full md:w-2/5 h-64 md:h-auto bg-zinc-950 relative overflow-hidden group">
          <img
            src={anime.posterUrl}
            alt={`Poster for ${anime.title}`}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent md:hidden" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-2 flex items-center gap-3 text-zinc-500 text-sm font-medium tracking-wide uppercase">
            <span>{anime.year}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-medium text-zinc-100 mb-6 leading-tight">
            {anime.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {anime.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                My Rating
              </h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const threshold = star * 2;
                  const isFull = anime.rating >= threshold;
                  const isHalf = !isFull && anime.rating >= threshold - 1;

                  if (isFull) {
                    return <StarIcon key={star} filled={true} />;
                  } else if (isHalf) {
                    return <HalfStarIcon key={star} />;
                  } else {
                    return <StarIcon key={star} filled={false} />;
                  }
                })}
                <span className="ml-2 text-zinc-400 text-sm font-mono">
                  {anime.rating.toFixed(1)}/10.0
                </span>
              </div>
            </div>

            <div className="prose prose-invert prose-zinc max-w-none">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                My Review
              </h3>
              <p className="text-zinc-300 font-light leading-relaxed text-lg">
                "{anime.myReview}"
              </p>
              <div className="mt-2 text-right text-xs text-zinc-600 font-mono">
                Watched on {anime.watchedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
