import { useEffect, useRef, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { formatCOP, searchCatalog } from '../data/galleryData';

interface HeaderProps {
  activeNav: string;
  cartCount: number;
  user: string | null;
  onSearchSubmit: (query: string) => void;
}

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'obras', label: 'Obras', href: '#obras' },
  { id: 'artistas', label: 'Artistas', href: '#artistas' },
  { id: 'agenda', label: 'Agenda', href: '#agenda' },
  { id: 'aprender', label: 'Aprender', href: '#aprender' },
  { id: 'ayuda', label: 'Ayuda', href: '#ayuda' },
];

export function Header({ activeNav, cartCount, user, onSearchSubmit }: HeaderProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [activeNav]);

  const results = searchCatalog(query);
  const hasAny =
    results.artworks.length +
      results.artists.length +
      results.events.length +
      results.courses.length >
    0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setShowSuggestions(false);
      setMobileSearchOpen(false);
      onSearchSubmit(query.trim());
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E5DAC3] bg-[#FAF7F0]">
      <div className="mx-auto max-w-[1160px] px-5 lg:px-8">
        {/* Top Row: Wordmark — Search Input — Account & Cart */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 md:flex-nowrap md:gap-8">
          <a
            href="#inicio"
            className="shrink-0 font-serif text-[1.65rem] font-medium tracking-[0.16em] text-[#9E5602] whitespace-nowrap"
          >
            LUMINA
          </a>

          <div
            ref={searchWrapRef}
            className={`relative order-last w-full md:order-none md:block md:max-w-[560px] md:flex-1 ${
              mobileSearchOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#9E5602]/70"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(Boolean(e.target.value.trim()));
                }}
                onFocus={() => {
                  if (query.trim()) setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Buscar obras, artistas, eventos y cursos"
                aria-label="Buscar en Lumina"
                autoComplete="off"
                className="min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white py-2 pr-3.5 pl-10 text-sm text-[#2F200E] placeholder:text-[#8C775C] transition-colors focus:border-[#B76904] focus:outline-none"
              />
            </div>

            {showSuggestions && query.trim() && (
              <div
                className="absolute right-0 left-0 top-full z-40 mt-1 max-h-[60vh] overflow-y-auto rounded-sm border border-[#D8CBB3] bg-[#FDFBF6] py-1.5 shadow-lg"
                role="listbox"
              >
                {!hasAny ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowSuggestions(false);
                      onSearchSubmit(query.trim());
                    }}
                    className="block w-full px-4 py-2.5 text-left text-sm text-[#6A5740] hover:bg-[#F2E7CF]"
                  >
                    Sin coincidencias directas. Ver sugerencias →
                  </button>
                ) : (
                  <>
                    {results.artworks.length > 0 && (
                      <div>
                        <p className="px-4 pt-2 pb-1 text-[0.7rem] font-semibold tracking-wider text-[#9E5602] uppercase">
                          Obras
                        </p>
                        {results.artworks.slice(0, 3).map((o) => (
                          <a
                            key={`o-${o.id}`}
                            href={`#obra-${o.id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center justify-between px-4 py-2 text-sm text-[#2F200E] hover:bg-[#F2E7CF]"
                          >
                            <span>{o.title}</span>
                            <span className="text-xs font-medium text-[#7A6247] tabular-nums">
                              {formatCOP(o.price)}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                    {results.artists.length > 0 && (
                      <div>
                        <p className="px-4 pt-2 pb-1 text-[0.7rem] font-semibold tracking-wider text-[#9E5602] uppercase">
                          Artistas
                        </p>
                        {results.artists.slice(0, 3).map((a) => (
                          <a
                            key={`a-${a.id}`}
                            href={`#artista-${a.id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="block px-4 py-2 text-sm text-[#2F200E] hover:bg-[#F2E7CF]"
                          >
                            {a.name} · <span className="text-[#7A6247]">{a.city}</span>
                          </a>
                        ))}
                      </div>
                    )}
                    {results.events.length > 0 && (
                      <div>
                        <p className="px-4 pt-2 pb-1 text-[0.7rem] font-semibold tracking-wider text-[#9E5602] uppercase">
                          Agenda
                        </p>
                        {results.events.slice(0, 3).map((ev) => (
                          <a
                            key={`e-${ev.id}`}
                            href={`#evento-${ev.id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="block px-4 py-2 text-sm text-[#2F200E] hover:bg-[#F2E7CF]"
                          >
                            {ev.title}
                          </a>
                        ))}
                      </div>
                    )}
                    {results.courses.length > 0 && (
                      <div>
                        <p className="px-4 pt-2 pb-1 text-[0.7rem] font-semibold tracking-wider text-[#9E5602] uppercase">
                          Cursos
                        </p>
                        {results.courses.slice(0, 3).map((c) => (
                          <a
                            key={`c-${c.id}`}
                            href={`#curso-${c.id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="block px-4 py-2 text-sm text-[#2F200E] hover:bg-[#F2E7CF]"
                          >
                            {c.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((v) => !v);
                setTimeout(() => inputRef.current?.focus(), 60);
              }}
              aria-label="Buscar"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm text-[#9E5602] hover:bg-[#F2E7CF] md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <a
              href="#cuenta"
              className="hidden shrink-0 text-sm font-medium text-[#9E5602] transition-colors duration-150 hover:text-[#7D4200] whitespace-nowrap md:inline-block"
            >
              {user ? `Hola, ${user}` : 'Mi cuenta'}
            </a>

            <a
              href="#carrito"
              className="shrink-0 text-sm font-medium text-[#9E5602] transition-colors duration-150 hover:text-[#7D4200] whitespace-nowrap tabular-nums"
            >
              Carrito ({cartCount})
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm text-[#9E5602] hover:bg-[#F2E7CF] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav Row */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-7 pb-3 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 border-b-2 pb-1 text-sm transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? 'border-[#B76904] font-semibold text-[#9E5602]'
                    : 'border-transparent font-medium text-[#5A452C] hover:border-[#D4A359] hover:text-[#9E5602]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Drawer Nav */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menú móvil"
            className="flex flex-col border-t border-[#E5DAC3] py-2 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-[#E5DAC3]/60 py-3 text-sm ${
                    isActive ? 'font-semibold text-[#9E5602]' : 'text-[#2F200E]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#cuenta"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-sm font-medium text-[#9E5602]"
            >
              {user ? `Mi cuenta (${user})` : 'Mi cuenta'}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
