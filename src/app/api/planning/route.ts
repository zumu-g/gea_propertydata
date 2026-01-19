import { NextRequest, NextResponse } from 'next/server';
import { planningApi } from '@/lib/api';
import { mockPlanningPermits } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const params = {
    address: searchParams.get('address') || undefined,
    suburb: searchParams.get('suburb') || undefined,
    postcode: searchParams.get('postcode') || undefined,
    radius: searchParams.get('radius') ? Number(searchParams.get('radius')) : undefined,
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo: searchParams.get('dateTo') || undefined,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 50,
    offset: searchParams.get('offset') ? Number(searchParams.get('offset')) : 0,
  };

  try {
    // Check if we have API credentials
    const hasApiKey = process.env.PLANNING_API_KEY && process.env.PLANNING_API_KEY !== 'your_planning_api_key_here';

    if (hasApiKey) {
      // Use real API
      const result = await planningApi.searchPermits(params);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error?.message || 'Failed to fetch planning data' },
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
      // Filter by suburb if provided
      let filteredPermits = mockPlanningPermits;
      if (params.suburb) {
        filteredPermits = mockPlanningPermits.filter(
          permit => permit.address.suburb.toLowerCase().includes(params.suburb!.toLowerCase())
        );
      }

      return NextResponse.json({
        success: true,
        data: filteredPermits,
        meta: {
          total: filteredPermits.length,
          limit: params.limit,
          offset: params.offset,
          mock: true,
        },
      });
    }
  } catch (error) {
    console.error('Planning API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
