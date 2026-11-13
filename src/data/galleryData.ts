import galleryExhibitionHero from '../assets/images/gallery_exhibition_hero_1794531755201.jpg';
import artistElenaStudio from '../assets/images/artist_elena_studio_1794531755494.jpg';
import artistMateoStudio from '../assets/images/artist_mateo_studio_1794531756303.jpg';
import workshopColorPalette from '../assets/images/workshop_color_palette_1794531756242.jpg';
import artworkUmbralVioleta from '../assets/images/artwork_umbral_violeta_1794531756027.jpg';
import artworkTierraAdentro from '../assets/images/artwork_tierra_adentro_1794531757671.jpg';
import artworkLuzSuspendida from '../assets/images/artwork_luz_suspendida_1794531756999.jpg';
import artworkPaisajeInterior from '../assets/images/artwork_paisaje_interior_1794531757492.jpg';
import artworkRaizRelieve from '../assets/images/artwork_raiz_relieve_1794531758058.jpg';
import artworkHoraAzul from '../assets/images/artwork_hora_azul_1794531758579.jpg';
import artworkMemoriaArcilla from '../assets/images/artwork_memoria_arcilla_1794531758717.jpg';
import artworkUmbralMayor from '../assets/images/artwork_umbral_mayor_1794531758520.jpg';

import type { Artist, Artwork, Course, EditorialStory, GalleryEvent } from '../types/gallery';

export const IMAGES = {
  galleryExhibitionHero,
  artistElenaStudio,
  artistMateoStudio,
  workshopColorPalette,
};

export const ARTISTS: Artist[] = [
  {
    id: 1,
    name: 'Elena Vidal',
    city: 'Bogotá',
    techniques: 'Pintura · Arte digital · Fotografía',
    quote: '“El color es una forma de habitar el mundo.”',
    bio: 'Elena explora la memoria a través de paisajes emocionales. Su práctica conecta procesos digitales con gestos artesanales, veladuras cálidas y capas de color.',
    timeline: [
      '2026 · Habitar el color · Galería Lumina',
      '2025 · Serie Paisajes emocionales',
      '2024 · Investigación entre imagen y materia',
    ],
    image: artistElenaStudio,
    fallbackGradient: 'linear-gradient(135deg, #EAD9BE, #C68B45 55%, #8D5119)',
  },
  {
    id: 2,
    name: 'Mateo Ríos',
    city: 'Medellín',
    techniques: 'Pintura · Escultura y relieve',
    quote: '“La tierra recuerda lo que olvidamos.”',
    bio: 'Mateo trabaja el paisaje y la materia: capas de óleo, pigmentos minerales y arcilla que hablan de territorio, tiempo y luz natural.',
    timeline: [
      '2026 · Habitar el color · Galería Lumina',
      '2025 · Serie Tierra y naturaleza',
      '2023 · Residencia de escultura en Medellín',
    ],
    image: artistMateoStudio,
    fallbackGradient: 'linear-gradient(135deg, #E9C98F, #B4703F 55%, #5E3417)',
  },
];

