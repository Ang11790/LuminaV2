export interface Artwork {
  id: number;
  title: string;
  artistId: number;
  technique: string;
  price: number;
  image: string;
  fallbackGradient: string;
  isPresale: boolean;
  dimensionsAndMedium: string;
  hasVideo: boolean;
  hasCertificate: boolean;
  edition: string;
  description: string;
}

export interface Artist {
  id: number;
  name: string;
  city: string;
  techniques: string;
  quote: string;
  bio: string;
  timeline: string[];
  image: string;
  fallbackGradient: string;
}

export interface GalleryEvent {
  id: number;
  title: string;
  kind: 'Exposición' | 'Inauguración' | 'Conversación' | 'Preventa';
  dateLabel: string;
  shortDate: string;
  admission: string;
  image: string;
  fallbackGradient: string;
  description: string;
}

export interface Course {
  id: number;
  title: string;
  modality: 'Presencial' | 'Híbrido' | 'Virtual en vivo' | 'Virtual grabado';
  schedule: string;
  shortDate: string;
  artistId: number;
  price: number;
  hasCertificate: boolean;
  seats: number;
  image: string;
  fallbackGradient: string;
  syllabus: { title: string; summary: string }[];
}

export interface EditorialStory {
  id: number;
  kicker: string;
  title: string;
  readTime: string;
  author: string;
  publishedAt: string;
  image: string;
  lead: string;
  pullQuote: string;
  paragraphs: string[];
  relatedWorkIds: number[];
}

export interface Reservation {
  title: string;
  when: string;
  kind: string;
}

export interface PurchaseOrder {
  orderNumber: string;
  title: string;
  total: number;
  date: string;
}

export interface CatalogFilters {
  techniques: string[];
  priceIndices: number[];
  onlyCert: boolean;
  onlyVideo: boolean;
  onlyPresale: boolean;
  sortBy: 'rec' | 'lo' | 'hi' | 'new';
}
