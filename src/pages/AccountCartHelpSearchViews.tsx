import { useState } from 'react';
import { CheckCircle2, ChevronDown, Trash2 } from 'lucide-react';
import { ArtworkCard } from '../components/ArtworkCard';
import { GalleryImage } from '../components/GalleryImage';
import {
  ARTWORKS,
  formatCOP,
  getArtistById,
  PAYMENT_METHODS,
  searchCatalog,
} from '../data/galleryData';
import type { PurchaseOrder, Reservation } from '../types/gallery';

interface CartViewProps {
  cartIds: number[];
  lastOrder: PurchaseOrder | null;
  onRemoveFromCart: (id: number) => void;
  onCompleteCheckout: (buyerName: string, total: number) => void;
  onClearLastOrder: () => void;
}

export function CartView({
  cartIds,
  lastOrder,
  onRemoveFromCart,
  onCompleteCheckout,
  onClearLastOrder,
}: CartViewProps) {
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [payMethod, setPayMethod] = useState(PAYMENT_METHODS[0]);

  const items = cartIds
    .map((id) => ARTWORKS.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));
  const total = items.reduce((sum, o) => sum + o.price, 0);

  if (lastOrder) {
    return (
      <div className="mx-auto max-w-[1160px] px-5 py-12 lg:px-8">
        <div
          role="status"
          className="max-w-2xl rounded-sm border border-[#1F6E43]/40 bg-[#FDFBF6] p-8"
        >
          <div className="flex items-center gap-2.5 text-[#1F6E43]">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Pedido confirmado
            </span>
          </div>
          <h1 className="mt-3 font-serif text-4xl font-medium text-[#9E5602]">
            Compra confirmada.
          </h1>
          <p className="mt-3 text-base text-[#2F200E]">
            Pedido <strong>{lastOrder.orderNumber}</strong> ·{' '}
            <strong className="tabular-nums">{formatCOP(lastOrder.total)}</strong>. Te enviamos
            la factura y el certificado digital por correo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#cuenta"
              onClick={onClearLastOrder}
              className="inline-flex min-h-[44px] items-center rounded-sm bg-[#B76904] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#9E5602]"
            >
              Ver en Mi cuenta
            </a>
            <a
              href="#obras"
              onClick={onClearLastOrder}
              className="inline-flex min-h-[44px] items-center rounded-sm border border-[#D8CBB3] bg-white px-6 py-2.5 text-sm font-medium text-[#9E5602] hover:bg-[#F2E7CF]"
            >
              Seguir explorando
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-[1160px] px-5 py-12 lg:px-8">
        <h1 className="font-serif text-4xl font-medium text-[#9E5602]">
          Tu carrito está vacío.
        </h1>
        <p className="mt-2 text-sm text-[#6A5740] sm:text-base">
          Empieza explorando nuestra selección inicial de obras por menos de $500.000 COP.
        </p>
        <a
          href="#obras"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-sm bg-[#B76904] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#9E5602]"
        >
          Explorar obras
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-medium text-[#9E5602]">
        Tu obra, a un paso.
      </h1>
      <p className="mt-1.5 text-sm text-[#6A5740]">
        1 Datos y pago — 2 Confirmación · Compra como invitado, sin crear cuenta.
      </p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
        <div className="space-y-4 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-6 lg:col-span-6">
          {items.map((item) => {
            const artist = getArtistById(item.artistId);
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-[#E5DAC3] pb-4 last:border-b-0 last:pb-0"
              >
                <GalleryImage
                  src={item.image}
                  alt={item.title}
                  fallbackGradient={item.fallbackGradient}
                  className="h-20 w-16 shrink-0 rounded-sm border border-[#E5DAC3]"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-medium text-[#9E5602]">{item.title}</p>
                  <p className="text-xs text-[#6A5740]">
                    {artist.name} · {item.technique}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#2F200E] tabular-nums">
                    {formatCOP(item.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFromCart(item.id)}
                  aria-label={`Quitar ${item.title}`}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm text-[#7A6247] hover:bg-[#F2E7CF] hover:text-[#9E5602]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}

          <div className="border-t border-[#E5DAC3] pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-[#6A5740]">Total</span>
              <span className="text-2xl font-semibold text-[#2F200E] tabular-nums">
                {formatCOP(total)}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-[#7A6247]">
              Impuestos incluidos · Envío digital gratis · Garantía de devolución: 5 días hábiles
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCompleteCheckout(buyerName, total);
          }}
          className="space-y-4 rounded-sm border border-[#E5DAC3] bg-[#F2E7CF] p-7 lg:col-span-6"
        >
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Datos de contacto</h2>
          <div>
            <label htmlFor="ck-name" className="block text-xs font-medium text-[#2F200E]">
              Nombre completo
            </label>
            <input
              id="ck-name"
              required
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
            />
          </div>
          <div>
            <label htmlFor="ck-email" className="block text-xs font-medium text-[#2F200E]">
              Correo para recibir factura y certificado
            </label>
            <input
              id="ck-email"
              type="email"
              required
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
            />
          </div>

          <fieldset className="pt-1">
            <legend className="text-xs font-semibold text-[#2F200E]">Método de pago</legend>
            <div className="mt-2 space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-[#2F200E]"
                >
                  <input
                    type="radio"
                    name="checkout-pay"
                    value={method}
                    checked={payMethod === method}
                    onChange={() => setPayMethod(method)}
                    className="h-4 w-4 accent-[#B76904]"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs text-[#6A5740]">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#B76904]" />
            <span>Acepto términos y política de privacidad.</span>
          </label>

          <button
            type="submit"
            className="min-h-[46px] w-full cursor-pointer rounded-sm bg-[#B76904] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9E5602]"
          >
            Pagar {formatCOP(total)} de forma segura
          </button>
        </form>
      </div>
    </div>
  );
}

interface AccountViewProps {
  user: string | null;
  wishlist: number[];
  reservations: Reservation[];
  purchases: PurchaseOrder[];
  preferences: boolean[];
  onLogin: (name: string) => void;
  onLogout: () => void;
  onToggleWish: (id: number) => void;
  onCancelReservation: (index: number) => void;
  onTogglePreference: (index: number) => void;
  onToast: (message: string) => void;
}

export function AccountView({
  user,
  wishlist,
  reservations,
  purchases,
  preferences,
  onLogin,
  onLogout,
  onToggleWish,
  onCancelReservation,
  onTogglePreference,
  onToast,
}: AccountViewProps) {
  const [authMode, setAuthMode] = useState<'in' | 'up'>('in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!user) {
    return (
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 py-12 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.3rem)] leading-tight font-medium text-[#9E5602]">
            {authMode === 'in' ? 'Qué bueno verte.' : 'Crea tu cuenta.'}
          </h1>
          <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-[#6A5740]">
            Guarda tus obras favoritas, reserva experiencias y encuentra tus facturas y certificados
            digitales en un solo lugar.
          </p>
          <button
            type="button"
            onClick={() => setAuthMode((m) => (m === 'in' ? 'up' : 'in'))}
            className="mt-6 min-h-[44px] cursor-pointer rounded-sm border border-[#D8CBB3] bg-white px-5 py-2.5 text-sm font-medium text-[#9E5602] hover:bg-[#F2E7CF]"
          >
            {authMode === 'in'
              ? '¿Primera vez aquí? Crear cuenta'
              : 'Ya tengo cuenta. Iniciar sesión'}
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin((name.trim() || email.split('@')[0] || 'Ana').split(' ')[0]);
          }}
          className="space-y-4 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-7 lg:col-span-6"
        >
          {authMode === 'up' && (
            <div>
              <label htmlFor="lg-name" className="block text-xs font-medium text-[#2F200E]">
                Nombre completo
              </label>
              <input
                id="lg-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
              />
            </div>
          )}
          <div>
            <label htmlFor="lg-email" className="block text-xs font-medium text-[#2F200E]">
              Correo electrónico
            </label>
            <input
              id="lg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
            />
          </div>
          <div>
            <label htmlFor="lg-pass" className="block text-xs font-medium text-[#2F200E]">
              Contraseña
            </label>
            <input
              id="lg-pass"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
            />
          </div>
          <button
            type="submit"
            className="min-h-[46px] w-full cursor-pointer rounded-sm bg-[#B76904] px-6 py-3 text-sm font-semibold text-white hover:bg-[#9E5602]"
          >
            {authMode === 'in' ? 'Iniciar sesión' : 'Crear mi cuenta'}
          </button>
        </form>
      </div>
    );
  }

  const wishedWorks = ARTWORKS.filter((o) => wishlist.includes(o.id));
  const wishedTechs = wishedWorks.map((o) => o.technique);
  const recommended = ARTWORKS.filter(
    (o) => !wishlist.includes(o.id) && wishedTechs.includes(o.technique)
  ).slice(0, 2);

  const prefLabels = [
    'Novedades de artistas que sigo',
    'Recordatorios de reservas y cursos',
    'Alertas por WhatsApp',
  ];

  return (
    <div className="mx-auto max-w-[1160px] space-y-12 px-5 py-10 lg:px-8 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5DAC3] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#B76904] uppercase">
            Tu espacio en Lumina
          </p>
          <h1 className="mt-1 font-serif text-4xl font-medium text-[#9E5602]">Hola, {user}.</h1>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="min-h-[40px] cursor-pointer rounded-sm border border-[#D8CBB3] bg-white px-4 py-2 text-xs font-medium text-[#9E5602] hover:bg-[#F2E7CF]"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Wishlist */}
      <section>
        <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Lista de deseos</h2>
        {wishedWorks.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {wishedWorks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                isWished
                onToggleWish={onToggleWish}
              />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-[#6A5740]">
            Toca el corazón en cualquier obra para guardarla aquí.
          </p>
        )}
      </section>

      {/* Reservations */}
      <section>
        <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Mis reservas y cursos</h2>
        <div className="mt-4 divide-y divide-[#E5DAC3] rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] px-5">
          {reservations.length > 0 ? (
            reservations.map((res, idx) => (
              <div
                key={`${res.title}-${idx}`}
                className="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
              >
                <div>
                  <p className="font-semibold text-[#2F200E]">{res.title}</p>
                  <p className="text-xs text-[#6A5740]">
                    {res.kind} confirmada <span aria-hidden="true">·</span> {res.when}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onCancelReservation(idx)}
                  className="cursor-pointer text-xs font-semibold text-[#9E5602] hover:underline"
                >
                  Cancelar
                </button>
              </div>
            ))
          ) : (
            <p className="py-4 text-sm text-[#6A5740]">Aún no tienes reservas activas.</p>
          )}
        </div>
      </section>

      {/* Purchases */}
      <section>
        <h2 className="font-serif text-2xl font-medium text-[#9E5602]">
          Mis compras, facturas y certificados
        </h2>
        <div className="mt-4 divide-y divide-[#E5DAC3] rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] px-5">
          {purchases.map((p) => (
            <div
              key={p.orderNumber}
              className="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
            >
              <div>
                <p className="font-semibold text-[#2F200E]">
                  Pedido {p.orderNumber} · {p.title}
                </p>
                <p className="text-xs text-[#6A5740] tabular-nums">
                  {formatCOP(p.total)} · {p.date}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => onToast('Descarga de factura (PDF) de muestra')}
                  className="min-h-[38px] cursor-pointer rounded-sm border border-[#D8CBB3] bg-white px-3.5 py-1.5 text-xs font-medium text-[#9E5602] hover:bg-[#F2E7CF]"
                >
                  Factura (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => onToast('Descarga de certificado digital de muestra')}
                  className="min-h-[38px] cursor-pointer rounded-sm border border-[#D8CBB3] bg-white px-3.5 py-1.5 text-xs font-medium text-[#9E5602] hover:bg-[#F2E7CF]"
                >
                  Certificado de autenticidad
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Elegidas para ti</h2>
        {recommended.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                isWished={wishlist.includes(artwork.id)}
                onToggleWish={onToggleWish}
              />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-[#6A5740]">
            Guarda obras en tu lista de deseos y te sugeriremos piezas afines.
          </p>
        )}
      </section>

      {/* Preferences */}
      <section>
        <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Preferencias y alertas</h2>
        <div className="mt-4 space-y-3 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-5">
          {prefLabels.map((label, idx) => (
            <label key={label} className="flex cursor-pointer items-center gap-3 text-sm text-[#2F200E]">
              <input
                type="checkbox"
                checked={Boolean(preferences[idx])}
                onChange={() => onTogglePreference(idx)}
                className="h-4 w-4 accent-[#B76904]"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

export function HelpView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const trustPillars = [
    [
      'Autenticidad',
      'Cada obra incluye información de autoría y edición. Su certificado digital queda disponible en Mi cuenta.',
    ],
    [
      'Pagos protegidos',
      'Paga con Nequi, Daviplata, PSE o tarjetas. Ves el total y los costos de envío antes de confirmar.',
    ],
    [
      'Envíos y garantía',
      'Embalaje cuidado y seguimiento. Tienes 5 días hábiles para solicitar la devolución. Si recibes una obra con daños, escríbenos.',
    ],
    [
      'Factura y soporte',
      'Encuentra tu factura y documentos en Mi cuenta. Nuestro equipo te acompaña con cualquier solicitud.',
    ],
  ];

  const faqs = [
    [
      '¿Cómo sé que una obra es auténtica?',
      'Revisa su ficha técnica y los datos del artista. El certificado digital identifica autoría, medidas y número de edición.',
    ],
    [
      '¿Cómo solicito una devolución o garantía?',
      'Entra a Mis compras, abre tu pedido y escríbenos con el número de compra y fotografías si corresponde.',
    ],
    [
      '¿Dónde encuentro mi factura y mis certificados?',
      'En Mi cuenta, sección de compras: puedes consultarlos y descargarlos en cualquier momento.',
    ],
    [
      '¿Puedo cancelar una reserva o una inscripción?',
      'Sí. Gestiona tu reserva gratuitamente desde Mi cuenta; para cursos, revisa las condiciones antes de confirmar.',
    ],
  ];

  return (
    <div>
      <section className="bg-[#B76904] py-12 text-white lg:py-14">
        <div className="mx-auto max-w-[1160px] px-5 lg:px-8">
          <p className="text-xs font-semibold tracking-wider text-[#F7DFB2] uppercase">
            Ayuda y confianza
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.2rem,4vw,3.3rem)] font-medium text-white">
            Compra con confianza.
          </h1>
          <p className="mt-2 max-w-[56ch] text-base text-[#FDF6E8]">
            Elige con calma. Te acompañamos antes, durante y después de encontrar tu obra.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1160px] px-5 py-12 lg:px-8">
        <h2 className="font-serif text-3xl font-medium text-[#9E5602]">
          Arte con respaldo, de principio a fin.
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {trustPillars.map(([title, body]) => (
            <div key={title} className="rounded-sm border border-[#E5DAC3] bg-[#F2E7CF] p-6">
              <h3 className="font-serif text-2xl font-medium text-[#9E5602]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2F200E]">{body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-3xl font-medium text-[#9E5602]">
          Resolvemos tus dudas.
        </h2>
        <div className="mt-4 divide-y divide-[#E5DAC3] border-y border-[#E5DAC3]">
          {faqs.map(([q, a], idx) => (
            <div key={q}>
              <button
                type="button"
                aria-expanded={openFaq === idx}
                onClick={() => setOpenFaq((prev) => (prev === idx ? null : idx))}
                className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm font-semibold text-[#2F200E]"
              >
                <span>{q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#9E5602] transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <p className="pb-4 text-sm leading-relaxed text-[#6A5740]">{a}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-7">
          <h3 className="font-serif text-2xl font-medium text-[#9E5602]">
            Hablemos de tu próxima obra.
          </h3>
          <p className="mt-1.5 text-sm text-[#6A5740]">
            Atención personalizada · Lunes a viernes, 9:00 a. m.–6:00 p. m. (Colombia)
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/570000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center rounded-sm border border-[#D8CBB3] bg-white px-5 py-2 text-sm font-medium text-[#9E5602] hover:bg-[#F2E7CF]"
            >
              Escribir por WhatsApp
            </a>
            <a
              href="mailto:hola@lumina.example"
              className="text-sm font-medium text-[#9E5602] hover:underline"
            >
              hola@lumina.example
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SearchViewProps {
  query: string;
  wishlist: number[];
  onToggleWish: (id: number) => void;
}

export function SearchView({ query, wishlist, onToggleWish }: SearchViewProps) {
  const [tab, setTab] = useState<'Todo' | 'Obras' | 'Artistas' | 'Agenda' | 'Cursos'>('Todo');
  const results = searchCatalog(query);
  const total =
    results.artworks.length +
    results.artists.length +
    results.events.length +
    results.courses.length;

  const tabs: ('Todo' | 'Obras' | 'Artistas' | 'Agenda' | 'Cursos')[] = [
    'Todo',
    'Obras',
    'Artistas',
    'Agenda',
    'Cursos',
  ];

  const showSection = (name: typeof tab) => tab === 'Todo' || tab === name;

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <h1 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-medium text-[#9E5602]">
        Resultados para “{query}”
      </h1>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Categorías de búsqueda">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`min-h-[40px] cursor-pointer rounded-sm border px-4 py-2 text-xs font-medium whitespace-nowrap ${
              tab === t
                ? 'border-[#B76904] bg-[#B76904] text-white'
                : 'border-[#D8CBB3] bg-white text-[#7D4200] hover:border-[#B76904]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {total === 0 ? (
        <div className="mt-8 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-8">
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">
            No encontramos resultados.
          </h2>
          <p className="mt-2 text-sm text-[#6A5740]">
            Revisa la ortografía o explora nuestras obras disponibles.
          </p>
          <a
            href="#obras"
            className="mt-5 inline-flex min-h-[44px] items-center rounded-sm bg-[#B76904] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9E5602]"
          >
            Ver obras disponibles
          </a>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {showSection('Obras') && results.artworks.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Obras</h2>
              <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {results.artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    isWished={wishlist.includes(artwork.id)}
                    onToggleWish={onToggleWish}
                  />
                ))}
              </div>
            </section>
          )}

          {showSection('Artistas') && results.artists.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Artistas</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {results.artists.map((a) => (
                  <a
                    key={a.id}
                    href={`#artista-${a.id}`}
                    className="flex items-center gap-4 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-4 hover:border-[#B76904]"
                  >
                    <GalleryImage
                      src={a.image}
                      alt={a.name}
                      fallbackGradient={a.fallbackGradient}
                      className="h-16 w-20 shrink-0 rounded-sm"
                    />
                    <div>
                      <p className="font-serif text-xl font-medium text-[#9E5602]">{a.name}</p>
                      <p className="text-xs text-[#6A5740]">{a.techniques}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {showSection('Agenda') && results.events.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Agenda</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {results.events.map((ev) => (
                  <a
                    key={ev.id}
                    href={`#evento-${ev.id}`}
                    className="block rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-5 hover:border-[#B76904]"
                  >
                    <p className="text-xs font-semibold text-[#B76904] uppercase">{ev.kind}</p>
                    <p className="mt-1 font-serif text-xl font-medium text-[#9E5602]">{ev.title}</p>
                    <p className="mt-1 text-xs text-[#6A5740]">{ev.dateLabel}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {showSection('Cursos') && results.courses.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Cursos</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {results.courses.map((c) => (
                  <a
                    key={c.id}
                    href={`#curso-${c.id}`}
                    className="block rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-5 hover:border-[#B76904]"
                  >
                    <p className="text-xs font-semibold text-[#B76904] uppercase">{c.modality}</p>
                    <p className="mt-1 font-serif text-xl font-medium text-[#9E5602]">{c.title}</p>
                    <p className="mt-1 text-xs text-[#6A5740] tabular-nums">
                      {formatCOP(c.price)}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