export const ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: 'Umbral violeta',
    artistId: 1,
    technique: 'Arte digital y mixto',
    price: 480000,
    image: artworkUmbralVioleta,
    fallbackGradient: 'linear-gradient(140deg, #54325D, #9E74A8 55%, #F2E2C4)',
    isPresale: false,
    dimensionsAndMedium: 'Acrílico sobre papel artesanal · 40 × 50 cm',
    hasVideo: true,
    hasCertificate: true,
    edition: '11 de 50 · Firmada · 2026',
    description:
      'Una exploración de la luz nocturna sobre papel de borde rasgado. Capas densas de pincelada abierta dialogan con un centro luminoso en crema cálido.',
  },
  {
    id: 2,
    title: 'Tierra adentro',
    artistId: 2,
    technique: 'Pintura',
    price: 420000,
    image: artworkTierraAdentro,
    fallbackGradient: 'linear-gradient(170deg, #F1DFC0, #D9A15E 45%, #8B4A3A 78%)',
    isPresale: false,
    dimensionsAndMedium: 'Óleo sobre lienzo · 50 × 70 cm',
    hasVideo: false,
    hasCertificate: true,
    edition: '12 de 50 · Firmada · 2026',
    description:
      'Colinas ocres y terracota trabajadas con espátula amplia y óleo mate. Una mirada íntima a la quietud de los altiplanos bajo la luz de la tarde.',
  },
  {
    id: 3,
    title: 'Luz suspendida',
    artistId: 1,
    technique: 'Arte digital y mixto',
    price: 490000,
    image: artworkLuzSuspendida,
    fallbackGradient: 'linear-gradient(140deg, #F7F1E1, #E8C77B 55%, #B9A2E0)',
    isPresale: true,
    dimensionsAndMedium: 'Impresión de archivo e intervención sobre papel · 50 × 50 cm',
    hasVideo: true,
    hasCertificate: true,
    edition: '13 de 50 · Preventa firmada · 2026',
    description:
      'Planos translúcidos en ámbar suave, ocre dorado y lila pálido superpuestos sobre papel de algodón de 310 g.',
  },
  {
    id: 4,
    title: 'Paisaje interior',
    artistId: 2,
    technique: 'Pintura',
    price: 360000,
    image: artworkPaisajeInterior,
    fallbackGradient: 'linear-gradient(155deg, #EFE3CD 35%, #4C7A78 65%, #1F4A3A)',
    isPresale: false,
    dimensionsAndMedium: 'Acrílico sobre lienzo · 40 × 40 cm',
    hasVideo: false,
    hasCertificate: true,
    edition: '14 de 50 · Firmada · 2026',
    description:
      'Montañas en capas de verde bosque y azul pizarra coronadas por un sol terracota suspendido en un cielo cálido de lino.',
  },
  {
    id: 5,
    title: 'Raíz y relieve',
    artistId: 2,
    technique: 'Escultura y relieve',
    price: 780000,
    image: artworkRaizRelieve,
    fallbackGradient: 'linear-gradient(135deg, #8A7A68, #CDB89C 50%, #6E5A48)',
    isPresale: false,
    dimensionsAndMedium: 'Cerámica y pigmento mineral · 30 × 40 cm',
    hasVideo: true,
    hasCertificate: true,
    edition: '15 de 25 · Pieza única numerada · 2026',
    description:
      'Relieve mural tallado en arcilla cruda y pigmentos de tierra, pensado para proyectar sombras cambiantes a lo largo del día.',
  },
  {
    id: 6,
    title: 'Hora azul',
    artistId: 1,
    technique: 'Fotografía',
    price: 290000,
    image: artworkHoraAzul,
    fallbackGradient: 'linear-gradient(180deg, #1D2F57, #5F7FB3 55%, #F0C9A0)',
    isPresale: false,
    dimensionsAndMedium: 'Fotografía en papel de algodón · 30 × 45 cm',
    hasVideo: false,
    hasCertificate: false,
    edition: '5 de 16 · Edición numerada · 2026',
    description:
      'Registro analógico al caer la tarde sobre el agua calma, donde el azul profundo cede paso al resplandor dorado del horizonte.',
  },
  {
    id: 7,
    title: 'Memoria de arcilla',
    artistId: 2,
    technique: 'Escultura y relieve',
    price: 2400000,
    image: artworkMemoriaArcilla,
    fallbackGradient: 'linear-gradient(145deg, #5A3D34, #B98A6D 60%, #E6CDB2)',
    isPresale: true,
    dimensionsAndMedium: 'Arcilla patinada · 45 × 30 × 20 cm',
    hasVideo: true,
    hasCertificate: true,
    edition: 'Pieza de estudio · Preventa · 2026',
    description:
      'Volumen orgánico modelado a mano en capas de terracota y pátina mineral verde-cobre, cocido a baja temperatura.',
  },
  {
    id: 8,
    title: 'Umbral mayor',
    artistId: 1,
    technique: 'Pintura',
    price: 6500000,
    image: artworkUmbralMayor,
    fallbackGradient: 'linear-gradient(140deg, #3B2314, #A6651A 55%, #F6ECD6)',
    isPresale: false,
    dimensionsAndMedium: 'Óleo sobre lienzo de gran formato · 120 × 150 cm',
    hasVideo: false,
    hasCertificate: true,
    edition: 'Obra original única · 2026',
    description:
      'Lienzo de gran escala con empastes densos en ámbar quemado, tierra sombra y ciruela rodeando un núcleo de luz dorada.',
  },
];

