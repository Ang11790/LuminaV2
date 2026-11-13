import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { StudioVideoModal } from './components/StudioVideoModal';
import { ARTWORKS } from './data/galleryData';
import {
  AccountView,
  CartView,
  HelpView,
  SearchView,
} from './pages/AccountCartHelpSearchViews';
import {
  AgendaView,
  CourseDetailView,
  EventDetailView,
  LearningView,
  StoryDetailView,
} from './pages/AgendaLearningAndStoryViews';
import {
  ArtistDetailView,
  ArtistsView,
  WorkDetailView,
  WorksView,
} from './pages/CatalogAndDetailViews';
import { HomeView } from './pages/HomeView';
import type { Artist, CatalogFilters, PurchaseOrder, Reservation } from './types/gallery';

const DEFAULT_FILTERS: CatalogFilters = {
  techniques: [],
  priceIndices: [],
  onlyCert: false,
  onlyVideo: false,
  onlyPresale: false,
  sortBy: 'rec',
};

const NAV_MAP: Record<string, string> = {
  obra: 'obras',
  artista: 'artistas',
  evento: 'agenda',
  curso: 'aprender',
  historia: 'inicio',
};

function parseHash(): { route: string; id: number } {
  const raw = window.location.hash.replace(/^#/, '') || 'inicio';
  const [route, idStr] = raw.split('-');
  return { route, id: Number(idStr) || 1 };
}

export default function App() {
  const [{ route, id }, setLocationState] = useState(parseHash);
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);
  const [wishlist, setWishlist] = useState<number[]>([3, 4]);
  const [cartIds, setCartIds] = useState<number[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [following, setFollowing] = useState<number[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([
    { title: 'Habitar el color', when: '21 nov · 6:00 p. m. · 2 personas', kind: 'Reserva' },
  ]);
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([
    { orderNumber: 'LM-1024', title: 'Tierra adentro', total: 420000, date: '8 nov 2026' },
  ]);
  const [preferences, setPreferences] = useState<boolean[]>([true, true, false]);
  const [lastOrder, setLastOrder] = useState<PurchaseOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [videoArtist, setVideoArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setLocationState(parseHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleToggleWish = (workId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(workId);
      showToast(
        exists ? 'Quitada de tu lista de deseos' : 'Guardada en tu lista de deseos'
      );
      return exists ? prev.filter((item) => item !== workId) : [...prev, workId];
    });
  };

  const handleAddToCart = (workId: number) => {
    setCartIds((prev) => (prev.includes(workId) ? prev : [...prev, workId]));
    setLastOrder(null);
    showToast('Agregada al carrito');
  };

  const handleRemoveFromCart = (workId: number) => {
    setCartIds((prev) => prev.filter((item) => item !== workId));
  };

  const handleCompleteCheckout = (_buyerName: string, total: number) => {
    const orderNumber = `LM-${1025 + purchases.length}`;
    const firstWork = ARTWORKS.find((o) => o.id === cartIds[0]);
    const order: PurchaseOrder = {
      orderNumber,
      title:
        cartIds.length > 1
          ? `${firstWork?.title || 'Obra'} (+${cartIds.length - 1})`
          : firstWork?.title || 'Obra Lumina',
      total,
      date: '12 nov 2026',
    };
    setPurchases((prev) => [order, ...prev]);
    setLastOrder(order);
    setCartIds([]);
  };

  const handleQuickFilter = (preset: 'lt500' | 'presale') => {
    setFilters({
      ...DEFAULT_FILTERS,
      priceIndices: preset === 'lt500' ? [0] : [],
      onlyPresale: preset === 'presale',
    });
    window.location.hash = 'obras';
  };

  const handleToggleFollow = (artistId: number) => {
    setFollowing((prev) =>
      prev.includes(artistId)
        ? prev.filter((item) => item !== artistId)
        : [...prev, artistId]
    );
  };

  const handleSearchSubmit = (q: string) => {
    setSearchQuery(q);
    if (window.location.hash === '#buscar') {
      setLocationState({ route: 'buscar', id: 1 });
    } else {
      window.location.hash = 'buscar';
    }
  };

  const activeNav = NAV_MAP[route] || route;

  const renderMain = () => {
    switch (route) {
      case 'obras':
        return (
          <WorksView
            filters={filters}
            wishlist={wishlist}
            onChangeFilters={setFilters}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            onToggleWish={handleToggleWish}
          />
        );
      case 'obra':
        return (
          <WorkDetailView
            artworkId={id}
            wishlist={wishlist}
            onToggleWish={handleToggleWish}
            onAddToCart={handleAddToCart}
            onOpenVideo={setVideoArtist}
          />
        );
      case 'artistas':
        return <ArtistsView />;
      case 'artista':
        return (
          <ArtistDetailView
            artistId={id}
            following={following}
            wishlist={wishlist}
            onToggleFollow={handleToggleFollow}
            onToggleWish={handleToggleWish}
            onOpenVideo={setVideoArtist}
          />
        );
      case 'agenda':
        return <AgendaView />;
      case 'evento':
        return (
          <EventDetailView
            eventId={id}
            onAddReservation={(res) => setReservations((prev) => [...prev, res])}
          />
        );
      case 'aprender':
        return <LearningView />;
      case 'curso':
        return (
          <CourseDetailView
            courseId={id}
            onAddReservation={(res) => setReservations((prev) => [...prev, res])}
          />
        );
      case 'historia':
        return (
          <StoryDetailView
            storyId={id}
            wishlist={wishlist}
            onToggleWish={handleToggleWish}
          />
        );
      case 'carrito':
        return (
          <CartView
            cartIds={cartIds}
            lastOrder={lastOrder}
            onRemoveFromCart={handleRemoveFromCart}
            onCompleteCheckout={handleCompleteCheckout}
            onClearLastOrder={() => setLastOrder(null)}
          />
        );
      case 'cuenta':
        return (
          <AccountView
            user={user}
            wishlist={wishlist}
            reservations={reservations}
            purchases={purchases}
            preferences={preferences}
            onLogin={(name) => setUser(name)}
            onLogout={() => setUser(null)}
            onToggleWish={handleToggleWish}
            onCancelReservation={(idx) => {
              setReservations((prev) => prev.filter((_, i) => i !== idx));
              showToast('Reserva cancelada sin costo');
            }}
            onTogglePreference={(idx) =>
              setPreferences((prev) => prev.map((val, i) => (i === idx ? !val : val)))
            }
            onToast={showToast}
          />
        );
      case 'ayuda':
        return <HelpView />;
      case 'buscar':
        return (
          <SearchView
            query={searchQuery}
            wishlist={wishlist}
            onToggleWish={handleToggleWish}
          />
        );
      case 'inicio':
      default:
        return (
          <HomeView
            wishlist={wishlist}
            onToggleWish={handleToggleWish}
            onQuickFilter={handleQuickFilter}
            onToast={showToast}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F0] text-[#2F200E]">
      <Header
        activeNav={activeNav}
        cartCount={cartIds.length}
        user={user}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="flex-1">{renderMain()}</main>

      <Footer activeNav={activeNav} />

      <StudioVideoModal artist={videoArtist} onClose={() => setVideoArtist(null)} />

      {toast && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-[#2F200E] px-5 py-2.5 text-xs font-medium text-[#FAF7F0] shadow-lg md:bottom-8 md:text-sm"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
