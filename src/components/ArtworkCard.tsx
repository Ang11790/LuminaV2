import { Heart } from 'lucide-react';
import { formatCOP, getArtistById } from '../data/galleryData';
import type { Artwork } from '../types/gallery';
import { GalleryImage } from './GalleryImage';

interface ArtworkCardProps {
  artwork: Artwork;
  isWished: boolean;
  onToggleWish: (id: number) => void;
  showEditorialNotes?: boolean;
}

export function ArtworkCard({
  artwork,
  isWished,
  onToggleWish,
  showEditorialNotes = false,
}: ArtworkCardProps) {
  const artist = getArtistById(artwork.artistId);

  return (
    <article className="group flex flex-col">
      <a
        href={`#obra-${artwork.id}`}
        className="block overflow-hidden rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
      >
        <GalleryImage
          src={artwork.image}
          alt={`${artwork.title} por ${artist.name}`}
          fallbackGradient={artwork.fallbackGradient}
          className="aspect-[4/5] w-full"
          imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </a>

      <div className="mt-3.5 flex items-start justify-between gap-2">
        <a
          href={`#obra-${artwork.id}`}
          className="min-w-0 flex-1 text-decoration-none focus-visible:rounded"
        >
          <h3 className="font-serif text-[1.28rem] leading-tight font-medium text-[#9E5602] transition-colors group-hover:text-[#7D4200]">
            {artwork.title}
          </h3>
        </a>
        <button
          type="button"
          onClick={() => onToggleWish(artwork.id)}
          aria-pressed={isWished}
          aria-label={
            isWished
              ? `Quitar ${artwork.title} de la lista de deseos`
              : `Guardar ${artwork.title} en la lista de deseos`
          }
          className="flex h-10 w-10 shrink-0 -mt-1.5 -mr-2 cursor-pointer items-center justify-center rounded-full text-[#9E5602] transition-colors duration-150 hover:bg-[#F2E7CF]"
        >
          <Heart
            className="h-[18px] w-[18px]"
            fill={isWished ? '#9E5602' : 'none'}
            strokeWidth={1.6}
          />
        </button>
      </div>

      <p className="mt-0.5 text-[0.84rem] text-[#7A6247]">
        {artist.name} <span aria-hidden="true">·</span> {artwork.technique}
      </p>

      <p className="mt-1 text-[0.94rem] font-semibold text-[#2F200E] tabular-nums">
        {formatCOP(artwork.price)}
      </p>

      {showEditorialNotes && (
        <p className="mt-1.5 text-[0.76rem] font-medium tracking-wide text-[#8A5A19]">
          {[
            artwork.isPresale ? 'Preventa' : null,
            artwork.hasCertificate ? 'Certificado digital' : null,
            artwork.hasVideo ? 'Video de estudio' : null,
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>
      )}
    </article>
  );
}
