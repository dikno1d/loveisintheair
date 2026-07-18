export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  image: string;
}

export interface Reason {
  id: number;
  text: string;
  emoji: string;
}

export interface FavoriteThing {
  id: string;
  category: string;
  name: string;
  description: string;
  icon: string;
}

export interface DatePlace {
  id: string;
  name: string;
  description: string;
  time: string;
  budget: string;
  image: string;
  type: 'restaurant' | 'cafe' | 'park' | 'cinema' | 'lake' | 'viewpoint' | 'dessert';
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  distance: string;
  budget: string;
  rating: number;
  dressCode: string;
  bestDishes: string[];
  description: string;
  image: string;
}

export interface PlaceToVisit {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  travelTime: string;
  bestSeason: string;
}

export interface BucketItem {
  id: number;
  text: string;
  completed: boolean;
  icon: string;
}

export interface MapPin {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
}
