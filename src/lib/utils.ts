import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

// Tailwind class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency for Australian dollars
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format compact currency (e.g., $1.2M)
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return formatCurrency(amount);
}

// Format date for display
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'd MMM yyyy');
  } catch {
    return dateString;
  }
}

// Format relative time
export function formatRelativeDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return dateString;
  }
}

// Format weekly rent
export function formatRent(weeklyRent: number): string {
  return `$${weeklyRent}/week`;
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Format distance for display
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
}

// Property type display names
export const propertyTypeLabels: Record<string, string> = {
  house: 'House',
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  villa: 'Villa',
  land: 'Land',
  unit: 'Unit',
  studio: 'Studio',
};

// Planning status display names
export const planningStatusLabels: Record<string, string> = {
  lodged: 'Lodged',
  under_assessment: 'Under Assessment',
  approved: 'Approved',
  refused: 'Refused',
  withdrawn: 'Withdrawn',
  lapsed: 'Lapsed',
};

// Planning application type display names
export const planningTypeLabels: Record<string, string> = {
  residential_development: 'Residential Development',
  commercial_development: 'Commercial Development',
  subdivision: 'Subdivision',
  change_of_use: 'Change of Use',
  signage: 'Signage',
  vegetation_removal: 'Vegetation Removal',
  building_and_works: 'Building & Works',
  other: 'Other',
};

// Format address for display
export function formatAddress(address: {
  streetNumber: string;
  streetName: string;
  streetType: string;
  suburb: string;
  state: string;
  postcode: string;
}): string {
  return `${address.streetNumber} ${address.streetName} ${address.streetType}, ${address.suburb} ${address.state} ${address.postcode}`;
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

// Generate property features string
export function formatPropertyFeatures(details: {
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
}): string {
  const parts = [];
  if (details.bedrooms > 0) parts.push(`${details.bedrooms} bed`);
  if (details.bathrooms > 0) parts.push(`${details.bathrooms} bath`);
  if (details.carSpaces > 0) parts.push(`${details.carSpaces} car`);
  return parts.join(' · ');
}
