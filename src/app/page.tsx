'use client';

import { useState } from 'react';
import { MapPin, TrendingUp, Building2, FileText, Search } from 'lucide-react';
import { PropertySearchForm } from '@/components/search/PropertySearchForm';
import { SaleCard } from '@/components/property/SaleCard';
import { RentalCard } from '@/components/property/RentalCard';
import { PlanningPermitCard } from '@/components/planning/PlanningPermitCard';
import { MarketStatsDisplay } from '@/components/property/MarketStats';
import { Tabs, EmptyState, Card, Skeleton } from '@/components/ui';
import { PropertySearchParams, SaleRecord, RentalRecord, PlanningPermit } from '@/types';
import { mockSales, mockRentals, mockPlanningPermits, mockMarketStats } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type TabId = 'sales' | 'rentals' | 'planning';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('sales');
  const [searchParams, setSearchParams] = useState<PropertySearchParams | null>(null);
  
  // Results state (using mock data for now)
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [rentals, setRentals] = useState<RentalRecord[]>([]);
  const [planningPermits, setPlanningPermits] = useState<PlanningPermit[]>([]);

  const handleSearch = async (params: PropertySearchParams) => {
    setLoading(true);
    setSearchParams(params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, replace with actual API calls:
    // const [salesRes, rentalsRes, permitsRes] = await Promise.all([
    //   propertyApi.searchSales(params),
    //   propertyApi.searchRentals(params),
    //   planningApi.searchPermits(params),
    // ]);
    
    // For now, use mock data filtered by search params
    setSales(mockSales);
    setRentals(mockRentals);
    setPlanningPermits(mockPlanningPermits);
    
    setHasSearched(true);
    setLoading(false);
  };

  const tabs = [
    { id: 'sales' as const, label: 'Recent Sales', count: sales.length },
    { id: 'rentals' as const, label: 'Recent Rentals', count: rentals.length },
    { id: 'planning' as const, label: 'Planning Permits', count: planningPermits.length },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-brand py-16 lg:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Property Data at Your Fingertips
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Search recent sales, rentals, and planning permits around any property in Victoria. 
              Make informed decisions with real market data.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <PropertySearchForm onSearch={handleSearch} loading={loading} />
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-12 text-center">
            <div>
              <p className="text-3xl font-display font-bold text-brand-gold">50K+</p>
              <p className="text-sm text-gray-400">Sales Records</p>
            </div>
            <div className="w-px bg-gray-700" />
            <div>
              <p className="text-3xl font-display font-bold text-brand-gold">30K+</p>
              <p className="text-sm text-gray-400">Rental Records</p>
            </div>
            <div className="w-px bg-gray-700" />
            <div>
              <p className="text-3xl font-display font-bold text-brand-gold">10K+</p>
              <p className="text-sm text-gray-400">Planning Permits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Market Stats */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-brand-charcoal mb-4">
                Market Overview
              </h2>
              <MarketStatsDisplay stats={mockMarketStats} />
            </div>

            {/* Tabs */}
            <Tabs 
              tabs={tabs} 
              activeTab={activeTab} 
              onChange={(id) => setActiveTab(id as TabId)} 
            />

            {/* Tab Content */}
            <div className="mt-8">
              {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-20 w-full" />
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {/* Sales Tab */}
                  {activeTab === 'sales' && (
                    <div>
                      {sales.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {sales.map((sale) => (
                            <SaleCard key={sale.id} sale={sale} />
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          icon={<Building2 className="w-12 h-12" />}
                          title="No recent sales found"
                          description="Try expanding your search radius or adjusting your filters"
                        />
                      )}
                    </div>
                  )}

                  {/* Rentals Tab */}
                  {activeTab === 'rentals' && (
                    <div>
                      {rentals.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {rentals.map((rental) => (
                            <RentalCard key={rental.id} rental={rental} />
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          icon={<Building2 className="w-12 h-12" />}
                          title="No recent rentals found"
                          description="Try expanding your search radius or adjusting your filters"
                        />
                      )}
                    </div>
                  )}

                  {/* Planning Tab */}
                  {activeTab === 'planning' && (
                    <div>
                      {planningPermits.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                          {planningPermits.map((permit) => (
                            <PlanningPermitCard key={permit.id} permit={permit} />
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          icon={<FileText className="w-12 h-12" />}
                          title="No planning permits found"
                          description="There are no recent planning applications in this area"
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Section (shown before search) */}
      {!hasSearched && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-semibold text-brand-charcoal mb-4">
                Everything You Need for Client Conversations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access comprehensive property data to provide your clients with accurate market insights
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="text-center p-8 card-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-status-sale/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-status-sale" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-3">
                  Recent Sales
                </h3>
                <p className="text-gray-600">
                  View comparable sales data from property.com.au including sale prices, 
                  days on market, and property details
                </p>
              </Card>

              {/* Feature 2 */}
              <Card className="text-center p-8 card-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-status-rental/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-status-rental" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-3">
                  Rental History
                </h3>
                <p className="text-gray-600">
                  Access recent rental data to help landlords set competitive rents 
                  and show tenants fair market rates
                </p>
              </Card>

              {/* Feature 3 */}
              <Card className="text-center p-8 card-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-3">
                  Planning Permits
                </h3>
                <p className="text-gray-600">
                  See planning applications from planning.vic.gov.au to understand 
                  development activity in the area
                </p>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
