export type Price = '$' | '$$' | '$$$' | '$$$$';

export interface Restaurant {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  coordinates: Coordinates;
  transactions: string[];
  price: Price;
  location: Location;
  phone: string;
  display_phone: string;
  distance: number;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export interface Review {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: Date;
  user: User;
}

export interface User {
  id: string;
  profile_url: string;
  image_url: null | string;
  name: string;
}

export interface Category {
  alias: string;
  title: string;
  parent_aliases: any[];
  country_whitelist: string[];
  country_blacklist: any[];
}
