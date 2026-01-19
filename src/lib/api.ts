import {
  PropertySearchParams,
  SaleRecord,
  RentalRecord,
  PlanningPermit,
  ApiResponse,
  PropertySearchResults,
  SuburbProfile,
  MarketStats,
} from '@/types';

// API Configuration
const PROPERTY_API_BASE = process.env.PROPERTY_API_BASE_URL || 'https://api.property.com.au/v1';
const PLANNING_API_BASE = process.env.PLANNING_VIC_API_BASE_URL || 'https://api.planning.vic.gov.au/v1';

// API Keys (these should be set via environment variables)
const PROPERTY_API_KEY = process.env.PROPERTY_API_KEY || '';
const PLANNING_API_KEY = process.env.PLANNING_API_KEY || '';

// Base fetch wrapper with error handling
async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        data: null as T,
        error: {
          code: `HTTP_${response.status}`,
          message: errorData.message || `HTTP Error: ${response.status}`,
        },
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: null as T,
      error: {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Network error occurred',
      },
    };
  }
}

// Property.com.au API Client
export const propertyApi = {
  /**
   * Search for recent property sales
   */
  async searchSales(params: PropertySearchParams): Promise<ApiResponse<SaleRecord[]>> {
    const queryParams = new URLSearchParams();
    
    if (params.address) queryParams.set('address', params.address);
    if (params.suburb) queryParams.set('suburb', params.suburb);
    if (params.postcode) queryParams.set('postcode', params.postcode);
    if (params.radius) queryParams.set('radius', params.radius.toString());
    if (params.coordinates) {
      queryParams.set('lat', params.coordinates.latitude.toString());
      queryParams.set('lng', params.coordinates.longitude.toString());
    }
    if (params.propertyTypes?.length) {
      queryParams.set('propertyTypes', params.propertyTypes.join(','));
    }
    if (params.minBedrooms) queryParams.set('minBedrooms', params.minBedrooms.toString());
    if (params.maxBedrooms) queryParams.set('maxBedrooms', params.maxBedrooms.toString());
    if (params.minPrice) queryParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.set('maxPrice', params.maxPrice.toString());
    if (params.dateFrom) queryParams.set('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.set('dateTo', params.dateTo);
    if (params.limit) queryParams.set('limit', params.limit.toString());
    if (params.offset) queryParams.set('offset', params.offset.toString());
    if (params.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder);

    return apiFetch<SaleRecord[]>(
      `${PROPERTY_API_BASE}/sales?${queryParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${PROPERTY_API_KEY}`,
        },
      }
    );
  },

  /**
   * Search for recent rentals
   */
  async searchRentals(params: PropertySearchParams): Promise<ApiResponse<RentalRecord[]>> {
    const queryParams = new URLSearchParams();
    
    if (params.address) queryParams.set('address', params.address);
    if (params.suburb) queryParams.set('suburb', params.suburb);
    if (params.postcode) queryParams.set('postcode', params.postcode);
    if (params.radius) queryParams.set('radius', params.radius.toString());
    if (params.coordinates) {
      queryParams.set('lat', params.coordinates.latitude.toString());
      queryParams.set('lng', params.coordinates.longitude.toString());
    }
    if (params.propertyTypes?.length) {
      queryParams.set('propertyTypes', params.propertyTypes.join(','));
    }
    if (params.minBedrooms) queryParams.set('minBedrooms', params.minBedrooms.toString());
    if (params.maxBedrooms) queryParams.set('maxBedrooms', params.maxBedrooms.toString());
    if (params.minPrice) queryParams.set('minRent', params.minPrice.toString());
    if (params.maxPrice) queryParams.set('maxRent', params.maxPrice.toString());
    if (params.dateFrom) queryParams.set('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.set('dateTo', params.dateTo);
    if (params.limit) queryParams.set('limit', params.limit.toString());
    if (params.offset) queryParams.set('offset', params.offset.toString());
    if (params.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder);

    return apiFetch<RentalRecord[]>(
      `${PROPERTY_API_BASE}/rentals?${queryParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${PROPERTY_API_KEY}`,
        },
      }
    );
  },

  /**
   * Get market statistics for a suburb
   */
  async getMarketStats(suburb: string, postcode?: string): Promise<ApiResponse<MarketStats>> {
    const queryParams = new URLSearchParams({ suburb });
    if (postcode) queryParams.set('postcode', postcode);

    return apiFetch<MarketStats>(
      `${PROPERTY_API_BASE}/statistics?${queryParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${PROPERTY_API_KEY}`,
        },
      }
    );
  },

  /**
   * Get full suburb profile
   */
  async getSuburbProfile(suburb: string, postcode?: string): Promise<ApiResponse<SuburbProfile>> {
    const queryParams = new URLSearchParams({ suburb });
    if (postcode) queryParams.set('postcode', postcode);

    return apiFetch<SuburbProfile>(
      `${PROPERTY_API_BASE}/suburbs/profile?${queryParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${PROPERTY_API_KEY}`,
        },
      }
    );
  },
};

