import { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ArtworkCard } from '../components/ArtworkCard';
import { GalleryImage } from '../components/GalleryImage';
import { ARTISTS, ARTWORKS, EVENTS, IMAGES, STORIES } from '../data/galleryData';

interface HomeViewProps {
  wishlist: number[];
  onToggleWish: (id: number) => void;
  onQuickFilter: (preset: 'lt500' | 'presale') => void;
  onToast: (message: string) => void;
}

export function HomeView({
  wishlist,
  onToggleWish,
  onQuickFilter,
  onToast,
}: HomeViewProps) {
  const [alertContact, setAlertContact] = useState('');
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  const elena = ARTISTS[0];
  const featuredWorks = ARTWORKS.filter((o) => o.price < 500000).slice(0, 4);
  const heroEvent = EVENTS[0];

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertContact.trim()) return;
    setAlertSubmitted(true);
    setAlertContact('');
    onToast('Listo: te avisaremos de las novedades');
  };

  return (
    <div>
      {/* Hero Section — Rich Burnt Amber / Ochre */}
      <section className="bg-[#B76904] text-white">
        <div className="mx-auto grid max-w-[1160px] items-center gap-8 px-5 py-12 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
          <div className="lg:col-span-6">
            <p className="text-[0.75rem] font-medium tracking-[0.14em] text-[#F7DFB2] uppercase">
              Exposición destacada <span aria-hidden="true">·</span> 21 nov–20 dic 2026
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw,3.9rem)] leading-[1.04] font-medium text-white">
              Una nueva forma de sentir el arte.
            </h1>
            <p className="mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed text-[#FDF6E8]">
              Habitar el color
              <br />
              Una exposición para mirar el mundo de otra manera.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={`#evento-${heroEvent.id}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#9E5602] transition-colors duration-150 hover:bg-[#FAF7F0] whitespace-nowrap"
              >
                <span>Descubrir la exposición</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-5 text-xs tracking-wide text-[#F5D8A2]">
              Entrada libre <span aria-hidden="true">·</span> Galería Lumina{' '}
              <span aria-hidden="true">·</span> Bogotá
            </p>
          </div>

          <div className="lg:col-span-6">
            <GalleryImage
              src={IMAGES.galleryExhibitionHero}
              alt="Sala de la exposición Habitar el color en Galería Lumina"
              fallbackGradient={heroEvent.fallbackGradient}
              className="aspect-[4/3] w-full rounded-sm shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Tu primera colección — 4-column artwork showcase */}
      <section className="mx-auto max-w-[1160px] px-5 py-14 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#B76904] uppercase">
              Tu primera colección
            </p>
            <h2 className="mt-2 font-serif text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight font-medium text-[#9E5602]">
              El arte también es para ti.
            </h2>
            <p className="mt-2 max-w-[58ch] text-sm text-[#6A5740] sm:text-base">
              Obras por menos de $500.000 COP. Encuentra esa pieza con la que todo comienza.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Atajos de colección">
            <button
              type="button"
              onClick={() => onQuickFilter('lt500')}
              className="min-h-[40px] cursor-pointer rounded-sm border border-[#D8CBB3] bg-white px-4 py-2 text-xs font-medium text-[#7D4200] transition-colors hover:border-[#B76904] hover:bg-[#F2E7CF] whitespace-nowrap"
            >
              Menos de $500.000
            </button>
            <button
              type="button"
              onClick={() => onQuickFilter('presale')}
              className="min-h-[40px] cursor-pointer rounded-sm border border-[#D8CBB3] bg-white px-4 py-2 text-xs font-medium text-[#7D4200] transition-colors hover:border-[#B76904] hover:bg-[#F2E7CF] whitespace-nowrap"
            >
              Preventas
            </button>
            <a
              href="#agenda"
              className="inline-flex min-h-[40px] items-center rounded-sm border border-[#D8CBB3] bg-white px-4 py-2 text-xs font-medium text-[#7D4200] transition-colors hover:border-[#B76904] hover:bg-[#F2E7CF] whitespace-nowrap"
            >
              Esta semana
            </a>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {featuredWorks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isWished={wishlist.includes(artwork.id)}
              onToggleWish={onToggleWish}
            />
          ))}
        </div>

        <div className="mt-8">
          <a
            href="#obras"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9E5602] transition-colors hover:text-[#7D4200]"
          >
            <span>Explorar todas las obras</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Agenda Lumina — Warm Buttercream Sand Band */}
      <section className="bg-[#F2E7CF] py-14 lg:py-16">
        <div className="mx-auto max-w-[1160px] px-5 lg:px-8">
          <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#9E5602] uppercase">
            Agenda Lumina
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight font-medium text-[#9E5602]">
            Nos vemos alrededor del arte.
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Event Card 1: Habitar el color */}
            <article className="group flex flex-col">
              <a href="#evento-1" className="block overflow-hidden rounded-sm">
                <GalleryImage
                  src={IMAGES.galleryExhibitionHero}
                  alt="Exposición Habitar el color en Galería Lumina"
                  fallbackGradient={EVENTS[0].fallbackGradient}
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </a>
              <p className="mt-4 text-[0.74rem] font-semibold tracking-wider text-[#9E5602] uppercase">
                21 nov <span aria-hidden="true">·</span> 6:00 p. m.
              </p>
              <h3 className="mt-1 font-serif text-[1.6rem] leading-snug font-medium text-[#9E5602]">
                <a href="#evento-1" className="hover:underline underline-offset-4">
                  Habitar el color
                </a>
              </h3>
              <p className="mt-1 text-sm text-[#6A5740]">
                Inauguración <span aria-hidden="true">·</span> Bogotá{' '}
                <span aria-hidden="true">·</span> Entrada libre
              </p>
              <a
                href="#evento-1"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#9E5602] hover:text-[#7D4200]"
              >
                <span>Ver encuentro y reservar</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>

            {/* Event Card 2: Color y composición */}
            <article className="group flex flex-col">
              <a href="#curso-1" className="block overflow-hidden rounded-sm">
                <GalleryImage
                  src={IMAGES.workshopColorPalette}
                  alt="Taller práctico de mezcla de color en paleta cerámica"
                  fallbackGradient={EVENTS[1].fallbackGradient}
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </a>
              <p className="mt-4 text-[0.74rem] font-semibold tracking-wider text-[#9E5602] uppercase">
                28 nov <span aria-hidden="true">·</span> 10:00 a. m.
              </p>
              <h3 className="mt-1 font-serif text-[1.6rem] leading-snug font-medium text-[#9E5602]">
                <a href="#curso-1" className="hover:underline underline-offset-4">
                  Color y composición
                </a>
              </h3>
              <p className="mt-1 text-sm text-[#6A5740]">
                Taller <span aria-hidden="true">·</span> Virtual en vivo{' '}
                <span aria-hidden="true">·</span> Con inscripción
              </p>
              <a
                href="#curso-1"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#9E5602] hover:text-[#7D4200]"
              >
                <span>Ver encuentro y reservar</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Artistas del mes — Editorial Spotlight */}
      <section className="mx-auto max-w-[1160px] px-5 py-14 lg:px-8 lg:py-16">
        <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#B76904] uppercase">
          Artistas del mes
        </p>
        <h2 className="mt-2 font-serif text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight font-medium text-[#9E5602]">
          Detrás de cada obra, una forma de ver.
        </h2>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <a href={`#artista-${elena.id}`} className="block overflow-hidden rounded-sm">
              <GalleryImage
                src={elena.image}
                alt={`Retrato de ${elena.name} en su estudio`}
                fallbackGradient={elena.fallbackGradient}
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-300 ease-out hover:scale-[1.02]"
              />
            </a>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-serif text-[2rem] leading-tight font-medium text-[#9E5602]">
              {elena.name}
            </h3>
            <p className="mt-2.5 max-w-[54ch] text-base leading-relaxed text-[#6A5740]">
              Memoria, paisajes emocionales y un diálogo constante entre lo digital y lo
              artesanal.
            </p>
            <div className="mt-4">
              <a
                href={`#artista-${elena.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9E5602] hover:text-[#7D4200]"
              >
                <span>Conocer a Elena</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-7 border-t border-[#E5DAC3] pt-6">
              <h4 className="font-serif text-[1.4rem] font-medium text-[#9E5602]">
                También este mes: Mateo Ríos
              </h4>
              <p className="mt-1.5 text-sm text-[#6A5740]">
                Tierra, luz y paisaje interior. Descubre su portafolio.
              </p>
              <a
                href="#artistas"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#9E5602] hover:text-[#7D4200]"
              >
                <span>Explorar artistas</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Novedades — Ideas para vivir con arte (Golden Mustard Cards) */}
      <section className="mx-auto max-w-[1160px] border-t border-[#E5DAC3] px-5 py-14 lg:px-8 lg:py-16">
        <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#B76904] uppercase">
          Novedades
        </p>
        <h2 className="mt-2 font-serif text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight font-medium text-[#9E5602]">
          Ideas para vivir con arte.
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STORIES.map((story) => (
            <a
              key={story.id}
              href={`#historia-${story.id}`}
              className="group flex min-h-[168px] flex-col justify-between rounded-sm bg-[#D4C36A] p-7 text-[#2F200E] transition-colors duration-200 hover:bg-[#CBB858]"
            >
              <div>
                <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-[#5C410C] uppercase">
                  {story.kicker}
                </p>
                <h3 className="mt-2.5 font-serif text-[1.5rem] leading-snug font-medium text-[#7A4403]">
                  {story.title}
                </h3>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#7A4403] group-hover:underline underline-offset-4">
                <span>Leer la historia</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Entérate primero — Newsletter & WhatsApp Alerts */}
      <section className="bg-[#F5EFE2] py-12 lg:py-14">
        <div className="mx-auto flex max-w-[1160px] flex-col justify-between gap-6 px-5 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-lg">
            <h2 className="font-serif text-[1.9rem] leading-tight font-medium text-[#9E5602]">
              Entérate primero.
            </h2>
            <p className="mt-1.5 text-sm text-[#6A5740]">
              Nuevas obras, exposiciones y cursos. Elige cómo prefieres recibirlos.
            </p>
          </div>

          {alertSubmitted ? (
            <div
              role="status"
              className="flex items-center gap-2.5 rounded-sm border border-[#1F6E43]/40 bg-white px-5 py-3.5 text-sm font-medium text-[#1F6E43]"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Suscripción confirmada. Te avisaremos de nuestras próximas novedades.</span>
            </div>
          ) : (
            <form
              onSubmit={handleAlertSubmit}
              className="flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                required
                value={alertContact}
                onChange={(e) => setAlertContact(e.target.value)}
                placeholder="tu@correo.com o 300 000 0000"
                aria-label="Correo o WhatsApp"
                className="min-h-[44px] flex-1 rounded-sm border border-[#D8CBB3] bg-white px-4 text-sm text-[#2F200E] placeholder:text-[#8C775C] focus:border-[#B76904] focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-[44px] shrink-0 cursor-pointer rounded-sm bg-[#B76904] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#9E5602] whitespace-nowrap"
              >
                Quiero recibir novedades
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
