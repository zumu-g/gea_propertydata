import { SaleRecord, RentalRecord, PlanningPermit, MarketStats } from '@/types';

// Mock sales data for development
export const mockSales: SaleRecord[] = [
  {
    id: 'sale-001',
    address: {
      streetNumber: '42',
      streetName: 'Collins',
      streetType: 'Street',
      suburb: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      fullAddress: '42 Collins Street, Melbourne VIC 3000',
    },
    coordinates: { latitude: -37.8136, longitude: 144.9631 },
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      landSize: 450,
      buildingSize: 180,
      propertyType: 'house',
      yearBuilt: 2015,
    },
    salePrice: 1850000,
    saleDate: '2025-01-15',
    daysOnMarket: 28,
    listingAgent: 'Sarah Mitchell',
    agency: 'Grants Estate Agents',
    source: 'property.com.au',
    lastUpdated: '2025-01-16T09:00:00Z',
  },
  {
    id: 'sale-002',
    address: {
      streetNumber: '15',
      streetName: 'Chapel',
      streetType: 'Street',
      suburb: 'South Yarra',
      state: 'VIC',
      postcode: '3141',
      fullAddress: '15 Chapel Street, South Yarra VIC 3141',
    },
    coordinates: { latitude: -37.8426, longitude: 144.9930 },
    propertyDetails: {
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      landSize: 520,
      buildingSize: 240,
      propertyType: 'townhouse',
      yearBuilt: 2020,
    },
    salePrice: 2350000,
    saleDate: '2025-01-12',
    daysOnMarket: 21,
    listingAgent: 'James Wilson',
    agency: 'Grants Estate Agents',
    source: 'property.com.au',
    lastUpdated: '2025-01-13T10:30:00Z',
  },
  {
    id: 'sale-003',
    address: {
      streetNumber: '8/200',
      streetName: 'Spring',
      streetType: 'Street',
      suburb: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      fullAddress: '8/200 Spring Street, Melbourne VIC 3000',
    },
    coordinates: { latitude: -37.8102, longitude: 144.9726 },
    propertyDetails: {
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      buildingSize: 95,
      propertyType: 'apartment',
      yearBuilt: 2018,
    },
    salePrice: 890000,
    saleDate: '2025-01-10',
    daysOnMarket: 35,
    listingAgent: 'Emma Chen',
    agency: 'Ray White',
    source: 'property.com.au',
    lastUpdated: '2025-01-11T14:00:00Z',
  },
  {
    id: 'sale-004',
    address: {
      streetNumber: '78',
      streetName: 'Toorak',
      streetType: 'Road',
      suburb: 'Toorak',
      state: 'VIC',
      postcode: '3142',
      fullAddress: '78 Toorak Road, Toorak VIC 3142',
    },
    coordinates: { latitude: -37.8389, longitude: 145.0100 },
    propertyDetails: {
      bedrooms: 5,
      bathrooms: 4,
      carSpaces: 4,
      landSize: 850,
      buildingSize: 420,
      propertyType: 'house',
      yearBuilt: 2008,
    },
    salePrice: 4750000,
    saleDate: '2025-01-08',
    daysOnMarket: 14,
    agency: 'Marshall White',
    source: 'property.com.au',
    lastUpdated: '2025-01-09T08:00:00Z',
  },
  {
    id: 'sale-005',
    address: {
      streetNumber: '12',
      streetName: 'Acland',
      streetType: 'Street',
      suburb: 'St Kilda',
      state: 'VIC',
      postcode: '3182',
      fullAddress: '12 Acland Street, St Kilda VIC 3182',
    },
    coordinates: { latitude: -37.8679, longitude: 144.9797 },
    propertyDetails: {
      bedrooms: 2,
      bathrooms: 1,
      carSpaces: 1,
      buildingSize: 85,
      propertyType: 'unit',
      yearBuilt: 1960,
    },
    salePrice: 720000,
    saleDate: '2025-01-05',
    daysOnMarket: 42,
    agency: 'Jellis Craig',
    source: 'property.com.au',
    lastUpdated: '2025-01-06T11:00:00Z',
  },
];