export const EVENTS: GalleryEvent[] = [
  {
    id: 1,
    title: 'Habitar el color',
    kind: 'Inauguración',
    dateLabel: '21 nov 2026 · 6:00 p. m.',
    shortDate: '21 NOV · 6:00 P. M.',
    admission: 'Entrada libre',
    image: galleryExhibitionHero,
    fallbackGradient: 'linear-gradient(135deg, #B76904, #D99B38)',
    description:
      'Exposición curatorial que reúne pinturas de gran formato, relieves en arcilla y obra sobre papel para experimentar la temperatura del color en sala.',
  },
  {
    id: 2,
    title: 'Color y composición',
    kind: 'Conversación',
    dateLabel: '28 nov 2026 · 10:00 a. m.',
    shortDate: '28 NOV · 10:00 A. M.',
    admission: 'Con inscripción',
    image: workshopColorPalette,
    fallbackGradient: 'linear-gradient(135deg, #EAD9BE, #B76904)',
    description:
      'Encuentro práctico y conversación abierta sobre mezclas cromáticas, armonías cálidas y preparación de paleta junto a Elena Vidal.',
  },
  {
    id: 3,
    title: 'El color como memoria',
    kind: 'Conversación',
    dateLabel: '5 dic 2026 · 4:00–5:30 p. m.',
    shortDate: '5 DIC · 4:00 P. M.',
    admission: 'Con inscripción',
    image: artistMateoStudio,
    fallbackGradient: 'linear-gradient(135deg, #E9C98F, #B4703F)',
    description:
      'Diálogo en sala con Mateo Ríos sobre pigmentos naturales, territorio y el vínculo entre materia y recuerdo.',
  },
  {
    id: 4,
    title: 'Preventa: serie Raíz',
    kind: 'Preventa',
    dateLabel: '12 dic 2026 · Acceso anticipado',
    shortDate: '12 DIC · ACCESO ANTICIPADO',
    admission: 'Con inscripción',
    image: artworkRaizRelieve,
    fallbackGradient: 'linear-gradient(135deg, #8A7A68, #CDB89C)',
    description:
      'Presentación privada de las nuevas piezas en cerámica y pigmento antes de su lanzamiento al catálogo general.',
  },
];

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Color y composición',
    modality: 'Virtual en vivo',
    schedule: '28 nov 2026 · 10:00 a. m. · 3 horas',
    shortDate: '28 NOV · 10:00 A. M.',
    artistId: 1,
    price: 180000,
    hasCertificate: true,
    seats: 12,
    image: workshopColorPalette,
    fallbackGradient: 'linear-gradient(135deg, #EAD9BE, #C67C13)',
    syllabus: [
      {
        title: '1. El lenguaje del color',
        summary: 'Paletas, temperatura cromática y cómo dialogan los ocres con los violetas.',
      },
      {
        title: '2. Equilibrio y ritmo',
        summary: 'Composición, contraste de valor y manejo consciente del espacio vacío.',
      },
      {
        title: '3. Tu primera composición',
        summary: 'Ejercicio guiado en vivo y retroalimentación curatorial en grupo.',
      },
    ],
  },
  {
    id: 2,
    title: 'Paisaje y materia',
    modality: 'Presencial',
    schedule: '5–12 dic · Bogotá · 6 horas',
    shortDate: '5–12 DIC · BOGOTÁ',
    artistId: 2,
    price: 320000,
    hasCertificate: true,
    seats: 8,
    image: artistMateoStudio,
    fallbackGradient: 'linear-gradient(135deg, #E9C98F, #B4703F)',
    syllabus: [
      {
        title: '1. Pigmentos y textura',
        summary: 'Preparación de cargas minerales, tierras y pastas sobre lino crudo.',
      },
      {
        title: '2. Capas del territorio',
        summary: 'Construcción atmosférica de horizontes cálidos con espátula y pincel.',
      },
      {
        title: '3. Acabado y conservación',
        summary: 'Secado, barnizado mate y montaje de obra sobre bastidor.',
      },
    ],
  },
  {
    id: 3,
    title: 'Del boceto a la edición',
    modality: 'Híbrido',
    schedule: '12–19 dic · 8 horas',
    shortDate: '12–19 DIC · HÍBRIDO',
    artistId: 1,
    price: 260000,
    hasCertificate: true,
    seats: 10,
    image: artworkLuzSuspendida,
    fallbackGradient: 'linear-gradient(135deg, #B76904, #E9C9A0)',
    syllabus: [
      {
        title: '1. Del trazo manual al archivo',
        summary: 'Digitalización fiel de acuarelas, tintas y bocetos sobre papel.',
      },
      {
        title: '2. Papeles de algodón y pruebas',
        summary: 'Selección de sustratos de archivo, calibración y firma de edición.',
      },
      {
        title: '3. Serie corta lista para colgar',
        summary: 'Numeración, certificado digital y empaque seguro para coleccionistas.',
      },
    ],
  },
  {
    id: 4,
    title: 'Mirar para crear',
    modality: 'Virtual grabado',
    schedule: 'Empieza cuando quieras · 4 horas',
    shortDate: 'A TU RITMO · 4 HORAS',
    artistId: 2,
    price: 120000,
    hasCertificate: false,
    seats: 99,
    image: artworkPaisajeInterior,
    fallbackGradient: 'linear-gradient(135deg, #4C7A78, #EFE3CD)',
    syllabus: [
      {
        title: '1. Entrenar la mirada',
        summary: 'Cómo leer luz, peso visual y silencio en una pintura contemporánea.',
      },
      {
        title: '2. Cuaderno de observaciones',
        summary: 'Ejercicios breves de diez minutos para despertar sensibilidad cromática.',
      },
      {
        title: '3. Curar tu propio rincón',
        summary: 'Criterios prácticos para combinar obras en casa sin rigidez.',
      },
    ],
  },
];