// Planning.vic.gov.au API Client
export const planningApi = {
  /**
   * Search for planning permits
   */
  async searchPermits(params: PropertySearchParams): Promise<ApiResponse<PlanningPermit[]>> {
    const queryParams = new URLSearchParams();
    
    if (params.address) queryParams.set('address', params.address);
    if (params.suburb) queryParams.set('suburb', params.suburb);
    if (params.postcode) queryParams.set('postcode', params.postcode);
    if (params.radius) queryParams.set('radius', params.radius.toString());
    if (params.coordinates) {
      queryParams.set('lat', params.coordinates.latitude.toString());
      queryParams.set('lng', params.coordinates.longitude.toString());
    }
    if (params.dateFrom) queryParams.set('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.set('dateTo', params.dateTo);
    if (params.limit) queryParams.set('limit', params.limit.toString());
    if (params.offset) queryParams.set('offset', params.offset.toString());

    return apiFetch<PlanningPermit[]>(
      `${PLANNING_API_BASE}/permits?${queryParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${PLANNING_API_KEY}`,
        },
      }
    );
  },

  /**
   * Get permit by application number
   */
  async getPermit(applicationNumber: string): Promise<ApiResponse<PlanningPermit>> {
    return apiFetch<PlanningPermit>(
      `${PLANNING_API_BASE}/permits/${encodeURIComponent(applicationNumber)}`,
      {
        headers: {
          'Authorization': `Bearer ${PLANNING_API_KEY}`,
        },
      }
    );
  },

  /**
   * Get planning zones for a location
   */
  async getZones(lat: number, lng: number): Promise<ApiResponse<{ zones: string[]; overlays: string[] }>> {
    return apiFetch<{ zones: string[]; overlays: string[] }>(
      `${PLANNING_API_BASE}/zones?lat=${lat}&lng=${lng}`,
      {
        headers: {
          'Authorization': `Bearer ${PLANNING_API_KEY}`,
        },
      }
    );
  },
};

// Combined search function
export async function searchPropertyData(
  params: PropertySearchParams
): Promise<ApiResponse<PropertySearchResults>> {
  try {
    const [salesResult, rentalsResult, permitsResult] = await Promise.all([
      propertyApi.searchSales(params),
      propertyApi.searchRentals(params),
      planningApi.searchPermits(params),
    ]);

    return {
      success: true,
      data: {
        sales: salesResult.success ? salesResult.data : [],
        rentals: rentalsResult.success ? rentalsResult.data : [],
        planningPermits: permitsResult.success ? permitsResult.data : [],
      },
    };
  } catch (error) {
    return {
      success: false,
      data: {
        sales: [],
        rentals: [],
        planningPermits: [],
      },
      error: {
        code: 'COMBINED_SEARCH_ERROR',
        message: error instanceof Error ? error.message : 'Search error occurred',
      },
    };
  }
}
