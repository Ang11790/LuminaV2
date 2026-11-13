import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface GalleryImageProps {
  src: string;
  alt: string;
  fallbackGradient?: string;
  className?: string;
  imgClassName?: string;
}

export function GalleryImage({
  src,
  alt,
  fallbackGradient = 'linear-gradient(135deg, #F2E7CF, #D4A359)',
  className = '',
  imgClassName = '',
}: GalleryImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#F2E7CF] text-[#6A5740] ${className}`}
        style={{ background: fallbackGradient }}
      >
        <div className="flex flex-col items-center gap-2 rounded-lg bg-[#FAF7F0]/85 px-4 py-3 text-center backdrop-blur-xs">
          <ImageIcon className="h-5 w-5 text-[#9E5602]" aria-hidden="true" />
          <span className="max-w-[20ch] text-xs font-medium text-[#2F200E]">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F2E7CF]/50 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
