export interface SoundrEventRequest {
  // Location
  location?: SoundrLocation;
  // List of Genre's from requested filter
  genre: string[];
  // the current page value
  offset: number;
}

/**
 * Future implementation - Location services not permitted, still allow user to pin point on map/ search
 * Then get GeoLocation to send to backend
 *
 * Or
 *
 * Pass City directly and get GeoLocation on Backend
 */
export interface SoundrLocation {
  latitude: number;
  longitude: number;
  radius: number;
}