export const STORIES: EditorialStory[] = [
  {
    id: 1,
    kicker: 'Guía de coleccionismo',
    title: 'Cómo elegir tu primera obra',
    readTime: '4 min de lectura',
    author: 'Equipo curatorial Lumina',
    publishedAt: 'Noviembre 2026',
    image: galleryExhibitionHero,
    lead: 'Empezar una colección no exige grandes presupuestos ni reglas académicas: basta con aprender a escuchar qué obra transforma la luz de tu espacio cotidiano.',
    pullQuote: '“Una primera obra no llena una pared vacía; abre una conversación diaria dentro de casa.”',
    paragraphs: [
      'Muchas personas posponen comprar arte porque sienten que necesitan dominar un vocabulario técnico antes de elegir. En Lumina creemos justo lo contrario: el punto de partida más honesto es la emoción que despierta una paleta o una textura al mirarla con calma.',
      'Observa la luz natural de tu sala o estudio en distintos momentos del día. Las piezas trabajadas en tonos tierra, ocres y cremas responden de forma cálida a la luz de la tarde, mientras que las obras sobre papel de algodón aportan ligereza en rincones de lectura.',
      'Antes de decidir, revisa la ficha técnica, las medidas reales y el respaldo de edición. Toda obra de nuestra selección inicial por menos de $500.000 COP cuenta con trazabilidad, opción de vista en pared y cinco días hábiles de garantía para convivir con ella en tu propio entorno.',
    ],
    relatedWorkIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    kicker: 'Nuevas ediciones',
    title: 'Luz suspendida: del estudio a tu hogar',
    readTime: '5 min de lectura',
    author: 'Elena Vidal & Curaduría',
    publishedAt: 'Noviembre 2026',
    image: artworkLuzSuspendida,
    lead: 'Detrás de nuestra edición limitada más reciente conviven capas digitales translúcidas, pruebas de pigmento sobre algodón y una paleta pensada para dialogar con maderas claras.',
    pullQuote: '“Buscaba que el papel pareciera retener un fragmento de sol de las cinco de la tarde.”',
    paragraphs: [
      'Durante seis meses de estudio en Bogotá, Elena Vidal probó doce densidades distintas de papel de algodón antes de encontrar una fibra capaz de absorber los matices entre lila pálido y ámbar dorado sin perder luminosidad.',
      'Cada ejemplar de Luz suspendida pasa por una revisión individual en prensa y recibe un toque sutil de intervención manual antes de ser numerado y firmado. Así, aunque pertenece a una edición de cincuenta piezas, cada hoja conserva un matiz irrepetible.',
      'Al completar tu compra en línea, el certificado digital queda disponible de inmediato en tu cuenta junto con las recomendaciones de enmarcado y conservación sin reflejos.',
    ],
    relatedWorkIds: [3, 1, 6],
  },
  {
    id: 3,
    kicker: 'Comunidad',
    title: 'Un encuentro con nuestros artistas',
    readTime: '3 min de lectura',
    author: 'Agenda Lumina',
    publishedAt: 'Noviembre 2026',
    image: artistElenaStudio,
    lead: 'Conversamos con Elena Vidal y Mateo Ríos sobre cómo el diálogo entre la pintura matérica, la arcilla y la tecnología digital da forma a la exposición Habitar el color.',
    pullQuote: '“Cuando el público entra al estudio, descubre que detrás de cada cuadro hay preguntas muy humanas.”',
    paragraphs: [
      'Este mes abrimos las puertas de nuestra sede en Bogotá y de nuestras sesiones virtuales en vivo para acercar el proceso creativo a quienes desean ir más allá de la obra terminada.',
      'En las conversaciones abiertas, Mateo Ríos comparte cómo muele pigmentos minerales y trabaja relieves que cambian con el ángulo del sol, mientras Elena muestra cómo sus bocetos digitales regresan al pincel y al papel artesanal.',
      'Puedes reservar tu entrada libre para la inauguración o inscribirte en el taller Color y composición directamente desde la agenda, sin necesidad de crear una cuenta previa.',
    ],
    relatedWorkIds: [2, 5, 7],
  },
];