// Mock rentals data for development
export const mockRentals: RentalRecord[] = [
  {
    id: 'rental-001',
    address: {
      streetNumber: '25',
      streetName: 'Flinders',
      streetType: 'Lane',
      suburb: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      fullAddress: '25 Flinders Lane, Melbourne VIC 3000',
    },
    coordinates: { latitude: -37.8173, longitude: 144.9668 },
    propertyDetails: {
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      buildingSize: 75,
      propertyType: 'apartment',
      yearBuilt: 2019,
    },
    weeklyRent: 650,
    leaseStartDate: '2025-01-20',
    leaseLength: 12,
    bondAmount: 2600,
    listingAgent: 'Lisa Park',
    agency: 'Grants Estate Agents',
    source: 'property.com.au',
    lastUpdated: '2025-01-18T10:00:00Z',
  },
  {
    id: 'rental-002',
    address: {
      streetNumber: '5',
      streetName: 'Carlisle',
      streetType: 'Street',
      suburb: 'St Kilda',
      state: 'VIC',
      postcode: '3182',
      fullAddress: '5 Carlisle Street, St Kilda VIC 3182',
    },
    coordinates: { latitude: -37.8640, longitude: 144.9850 },
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      buildingSize: 120,
      propertyType: 'townhouse',
      yearBuilt: 2016,
    },
    weeklyRent: 780,
    leaseStartDate: '2025-01-15',
    leaseLength: 12,
    bondAmount: 3120,
    agency: 'Grants Estate Agents',
    source: 'property.com.au',
    lastUpdated: '2025-01-14T09:00:00Z',
  },
  {
    id: 'rental-003',
    address: {
      streetNumber: '102',
      streetName: 'High',
      streetType: 'Street',
      suburb: 'Prahran',
      state: 'VIC',
      postcode: '3181',
      fullAddress: '102 High Street, Prahran VIC 3181',
    },
    coordinates: { latitude: -37.8505, longitude: 144.9930 },
    propertyDetails: {
      bedrooms: 1,
      bathrooms: 1,
      carSpaces: 0,
      buildingSize: 45,
      propertyType: 'studio',
    },
    weeklyRent: 420,
    leaseStartDate: '2025-01-18',
    leaseLength: 6,
    bondAmount: 1680,
    agency: 'Biggin Scott',
    source: 'property.com.au',
    lastUpdated: '2025-01-17T15:00:00Z',
  },
  {
    id: 'rental-004',
    address: {
      streetNumber: '88',
      streetName: 'Queens',
      streetType: 'Road',
      suburb: 'Melbourne',
      state: 'VIC',
      postcode: '3004',
      fullAddress: '88 Queens Road, Melbourne VIC 3004',
    },
    coordinates: { latitude: -37.8399, longitude: 144.9702 },
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      buildingSize: 140,
      propertyType: 'apartment',
      yearBuilt: 2021,
    },
    weeklyRent: 950,
    leaseStartDate: '2025-02-01',
    leaseLength: 12,
    bondAmount: 3800,
    agency: 'CBRE Residential',
    source: 'property.com.au',
    lastUpdated: '2025-01-16T12:00:00Z',
  },
];

