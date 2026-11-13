import { useState } from 'react';
import {
  Check,
  ChevronDown,
  Heart,
  Play,
  SlidersHorizontal,
} from 'lucide-react';
import { ArtworkCard } from '../components/ArtworkCard';
import { GalleryImage } from '../components/GalleryImage';
import {
  ARTISTS,
  ARTWORKS,
  formatCOP,
  getArtistById,
  PRICE_RANGES,
  TECHNIQUES,
} from '../data/galleryData';
import type { Artist, CatalogFilters } from '../types/gallery';

interface WorksViewProps {
  filters: CatalogFilters;
  wishlist: number[];
  onChangeFilters: (next: CatalogFilters) => void;
  onResetFilters: () => void;
  onToggleWish: (id: number) => void;
}

export function WorksView({
  filters,
  wishlist,
  onChangeFilters,
  onResetFilters,
  onToggleWish,
}: WorksViewProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleTechnique = (tech: string) => {
    const exists = filters.techniques.includes(tech);
    const techniques = exists
      ? filters.techniques.filter((t) => t !== tech)
      : [...filters.techniques, tech];
    onChangeFilters({ ...filters, techniques });
  };

  const togglePrice = (idx: number) => {
    const exists = filters.priceIndices.includes(idx);
    const priceIndices = exists
      ? filters.priceIndices.filter((i) => i !== idx)
      : [...filters.priceIndices, idx];
    onChangeFilters({ ...filters, priceIndices });
  };

  const filtered = ARTWORKS.filter((o) => {
    if (filters.techniques.length && !filters.techniques.includes(o.technique)) {
      return false;
    }
    if (
      filters.priceIndices.length &&
      !filters.priceIndices.some(
        (idx) => o.price >= PRICE_RANGES[idx][1] && o.price < PRICE_RANGES[idx][2]
      )
    ) {
      return false;
    }
    if (filters.onlyCert && !o.hasCertificate) return false;
    if (filters.onlyVideo && !o.hasVideo) return false;
    if (filters.onlyPresale && !o.isPresale) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'lo') return a.price - b.price;
    if (filters.sortBy === 'hi') return b.price - a.price;
    if (filters.sortBy === 'new') return b.id - a.id;
    return a.id - b.id;
  });

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-medium text-[#9E5602]">
        Una obra que conecta contigo.
      </h1>
      <p className="mt-2 text-sm text-[#6A5740] sm:text-base">
        Todos los precios están en pesos colombianos.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            aria-expanded={mobileFiltersOpen}
            className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-[#D8CBB3] bg-white px-4 py-2 text-sm font-medium text-[#9E5602] lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span>{mobileFiltersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
          </button>

          <div
            className={`mt-4 space-y-6 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-5 lg:mt-0 lg:block ${
              mobileFiltersOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#E5DAC3] pb-3">
              <span className="text-xs font-semibold tracking-wider text-[#9E5602] uppercase">
                Filtros
              </span>
              <button
                type="button"
                onClick={onResetFilters}
                className="cursor-pointer text-xs font-medium text-[#9E5602] hover:underline"
              >
                Limpiar
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-[#6A5740] uppercase">
                Técnica
              </p>
              <div className="mt-2.5 space-y-2.5">
                {TECHNIQUES.map((tech) => (
                  <label
                    key={tech}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2F200E]"
                  >
                    <input
                      type="checkbox"
                      checked={filters.techniques.includes(tech)}
                      onChange={() => toggleTechnique(tech)}
                      className="h-4 w-4 accent-[#B76904]"
                    />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-[#6A5740] uppercase">
                Precio (COP)
              </p>
              <div className="mt-2.5 space-y-2.5">
                {PRICE_RANGES.map((range, idx) => (
                  <label
                    key={range[0]}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2F200E]"
                  >
                    <input
                      type="checkbox"
                      checked={filters.priceIndices.includes(idx)}
                      onChange={() => togglePrice(idx)}
                      className="h-4 w-4 accent-[#B76904]"
                    />
                    <span className="tabular-nums">{range[0]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-[#6A5740] uppercase">
                Confianza
              </p>
              <div className="mt-2.5 space-y-2.5">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2F200E]">
                  <input
                    type="checkbox"
                    checked={filters.onlyCert}
                    onChange={(e) =>
                      onChangeFilters({ ...filters, onlyCert: e.target.checked })
                    }
                    className="h-4 w-4 accent-[#B76904]"
                  />
                  <span>Con certificado digital</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2F200E]">
                  <input
                    type="checkbox"
                    checked={filters.onlyVideo}
                    onChange={(e) =>
                      onChangeFilters({ ...filters, onlyVideo: e.target.checked })
                    }
                    className="h-4 w-4 accent-[#B76904]"
                  />
                  <span>Con video del artista</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2F200E]">
                  <input
                    type="checkbox"
                    checked={filters.onlyPresale}
                    onChange={(e) =>
                      onChangeFilters({ ...filters, onlyPresale: e.target.checked })
                    }
                    className="h-4 w-4 accent-[#B76904]"
                  />
                  <span>Solo preventas</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DAC3] pb-4">
            <span role="status" className="text-sm font-medium text-[#6A5740] tabular-nums">
              {filtered.length} {filtered.length === 1 ? 'obra disponible' : 'obras disponibles'}
            </span>

            <div className="flex items-center gap-2.5">
              <label htmlFor="sort-works" className="text-xs font-medium text-[#6A5740]">
                Ordenar por
              </label>
              <select
                id="sort-works"
                value={filters.sortBy}
                onChange={(e) =>
                  onChangeFilters({
                    ...filters,
                    sortBy: e.target.value as CatalogFilters['sortBy'],
                  })
                }
                className="min-h-[40px] rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E] focus:border-[#B76904] focus:outline-none"
              >
                <option value="rec">Recomendadas</option>
                <option value="lo">Menor precio</option>
                <option value="hi">Mayor precio</option>
                <option value="new">Más reciente</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  isWished={wishlist.includes(artwork.id)}
                  onToggleWish={onToggleWish}
                  showEditorialNotes
                />
              ))}
            </div>
          ) : (
            <div className="rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-8">
              <h2 className="font-serif text-2xl font-medium text-[#9E5602]">
                No encontramos obras con esos filtros.
              </h2>
              <p className="mt-2 text-sm text-[#6A5740]">
                Quita un filtro o mira todas las obras disponibles en el catálogo.
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-5 min-h-[44px] cursor-pointer rounded-sm bg-[#B76904] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9E5602]"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface WorkDetailViewProps {
  artworkId: number;
  wishlist: number[];
  onToggleWish: (id: number) => void;
  onAddToCart: (id: number) => void;
  onOpenVideo: (artist: Artist) => void;
}

export function WorkDetailView({
  artworkId,
  wishlist,
  onToggleWish,
  onAddToCart,
  onOpenVideo,
}: WorkDetailViewProps) {
  const [showWall, setShowWall] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'auth' | null>('specs');

  const artwork = ARTWORKS.find((o) => o.id === artworkId) || ARTWORKS[0];
  const artist = getArtistById(artwork.artistId);
  const isWished = wishlist.includes(artwork.id);
  const related = ARTWORKS.filter((x) => x.artistId === artist.id && x.id !== artwork.id).slice(
    0,
    4
  );

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-8 lg:px-8 lg:py-12">
      <nav aria-label="Ruta de navegación" className="text-xs text-[#7A6247]">
        <a href="#inicio" className="hover:text-[#9E5602] hover:underline">
          Inicio
        </a>{' '}
        <span aria-hidden="true">/</span>{' '}
        <a href="#obras" className="hover:text-[#9E5602] hover:underline">
          Obras
        </a>{' '}
        <span aria-hidden="true">/</span> <span className="text-[#2F200E]">{artwork.title}</span>
      </nav>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-12">
        {/* Left: Artwork Image + Wall Preview */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-sm border border-[#E5DAC3] bg-[#FDFBF6]">
            <GalleryImage
              src={artwork.image}
              alt={`${artwork.title} de ${artist.name}`}
              fallbackGradient={artwork.fallbackGradient}
              className="aspect-[4/5] w-full"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowWall((v) => !v)}
            className="mt-4 min-h-[44px] cursor-pointer rounded-sm border border-[#D8CBB3] bg-white px-5 py-2.5 text-sm font-medium text-[#9E5602] transition-colors hover:border-[#B76904] hover:bg-[#F2E7CF]"
          >
            {showWall ? 'Ocultar vista en pared' : 'Ver en una pared'}
          </button>

          {showWall && (
            <div className="mt-4 rounded-sm border border-[#E5DAC3] bg-[#F2E7CF] p-8 text-center">
              <div className="mx-auto max-w-[220px] shadow-xl">
                <GalleryImage
                  src={artwork.image}
                  alt={`Vista en pared de ${artwork.title}`}
                  fallbackGradient={artwork.fallbackGradient}
                  className="aspect-[4/5] w-full border-4 border-white"
                />
              </div>
              <div className="mx-auto mt-6 h-3 w-3/4 rounded-full bg-[#D8CBB3]/70" />
              <p className="mt-3 text-xs font-medium text-[#6A5740]">
                Vista en pared · Escala orientativa ({artwork.dimensionsAndMedium})
              </p>
            </div>
          )}
        </div>

        {/* Right: Purchase & Provenance */}
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold tracking-wider text-[#B76904] uppercase">
            {artwork.isPresale ? 'Preventa disponible' : 'Edición limitada · Disponible'}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.2rem,4vw,3.1rem)] leading-tight font-medium text-[#9E5602]">
            {artwork.title}
          </h1>
          <p className="mt-2 text-sm text-[#6A5740]">
            <a href={`#artista-${artist.id}`} className="font-medium text-[#9E5602] hover:underline">
              {artist.name}
            </a>{' '}
            <span aria-hidden="true">·</span> {artwork.technique}
          </p>

          <p className="mt-5 text-[1.95rem] font-semibold text-[#2F200E] tabular-nums">
            {formatCOP(artwork.price)}
          </p>
          <p className="mt-0.5 text-xs text-[#7A6247]">
            Impuestos incluidos · Envío calculado al confirmar
          </p>

          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-[#2F200E]">
            {artwork.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onAddToCart(artwork.id)}
              className="min-h-[46px] cursor-pointer rounded-sm bg-[#B76904] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9E5602]"
            >
              Agregar al carrito
            </button>

            <button
              type="button"
              onClick={() => onToggleWish(artwork.id)}
              aria-pressed={isWished}
              className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-sm border border-[#D8CBB3] bg-white px-5 py-3 text-sm font-medium text-[#9E5602] transition-colors hover:border-[#B76904] hover:bg-[#F2E7CF]"
            >
              <Heart className="h-4 w-4" fill={isWished ? '#9E5602' : 'none'} />
              <span>{isWished ? 'En tu lista de deseos' : 'Guardar en lista de deseos'}</span>
            </button>
          </div>

          <div className="mt-7 space-y-2.5 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-5 text-sm text-[#2F200E]">
            <p className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9E5602]" aria-hidden="true" />
              <span>
                <strong>Pago seguro:</strong> Nequi, Daviplata, PSE y tarjetas
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9E5602]" aria-hidden="true" />
              <span>
                <strong>Garantía de devolución:</strong> 5 días hábiles desde la entrega
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9E5602]" aria-hidden="true" />
              <span>
                {artwork.hasCertificate
                  ? 'Certificado digital incluido · Factura disponible en Mi cuenta'
                  : 'Ficha de autoría incluida · Factura disponible en Mi cuenta'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Specifications + Behind the Work */}
      <div className="mt-14 grid gap-10 border-t border-[#E5DAC3] pt-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Ficha técnica</h2>
          <div className="mt-4 divide-y divide-[#E5DAC3] border-y border-[#E5DAC3]">
            <div>
              <button
                type="button"
                onClick={() =>
                  setOpenAccordion((prev) => (prev === 'specs' ? null : 'specs'))
                }
                aria-expanded={openAccordion === 'specs'}
                className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm font-semibold text-[#2F200E]"
              >
                <span>Datos de la obra</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#9E5602] transition-transform ${
                    openAccordion === 'specs' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'specs' && (
                <dl className="grid grid-cols-1 gap-2 pb-4 text-sm text-[#6A5740] sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold text-[#9E5602] uppercase">Técnica</dt>
                    <dd className="mt-0.5">{artwork.technique}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-[#9E5602] uppercase">Edición</dt>
                    <dd className="mt-0.5">{artwork.edition}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold text-[#9E5602] uppercase">
                      Materiales y medidas
                    </dt>
                    <dd className="mt-0.5">{artwork.dimensionsAndMedium}</dd>
                  </div>
                </dl>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() =>
                  setOpenAccordion((prev) => (prev === 'auth' ? null : 'auth'))
                }
                aria-expanded={openAccordion === 'auth'}
                className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm font-semibold text-[#2F200E]"
              >
                <span>Una historia con autenticidad</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#9E5602] transition-transform ${
                    openAccordion === 'auth' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'auth' && (
                <p className="pb-4 text-sm leading-relaxed text-[#6A5740]">
                  {artwork.hasCertificate
                    ? 'El certificado digital incluye autoría, número de edición y datos técnicos de la obra. Queda disponible en Mi cuenta inmediatamente después de confirmar la compra.'
                    : 'Incluye ficha impresa y digital con autoría, fecha de edición y recomendaciones de conservación.'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Detrás de la obra</h2>
          <button
            type="button"
            onClick={() => onOpenVideo(artist)}
            className="mt-4 flex w-full cursor-pointer items-center gap-4 rounded-sm bg-[#B76904] p-5 text-left text-white transition-colors hover:bg-[#9E5602]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#9E5602]">
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
            </span>
            <div>
              <p className="font-medium">En el estudio con {artist.name} · 02:48</p>
              <p className="text-xs text-[#F7DFB2]">Ver entrevista y proceso creativo</p>
            </div>
          </button>

          <div className="mt-7">
            <h3 className="font-serif text-xl font-medium text-[#9E5602]">Reseñas</h3>
            <p className="mt-1 text-sm font-medium text-[#2F200E] tabular-nums">
              5,0 / 5 <span aria-hidden="true">·</span> 2 reseñas verificadas
            </p>
            <blockquote className="mt-3 border-t border-[#E5DAC3] pt-3 text-sm leading-relaxed text-[#6A5740]">
              “La textura y la calidez del color se sienten aún más vivos en casa. Llegó
              cuidadosamente embalada.”
              <footer className="mt-1 text-xs font-medium text-[#9E5602]">
                Ana M. · Coleccionista en Bogotá
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* More from Artist */}
      {related.length > 0 && (
        <div className="mt-14 border-t border-[#E5DAC3] pt-10">
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">
            Más obras de {artist.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ArtworkCard
                key={item.id}
                artwork={item}
                isWished={wishlist.includes(item.id)}
                onToggleWish={onToggleWish}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ArtistsView() {
  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#B76904] uppercase">
        Creadores Lumina
      </p>
      <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-medium text-[#9E5602]">
        Cada mirada, un universo.
      </h1>
      <p className="mt-2 max-w-[58ch] text-sm text-[#6A5740] sm:text-base">
        Conoce a los artistas de Lumina, entra a sus estudios y descubre las obras que dialogan con
        nuestro presente.
      </p>

      <div className="mt-9 grid gap-10 md:grid-cols-2">
        {ARTISTS.map((artist) => {
          const count = ARTWORKS.filter((o) => o.artistId === artist.id).length;
          return (
            <a
              key={artist.id}
              href={`#artista-${artist.id}`}
              className="group block overflow-hidden rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <GalleryImage
                src={artist.image}
                alt={`Estudio de ${artist.name}`}
                fallbackGradient={artist.fallbackGradient}
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="p-6">
                <p className="text-xs font-semibold tracking-wider text-[#B76904] uppercase">
                  {artist.city} <span aria-hidden="true">·</span> {count} obras disponibles
                </p>
                <h2 className="mt-1.5 font-serif text-3xl font-medium text-[#9E5602]">
                  {artist.name}
                </h2>
                <p className="mt-1 text-sm text-[#6A5740]">{artist.techniques}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#2F200E]">{artist.bio}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

interface ArtistDetailViewProps {
  artistId: number;
  following: number[];
  wishlist: number[];
  onToggleFollow: (id: number) => void;
  onToggleWish: (id: number) => void;
  onOpenVideo: (artist: Artist) => void;
}

export function ArtistDetailView({
  artistId,
  following,
  wishlist,
  onToggleFollow,
  onToggleWish,
  onOpenVideo,
}: ArtistDetailViewProps) {
  const artist = getArtistById(artistId);
  const isFollowing = following.includes(artist.id);
  const works = ARTWORKS.filter((o) => o.artistId === artist.id);

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <GalleryImage
            src={artist.image}
            alt={`Retrato de ${artist.name} en su estudio`}
            fallbackGradient={artist.fallbackGradient}
            className="aspect-[4/3] w-full rounded-sm border border-[#E5DAC3]"
          />
        </div>

        <div className="lg:col-span-6">
          <p className="text-xs font-semibold tracking-wider text-[#B76904] uppercase">
            Artista <span aria-hidden="true">·</span> {artist.city}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.2rem,4vw,3.3rem)] leading-tight font-medium text-[#9E5602]">
            {artist.name}
          </h1>
          <p className="mt-4 font-serif text-2xl italic leading-snug text-[#2F200E]">
            {artist.quote}
          </p>
          <p className="mt-3 text-sm text-[#6A5740]">{artist.techniques}</p>

          <button
            type="button"
            onClick={() => onToggleFollow(artist.id)}
            aria-pressed={isFollowing}
            className={`mt-6 min-h-[44px] cursor-pointer rounded-sm px-6 py-2.5 text-sm font-semibold transition-colors ${
              isFollowing
                ? 'border border-[#B76904] bg-[#F2E7CF] text-[#9E5602]'
                : 'bg-[#B76904] text-white hover:bg-[#9E5602]'
            }`}
          >
            {isFollowing ? `Siguiendo a ${artist.name}` : `Seguir a ${artist.name}`}
          </button>
        </div>
      </div>

      <div className="mt-14 grid gap-10 border-t border-[#E5DAC3] pt-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">
            Una mirada entre dos mundos.
          </h2>
          <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[#6A5740]">{artist.bio}</p>

          <button
            type="button"
            onClick={() => onOpenVideo(artist)}
            className="mt-6 flex w-full max-w-md cursor-pointer items-center gap-4 rounded-sm bg-[#B76904] p-4 text-left text-white transition-colors hover:bg-[#9E5602]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#9E5602]">
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
            </span>
            <div>
              <p className="text-sm font-semibold">Dentro del estudio · Ver entrevista</p>
              <p className="text-xs text-[#F7DFB2]">02:48 · Proceso y materiales</p>
            </div>
          </button>
        </div>

        <div className="lg:col-span-6">
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Trayectoria</h2>
          <ul className="mt-4 divide-y divide-[#E5DAC3] border-y border-[#E5DAC3]">
            {artist.timeline.map((item) => (
              <li key={item} className="py-3.5 text-sm text-[#2F200E]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-[#E5DAC3] pt-10">
        <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Obras disponibles</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isWished={wishlist.includes(artwork.id)}
              onToggleWish={onToggleWish}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
