import { NextRequest, NextResponse } from 'next/server';
import { propertyApi } from '@/lib/api';
import { mockSales, filterMockSales } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const params = {
    address: searchParams.get('address') || undefined,
    suburb: searchParams.get('suburb') || undefined,
    postcode: searchParams.get('postcode') || undefined,
    radius: searchParams.get('radius') ? Number(searchParams.get('radius')) : undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    minBedrooms: searchParams.get('minBedrooms') ? Number(searchParams.get('minBedrooms')) : undefined,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 50,
    offset: searchParams.get('offset') ? Number(searchParams.get('offset')) : 0,
  };

  try {
    // Check if we have API credentials
    const hasApiKey = process.env.PROPERTY_API_KEY && process.env.PROPERTY_API_KEY !== 'your_property_api_key_here';

    if (hasApiKey) {
      // Use real API
      const result = await propertyApi.searchSales(params);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error?.message || 'Failed to fetch sales data' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: result.data,
        meta: {
          total: result.data.length,
          limit: params.limit,
          offset: params.offset,
        },
      });
    } else {
      // Use mock data for development
      const filteredSales = filterMockSales({
        suburb: params.suburb,
        postcode: params.postcode,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
      });

      return NextResponse.json({
        success: true,
        data: filteredSales,
        meta: {
          total: filteredSales.length,
          limit: params.limit,
          offset: params.offset,
          mock: true,
        },
      });
    }
  } catch (error) {
    console.error('Sales API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
