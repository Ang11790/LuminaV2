import { useEffect } from 'react';
import { Play, X } from 'lucide-react';
import type { Artist } from '../types/gallery';
import { GalleryImage } from './GalleryImage';

interface StudioVideoModalProps {
  artist: Artist | null;
  onClose: () => void;
}

export function StudioVideoModal({ artist, onClose }: StudioVideoModalProps) {
  useEffect(() => {
    if (!artist) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [artist, onClose]);

  if (!artist) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F200E]/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="studio-video-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-sm border border-[#E5DAC3] bg-[#FAF7F0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5DAC3] px-5 py-3.5">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-wider text-[#9E5602] uppercase">
              En el estudio · 02:48
            </p>
            <h3 id="studio-video-title" className="font-serif text-xl font-medium text-[#2F200E]">
              Conversación con {artist.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar video"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm text-[#6A5740] hover:bg-[#F2E7CF]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-[16/9] w-full bg-[#2F200E]">
          <GalleryImage
            src={artist.image}
            alt={`Estudio de ${artist.name}`}
            fallbackGradient={artist.fallbackGradient}
            className="h-full w-full"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/35 to-transparent p-6 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B76904] text-white">
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              </span>
              <div>
                <p className="text-sm font-medium">{artist.quote}</p>
                <p className="text-xs text-[#F5DFB0]">
                  Cápsula documental · {artist.city} · Proceso de color y materia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-t border-[#E5DAC3] bg-[#F2E7CF]/45 p-5 text-sm text-[#4A3720] sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold text-[#9E5602]">00:00 · La paleta</p>
            <p className="mt-0.5 text-xs">Elección de ocres, violetas y soporte artesanal.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#9E5602]">01:12 · Capas de luz</p>
            <p className="mt-0.5 text-xs">Equilibrio entre gesto manual y textura final.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#9E5602]">02:05 · Habitar la obra</p>
            <p className="mt-0.5 text-xs">Recomendaciones de luz natural en el hogar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