// Mock planning permits data
export const mockPlanningPermits: PlanningPermit[] = [
  {
    id: 'permit-001',
    applicationNumber: 'PA-2025-0142',
    address: {
      streetNumber: '150',
      streetName: 'Collins',
      streetType: 'Street',
      suburb: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      fullAddress: '150 Collins Street, Melbourne VIC 3000',
    },
    coordinates: { latitude: -37.8142, longitude: 144.9650 },
    description: 'Construction of a 12-storey mixed-use building comprising ground floor retail and 45 apartments',
    applicationType: 'residential_development',
    status: 'under_assessment',
    dateReceived: '2024-12-15',
    council: 'City of Melbourne',
    zone: 'Mixed Use Zone (MUZ)',
    overlays: ['Design and Development Overlay', 'Heritage Overlay'],
    source: 'planning.vic.gov.au',
    lastUpdated: '2025-01-10T08:00:00Z',
  },
  {
    id: 'permit-002',
    applicationNumber: 'PA-2025-0089',
    address: {
      streetNumber: '22',
      streetName: 'Chapel',
      streetType: 'Street',
      suburb: 'South Yarra',
      state: 'VIC',
      postcode: '3141',
      fullAddress: '22 Chapel Street, South Yarra VIC 3141',
    },
    coordinates: { latitude: -37.8430, longitude: 144.9925 },
    description: 'Subdivision of land into 4 lots and construction of 4 townhouses',
    applicationType: 'subdivision',
    status: 'approved',
    dateReceived: '2024-11-20',
    dateDecided: '2025-01-05',
    council: 'City of Stonnington',
    zone: 'Residential Growth Zone (RGZ)',
    overlays: ['Significant Landscape Overlay'],
    source: 'planning.vic.gov.au',
    lastUpdated: '2025-01-06T10:00:00Z',
  },
  {
    id: 'permit-003',
    applicationNumber: 'PA-2024-1892',
    address: {
      streetNumber: '45',
      streetName: 'Fitzroy',
      streetType: 'Street',
      suburb: 'St Kilda',
      state: 'VIC',
      postcode: '3182',
      fullAddress: '45 Fitzroy Street, St Kilda VIC 3182',
    },
    coordinates: { latitude: -37.8660, longitude: 144.9720 },
    description: 'Change of use from office to restaurant and liquor licence',
    applicationType: 'change_of_use',
    status: 'lodged',
    dateReceived: '2025-01-08',
    council: 'City of Port Phillip',
    zone: 'Commercial 1 Zone (C1Z)',
    source: 'planning.vic.gov.au',
    lastUpdated: '2025-01-08T14:00:00Z',
  },
  {
    id: 'permit-004',
    applicationNumber: 'PA-2024-1756',
    address: {
      streetNumber: '8',
      streetName: 'Domain',
      streetType: 'Road',
      suburb: 'South Yarra',
      state: 'VIC',
      postcode: '3141',
      fullAddress: '8 Domain Road, South Yarra VIC 3141',
    },
    description: 'Construction of a two-storey rear extension and swimming pool',
    applicationType: 'building_and_works',
    status: 'approved',
    dateReceived: '2024-10-15',
    dateDecided: '2024-12-20',
    council: 'City of Stonnington',
    zone: 'Neighbourhood Residential Zone (NRZ)',
    overlays: ['Heritage Overlay'],
    source: 'planning.vic.gov.au',
    lastUpdated: '2024-12-21T09:00:00Z',
  },
];

// Mock market statistics
export const mockMarketStats: MarketStats = {
  medianSalePrice: 1250000,
  averageSalePrice: 1480000,
  medianRent: 620,
  averageRent: 685,
  totalSales: 847,
  totalRentals: 1253,
  priceChangePercent: 4.2,
  rentChangePercent: 6.8,
  averageDaysOnMarket: 32,
};

// Helper to filter mock data by search params
export function filterMockSales(params: {
  suburb?: string;
  postcode?: string;
  minPrice?: number;
  maxPrice?: number;
}): SaleRecord[] {
  return mockSales.filter((sale) => {
    if (params.suburb && !sale.address.suburb.toLowerCase().includes(params.suburb.toLowerCase())) {
      return false;
    }
    if (params.postcode && sale.address.postcode !== params.postcode) {
      return false;
    }
    if (params.minPrice && sale.salePrice < params.minPrice) {
      return false;
    }
    if (params.maxPrice && sale.salePrice > params.maxPrice) {
      return false;
    }
    return true;
  });
}

export function filterMockRentals(params: {
  suburb?: string;
  postcode?: string;
  minRent?: number;
  maxRent?: number;
}): RentalRecord[] {
  return mockRentals.filter((rental) => {
    if (params.suburb && !rental.address.suburb.toLowerCase().includes(params.suburb.toLowerCase())) {
      return false;
    }
    if (params.postcode && rental.address.postcode !== params.postcode) {
      return false;
    }
    if (params.minRent && rental.weeklyRent < params.minRent) {
      return false;
    }
    if (params.maxRent && rental.weeklyRent > params.maxRent) {
      return false;
    }
    return true;
  });
}
