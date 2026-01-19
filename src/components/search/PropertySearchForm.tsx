'use client';

import { useState } from 'react';
import { Search, MapPin, Home, Filter, X } from 'lucide-react';
import { Button, Input, Select, Card } from '@/components/ui';
import { cn, propertyTypeLabels } from '@/lib/utils';
import { PropertySearchParams, PropertyType } from '@/types';

interface PropertySearchFormProps {
  onSearch: (params: PropertySearchParams) => void;
  loading?: boolean;
}

const propertyTypeOptions = [
  { value: '', label: 'All Property Types' },
  ...Object.entries(propertyTypeLabels).map(([value, label]) => ({ value, label })),
];

const radiusOptions = [
  { value: '1', label: '1 km' },
  { value: '2', label: '2 km' },
  { value: '5', label: '5 km' },
  { value: '10', label: '10 km' },
  { value: '20', label: '20 km' },
];

const bedroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

export function PropertySearchForm({ onSearch, loading }: PropertySearchFormProps) {
  const [address, setAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [radius, setRadius] = useState('5');
  const [propertyType, setPropertyType] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params: PropertySearchParams = {
      radius: Number(radius),
      limit: 50,
      sortBy: 'date',
      sortOrder: 'desc',
    };

    if (address) params.address = address;
    if (suburb) params.suburb = suburb;
    if (postcode) params.postcode = postcode;
    if (propertyType) params.propertyTypes = [propertyType as PropertyType];
    if (minBedrooms) params.minBedrooms = Number(minBedrooms);

    onSearch(params);
  };

  const handleClear = () => {
    setAddress('');
    setSuburb('');
    setPostcode('');
    setRadius('5');
    setPropertyType('');
    setMinBedrooms('');
  };

  const hasFilters = propertyType || minBedrooms;

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-gray-100">
      <form onSubmit={handleSubmit}>
        {/* Main Search Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Address/Suburb Input */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Enter address, suburb or postcode..."
              value={address || suburb || postcode}
              onChange={(e) => {
                const value = e.target.value;
                // Simple logic to determine field type
                if (/^\d{4}$/.test(value)) {
                  setPostcode(value);
                  setAddress('');
                  setSuburb('');
                } else if (value.includes(' ') || /\d/.test(value)) {
                  setAddress(value);
                  setSuburb('');
                  setPostcode('');
                } else {
                  setSuburb(value);
                  setAddress('');
                  setPostcode('');
                }
              }}
              className={cn(
                'w-full pl-12 pr-4 py-3.5 rounded-lg border transition-all duration-200',
                'bg-white text-brand-charcoal placeholder:text-gray-400 text-lg',
                'focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent',
                'border-gray-200 hover:border-gray-300'
              )}
            />
          </div>

          {/* Radius Select */}
          <div className="w-full lg:w-36">
            <Select
              value={radius}
              onChange={(e) => setRadius((e.target as HTMLSelectElement).value)}
              options={radiusOptions}
              className="py-3.5 text-lg"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            type="button"
            variant={showFilters ? 'primary' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            className="lg:w-auto relative"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
            {hasFilters && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-navy text-xs rounded-full flex items-center justify-center">
                {(propertyType ? 1 : 0) + (minBedrooms ? 1 : 0)}
              </span>
            )}
          </Button>

          {/* Search Button */}
          <Button type="submit" loading={loading} className="lg:w-auto px-8 py-3.5 text-lg">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-wrap gap-4 items-end">
              {/* Property Type */}
              <div className="w-full sm:w-48">
                <Select
                  label="Property Type"
                  value={propertyType}
                  onChange={(e) => setPropertyType((e.target as HTMLSelectElement).value)}
                  options={propertyTypeOptions}
                />
              </div>

              {/* Bedrooms */}
              <div className="w-full sm:w-32">
                <Select
                  label="Bedrooms"
                  value={minBedrooms}
                  onChange={(e) => setMinBedrooms((e.target as HTMLSelectElement).value)}
                  options={bedroomOptions}
                />
              </div>

              {/* Clear Filters */}
              {hasFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClear}
                  className="text-gray-500"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        )}
      </form>
    </Card>
  );
}