export const TECHNIQUES = [
  'Pintura',
  'Escultura y relieve',
  'Arte digital y mixto',
  'Fotografía',
];

export const PRICE_RANGES: [string, number, number][] = [
  ['Menos de $500.000', 0, 500000],
  ['$500.000–$2.000.000', 500000, 2000000],
  ['$2.000.000–$6.000.000', 2000000, 6000000],
  ['Más de $6.000.000', 6000000, 1000000000],
];

export const COURSE_MODALITIES = ['Todas', 'Presencial', 'Híbrido', 'Virtual en vivo', 'Virtual grabado'];
export const EVENT_TYPES = ['Todos', 'Exposición', 'Inauguración', 'Conversación', 'Preventa'];

export const PAYMENT_METHODS = [
  'Nequi',
  'Daviplata',
  'PSE (transferencia bancaria)',
  'Tarjeta débito o crédito',
];

export const formatCOP = (amount: number): string =>
  `$${amount.toLocaleString('es-CO')} COP`;

export const normalizeText = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const SYNONYMS: Record<string, string> = {
  cuadro: 'pintura',
  oleo: 'pintura',
  lienzo: 'pintura',
  taller: 'curso',
  clase: 'curso',
  vernissage: 'inauguracion',
  apertura: 'inauguracion',
};

export const getArtistById = (id: number): Artist =>
  ARTISTS.find((a) => a.id === id) || ARTISTS[0];

export function searchCatalog(query: string) {
  const tokens = normalizeText(query)
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => SYNONYMS[word] || word);

  if (!tokens.length) {
    return { artworks: [], artists: [], events: [], courses: [] };
  }

  const matches = (...fields: string[]) => {
    const haystack = normalizeText(fields.join(' '));
    return tokens.every((token) => haystack.includes(token));
  };

  return {
    artworks: ARTWORKS.filter((o) =>
      matches(o.title, getArtistById(o.artistId).name, o.technique, o.dimensionsAndMedium)
    ),
    artists: ARTISTS.filter((a) => matches(a.name, a.techniques, a.city, a.bio)),
    events: EVENTS.filter((e) => matches(e.title, e.kind, e.admission, e.description)),
    courses: COURSES.filter((c) =>
      matches(c.title, c.modality, getArtistById(c.artistId).name, 'curso')
    ),
  };
}
