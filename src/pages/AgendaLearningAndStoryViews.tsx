import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ArtworkCard } from '../components/ArtworkCard';
import { GalleryImage } from '../components/GalleryImage';
import {
  ARTWORKS,
  COURSE_MODALITIES,
  COURSES,
  EVENT_TYPES,
  EVENTS,
  formatCOP,
  getArtistById,
  PAYMENT_METHODS,
  STORIES,
} from '../data/galleryData';
import type { Reservation } from '../types/gallery';

export function AgendaView() {
  const [selectedKind, setSelectedKind] = useState('Todos');
  const [selectedAdmission, setSelectedAdmission] = useState('Todos');

  const filtered = EVENTS.filter(
    (e) =>
      (selectedKind === 'Todos' || e.kind === selectedKind) &&
      (selectedAdmission === 'Todos' || e.admission.startsWith(selectedAdmission))
  );

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#B76904] uppercase">
        Agenda Lumina
      </p>
      <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-medium text-[#9E5602]">
        El arte también se vive.
      </h1>
      <p className="mt-2 max-w-[58ch] text-sm text-[#6A5740] sm:text-base">
        Exposiciones, inauguraciones y encuentros para descubrir nuevas perspectivas.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Tipo de evento">
          {EVENT_TYPES.map((type) => {
            const active = selectedKind === type;
            return (
              <button
                key={type}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedKind(type)}
                className={`min-h-[40px] cursor-pointer rounded-sm border px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'border-[#B76904] bg-[#B76904] text-white'
                    : 'border-[#D8CBB3] bg-white text-[#7D4200] hover:border-[#B76904]'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Tipo de entrada">
          {['Todos', 'Entrada libre', 'Con inscripción'].map((adm) => {
            const active = selectedAdmission === adm;
            return (
              <button
                key={adm}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedAdmission(adm)}
                className={`min-h-[40px] cursor-pointer rounded-sm border px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'border-[#9E5602] bg-[#F2E7CF] font-semibold text-[#9E5602]'
                    : 'border-[#D8CBB3] bg-white text-[#6A5740] hover:border-[#B76904]'
                }`}
              >
                {adm}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {filtered.map((ev) => (
            <a
              key={ev.id}
              href={`#evento-${ev.id}`}
              className="group block overflow-hidden rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <GalleryImage
                src={ev.image}
                alt={ev.title}
                fallbackGradient={ev.fallbackGradient}
                className="aspect-[16/9] w-full"
                imgClassName="transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="p-6">
                <p className="text-xs font-semibold tracking-wider text-[#B76904] uppercase">
                  {ev.shortDate}
                </p>
                <h2 className="mt-1.5 font-serif text-2xl font-medium text-[#9E5602]">
                  {ev.title}
                </h2>
                <p className="mt-1 text-sm text-[#6A5740]">
                  {ev.kind} <span aria-hidden="true">·</span> Galería Lumina · Bogotá{' '}
                  <span aria-hidden="true">·</span> <strong className="text-[#2F200E]">{ev.admission}</strong>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#2F200E]">{ev.description}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] p-8">
          <p className="text-sm text-[#6A5740]">
            No hay eventos con esos filtros. Prueba seleccionando “Todos”.
          </p>
        </div>
      )}
    </div>
  );
}

interface EventDetailViewProps {
  eventId: number;
  onAddReservation: (reservation: Reservation) => void;
}

export function EventDetailView({ eventId, onAddReservation }: EventDetailViewProps) {
  const ev = EVENTS.find((e) => e.id === eventId) || EVENTS[0];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [guests, setGuests] = useState('2 personas');
  const [confirmed, setConfirmed] = useState(false);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReservation({
      title: ev.title,
      when: `${ev.dateLabel.split(' · ')[0]} · ${guests}`,
      kind: ev.admission.startsWith('Con') ? 'Inscripción' : 'Reserva',
    });
    setConfirmed(true);
  };

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <p className="text-xs text-[#7A6247]">
        <a href="#agenda" className="hover:text-[#9E5602] hover:underline">
          Agenda
        </a>{' '}
        <span aria-hidden="true">/</span> {ev.kind}
      </p>

      <h1 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.3rem)] leading-tight font-medium text-[#9E5602]">
        {ev.title}
      </h1>
      <p className="mt-2 text-sm text-[#6A5740] sm:text-base">
        {ev.dateLabel} <span aria-hidden="true">·</span> Galería Lumina, Bogotá
      </p>

      <div className="mt-6 overflow-hidden rounded-sm border border-[#E5DAC3]">
        <GalleryImage
          src={ev.image}
          alt={ev.title}
          fallbackGradient={ev.fallbackGradient}
          className="aspect-[21/9] w-full"
        />
      </div>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-6">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Antes de ir</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#2F200E]">
              <strong>{ev.admission}</strong>. Aforo limitado para garantizar una experiencia
              cercana. {ev.description}
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium text-[#9E5602]">Cómo llegar</h3>
            <p className="mt-1 text-sm text-[#6A5740]">
              Calle 70 # 5–20 (sede de muestra en Bogotá). Transporte público y parqueaderos
              cercanos.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium text-[#9E5602]">Qué ponerte</h3>
            <p className="mt-1 text-sm text-[#6A5740]">
              Vestimenta casual y cómoda. No se requiere etiqueta formal.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium text-[#9E5602]">Accesibilidad</h3>
            <p className="mt-1 text-sm text-[#6A5740]">
              Acceso para personas con movilidad reducida. Escríbenos antes de tu visita si
              necesitas apoyo especial.
            </p>
          </div>
        </div>

        <div className="rounded-sm border border-[#E5DAC3] bg-[#F2E7CF] p-7 lg:col-span-6">
          <h2 className="font-serif text-2xl font-medium text-[#9E5602]">Reserva tu lugar</h2>
          <p className="mt-1 text-xs text-[#6A5740]">
            Sin crear cuenta · Cancelación gratis hasta 48 h antes
          </p>

          {confirmed ? (
            <div
              role="status"
              className="mt-5 rounded-sm border border-[#1F6E43]/40 bg-white p-5 text-sm text-[#1F6E43]"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">
                    Listo, {name.split(' ')[0]}. Tu reserva está confirmada.
                  </p>
                  <p className="mt-1 text-[#2F200E]">
                    Enviamos los detalles a {email}
                    {whatsapp ? ' y WhatsApp' : ''}. Puedes gestionarla o cancelarla gratis desde{' '}
                    <a href="#cuenta" className="font-semibold text-[#9E5602] underline">
                      Mi cuenta
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="mt-5 space-y-4">
              <div>
                <label htmlFor="ev-name" className="block text-xs font-medium text-[#2F200E]">
                  Nombre completo
                </label>
                <input
                  id="ev-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
                />
              </div>
              <div>
                <label htmlFor="ev-email" className="block text-xs font-medium text-[#2F200E]">
                  Correo electrónico
                </label>
                <input
                  id="ev-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
                />
              </div>
              <div>
                <label htmlFor="ev-wa" className="block text-xs font-medium text-[#2F200E]">
                  WhatsApp (opcional)
                </label>
                <input
                  id="ev-wa"
                  inputMode="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
                />
              </div>
              <div>
                <label htmlFor="ev-guests" className="block text-xs font-medium text-[#2F200E]">
                  Asistentes
                </label>
                <select
                  id="ev-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
                >
                  <option>1 persona</option>
                  <option>2 personas</option>
                  <option>3 personas</option>
                  <option>4 personas</option>
                </select>
              </div>
              <button
                type="submit"
                className="min-h-[46px] w-full cursor-pointer rounded-sm bg-[#B76904] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9E5602]"
              >
                Reservar {ev.admission.startsWith('Con') ? 'inscripción' : 'visita'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function LearningView() {
  const [modality, setModality] = useState('Todas');
  const [onlyCert, setOnlyCert] = useState(false);

  const filtered = COURSES.filter(
    (c) => (modality === 'Todas' || c.modality === modality) && (!onlyCert || c.hasCertificate)
  );

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#B76904] uppercase">
        Aprender en Lumina
      </p>
      <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-medium text-[#9E5602]">
        Haz espacio para crear.
      </h1>
      <p className="mt-2 max-w-[58ch] text-sm text-[#6A5740] sm:text-base">
        Cursos y talleres con artistas. Aprende a tu ritmo o comparte la experiencia en vivo.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Modalidad">
        {COURSE_MODALITIES.map((mod) => {
          const active = modality === mod;
          return (
            <button
              key={mod}
              type="button"
              aria-pressed={active}
              onClick={() => setModality(mod)}
              className={`min-h-[40px] cursor-pointer rounded-sm border px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                active
                  ? 'border-[#B76904] bg-[#B76904] text-white'
                  : 'border-[#D8CBB3] bg-white text-[#7D4200] hover:border-[#B76904]'
              }`}
            >
              {mod}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={onlyCert}
          onClick={() => setOnlyCert((v) => !v)}
          className={`min-h-[40px] cursor-pointer rounded-sm border px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            onlyCert
              ? 'border-[#9E5602] bg-[#F2E7CF] font-semibold text-[#9E5602]'
              : 'border-[#D8CBB3] bg-white text-[#6A5740] hover:border-[#B76904]'
          }`}
        >
          Con certificación
        </button>
      </div>

      <p role="status" className="mt-4 text-xs font-medium text-[#7A6247] tabular-nums">
        {filtered.length} {filtered.length === 1 ? 'curso disponible' : 'cursos disponibles'}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {filtered.map((course) => {
          const artist = getArtistById(course.artistId);
          return (
            <a
              key={course.id}
              href={`#curso-${course.id}`}
              className="group block overflow-hidden rounded-sm border border-[#E5DAC3] bg-[#FDFBF6] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <GalleryImage
                src={course.image}
                alt={course.title}
                fallbackGradient={course.fallbackGradient}
                className="aspect-[16/9] w-full"
                imgClassName="transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="p-6">
                <p className="text-xs font-semibold tracking-wider text-[#B76904] uppercase">
                  {course.modality}
                  {course.hasCertificate ? ' · Con certificado' : ''}
                </p>
                <h2 className="mt-1.5 font-serif text-2xl font-medium text-[#9E5602]">
                  {course.title}
                </h2>
                <p className="mt-1 text-sm text-[#2F200E]">Con {artist.name}</p>
                <p className="mt-1 text-xs text-[#6A5740]">{course.schedule}</p>
                <p className="mt-3 text-base font-semibold text-[#2F200E] tabular-nums">
                  {formatCOP(course.price)}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

interface CourseDetailViewProps {
  courseId: number;
  onAddReservation: (reservation: Reservation) => void;
}

export function CourseDetailView({ courseId, onAddReservation }: CourseDetailViewProps) {
  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const artist = getArtistById(course.artistId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [payMethod, setPayMethod] = useState(PAYMENT_METHODS[0]);
  const [confirmed, setConfirmed] = useState(false);

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReservation({
      title: course.title,
      when: `${course.schedule.split(' · ')[0]} · ${payMethod}`,
      kind: 'Inscripción a curso',
    });
    setConfirmed(true);
  };

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 lg:px-8 lg:py-12">
      <p className="text-xs text-[#7A6247]">
        <a href="#aprender" className="hover:text-[#9E5602] hover:underline">
          Aprender
        </a>{' '}
        <span aria-hidden="true">/</span> {course.modality}
      </p>

      <h1 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.3rem)] leading-tight font-medium text-[#9E5602]">
        {course.title}
      </h1>
      <p className="mt-2 text-sm text-[#6A5740] sm:text-base">
        Con{' '}
        <a href={`#artista-${artist.id}`} className="font-medium text-[#9E5602] hover:underline">
          {artist.name}
        </a>{' '}
        <span aria-hidden="true">·</span> {course.schedule}
      </p>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-6">
          <div className="overflow-hidden rounded-sm border border-[#E5DAC3]">
            <GalleryImage
              src={course.image}
              alt={course.title}
              fallbackGradient={course.fallbackGradient}
              className="aspect-[16/10] w-full"
            />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-[#9E5602]">
              Lo que vas a aprender
            </h2>
            <div className="mt-4 space-y-4">
              {course.syllabus.map((mod) => (
                <div key={mod.title} className="border-b border-[#E5DAC3] pb-4">
                  <p className="font-semibold text-[#2F200E]">{mod.title}</p>
                  <p className="mt-1 text-sm text-[#6A5740]">{mod.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-medium text-[#9E5602]">Foro del curso</h3>
            <p className="mt-1.5 text-sm text-[#6A5740]">
              Espacio exclusivo para estudiantes inscritos: comparte avances semanales y recibe
              orientación directa de {artist.name}.
            </p>
          </div>
        </div>

        <div className="rounded-sm border border-[#E5DAC3] bg-[#F2E7CF] p-7 lg:col-span-6">
          <p className="text-[1.9rem] font-semibold text-[#2F200E] tabular-nums">
            {formatCOP(course.price)}
          </p>
          <p className="mt-1 text-xs text-[#6A5740]">
            Impuestos incluidos <span aria-hidden="true">·</span>{' '}
            {course.seats < 99 ? `${course.seats} cupos disponibles` : 'Cupos abiertos'}
          </p>
          <p className="mt-2 text-sm font-medium text-[#9E5602]">
            {course.modality}
            {course.hasCertificate ? ' · Certificado de participación' : ' · Sin certificado'}
          </p>

          {confirmed ? (
            <div
              role="status"
              className="mt-6 rounded-sm border border-[#1F6E43]/40 bg-white p-5 text-sm text-[#1F6E43]"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">
                    Inscripción confirmada, {name.split(' ')[0]}.
                  </p>
                  <p className="mt-1 text-[#2F200E]">
                    Pago recibido por {payMethod}. Enviamos el enlace de acceso a {email}. Puedes
                    verla en{' '}
                    <a href="#cuenta" className="font-semibold text-[#9E5602] underline">
                      Mi cuenta
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnroll} className="mt-6 space-y-4">
              <div>
                <label htmlFor="cu-name" className="block text-xs font-medium text-[#2F200E]">
                  Nombre completo
                </label>
                <input
                  id="cu-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-sm border border-[#D8CBB3] bg-white px-3 text-sm text-[#2F200E]"
                />
              </div>
              <div>
                <label htmlFor="cu-email" className="block text-xs font-medium text-[#2F200E]">
                  Correo electrónico
                </label>
                <input
                  id="cu-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                        name="course-pay"
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
                <span>Acepto términos, condiciones y política de privacidad de Lumina.</span>
              </label>

              <button
                type="submit"
                className="min-h-[46px] w-full cursor-pointer rounded-sm bg-[#B76904] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9E5602]"
              >
                Inscribirme y pagar {formatCOP(course.price)}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface StoryDetailViewProps {
  storyId: number;
  wishlist: number[];
  onToggleWish: (id: number) => void;
}

export function StoryDetailView({
  storyId,
  wishlist,
  onToggleWish,
}: StoryDetailViewProps) {
  const story = STORIES.find((s) => s.id === storyId) || STORIES[0];
  const relatedWorks = ARTWORKS.filter((o) => story.relatedWorkIds.includes(o.id));

  return (
    <article className="mx-auto max-w-[900px] px-5 py-10 lg:px-8 lg:py-14">
      <a
        href="#inicio"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9E5602] hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Volver al inicio</span>
      </a>

      <p className="mt-5 text-[0.74rem] font-semibold tracking-[0.14em] text-[#B76904] uppercase">
        {story.kicker} <span aria-hidden="true">·</span> {story.publishedAt}{' '}
        <span aria-hidden="true">·</span> {story.readTime}
      </p>

      <h1 className="mt-3 font-serif text-[clamp(2.2rem,4.2vw,3.4rem)] leading-tight font-medium text-[#9E5602]">
        {story.title}
      </h1>
      <p className="mt-2 text-sm text-[#6A5740]">Por {story.author}</p>

      <div className="mt-7 overflow-hidden rounded-sm border border-[#E5DAC3]">
        <GalleryImage
          src={story.image}
          alt={story.title}
          className="aspect-[16/9] w-full"
        />
      </div>

      <div className="mx-auto mt-10 max-w-[65ch] space-y-6 text-base leading-[1.8] text-[#2F200E]">
        <p className="font-medium text-[#4A3720] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:text-[#9E5602]">
          {story.lead}
        </p>

        <blockquote className="my-8 border-y border-[#E5DAC3] py-6 font-serif text-2xl italic leading-snug text-[#9E5602]">
          {story.pullQuote}
        </blockquote>

        {story.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {relatedWorks.length > 0 && (
        <div className="mt-14 border-t border-[#E5DAC3] pt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-medium text-[#9E5602]">
              Obras mencionadas
            </h2>
            <a
              href="#obras"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#9E5602] hover:underline"
            >
              <span>Ver catálogo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedWorks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                isWished={wishlist.includes(artwork.id)}
                onToggleWish={onToggleWish}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
