// Property Data Types

export interface Address {
  streetNumber: string;
  streetName: string;
  streetType: string;
  suburb: string;
  state: string;
  postcode: string;
  fullAddress: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PropertyDetails {
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize?: number;
  buildingSize?: number;
  propertyType: PropertyType;
  yearBuilt?: number;
}

export type PropertyType = 
  | 'house' 
  | 'apartment' 
  | 'townhouse' 
  | 'villa' 
  | 'land' 
  | 'unit' 
  | 'studio';

export type ListingStatus = 
  | 'sold' 
  | 'leased' 
  | 'current' 
  | 'under_offer' 
  | 'withdrawn';

// Sales Data from property.com.au
export interface SaleRecord {
  id: string;
  address: Address;
  coordinates: Coordinates;
  propertyDetails: PropertyDetails;
  salePrice: number;
  saleDate: string;
  daysOnMarket?: number;
  listingAgent?: string;
  agency?: string;
  source: 'property.com.au';
  lastUpdated: string;
}

// Rental Data from property.com.au
export interface RentalRecord {
  id: string;
  address: Address;
  coordinates: Coordinates;
  propertyDetails: PropertyDetails;
  weeklyRent: number;
  leaseStartDate: string;
  leaseLength?: number; // in months
  bondAmount?: number;
  listingAgent?: string;
  agency?: string;
  source: 'property.com.au';
  lastUpdated: string;
}

// Planning Data from planning.vic.gov.au
export interface PlanningPermit {
  id: string;
  applicationNumber: string;
  address: Address;
  coordinates?: Coordinates;
  description: string;
  applicationType: PlanningApplicationType;
  status: PlanningStatus;
  dateReceived: string;
  dateDecided?: string;
  council: string;
  zone: string;
  overlays?: string[];
  source: 'planning.vic.gov.au';
  lastUpdated: string;
}

export type PlanningApplicationType = 
  | 'residential_development'
  | 'commercial_development'
  | 'subdivision'
  | 'change_of_use'
  | 'signage'
  | 'vegetation_removal'
  | 'building_and_works'
  | 'other';

export type PlanningStatus = 
  | 'lodged'
  | 'under_assessment'
  | 'approved'
  | 'refused'
  | 'withdrawn'
  | 'lapsed';

// Search Parameters
export interface PropertySearchParams {
  address?: string;
  suburb?: string;
  postcode?: string;
  radius?: number; // in kilometers
  coordinates?: Coordinates;
  propertyTypes?: PropertyType[];
  minBedrooms?: number;
  maxBedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'date' | 'price' | 'distance';
  sortOrder?: 'asc' | 'desc';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface PropertySearchResults {
  sales: SaleRecord[];
  rentals: RentalRecord[];
  planningPermits: PlanningPermit[];
}

// Statistics
export interface MarketStats {
  medianSalePrice: number;
  averageSalePrice: number;
  medianRent: number;
  averageRent: number;
  totalSales: number;
  totalRentals: number;
  priceChangePercent: number;
  rentChangePercent: number;
  averageDaysOnMarket: number;
}

// Suburb Profile
export interface SuburbProfile {
  suburb: string;
  postcode: string;
  state: string;
  council: string;
  marketStats: MarketStats;
  recentSales: SaleRecord[];
  recentRentals: RentalRecord[];
  planningActivity: PlanningPermit[];
}
