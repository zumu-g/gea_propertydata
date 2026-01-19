'use client';

import { MapPin, Bed, Bath, Car, Calendar, Home, Building2 } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { RentalRecord } from '@/types';
import {
  formatRent,
  formatDate,
  formatRelativeDate,
  propertyTypeLabels,
  cn,
} from '@/lib/utils';

interface RentalCardProps {
  rental: RentalRecord;
  onClick?: () => void;
}

export function RentalCard({ rental, onClick }: RentalCardProps) {
  const { address, propertyDetails, weeklyRent, leaseStartDate, leaseLength, agency } = rental;

  return (
    <Card
      hover
      onClick={onClick}
      className={cn(
        'cursor-pointer group',
        'border border-transparent hover:border-brand-gold/30'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info">Leased</Badge>
            <span className="text-sm text-gray-500">
              {formatRelativeDate(leaseStartDate)}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-brand-charcoal truncate group-hover:text-brand-gold transition-colors">
            {address.fullAddress}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-display font-bold text-status-rental">
            {formatRent(weeklyRent)}
          </p>
        </div>
      </div>

      {/* Property Features */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
        {propertyDetails.bedrooms > 0 && (
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{propertyDetails.bedrooms}</span>
          </div>
        )}
        {propertyDetails.bathrooms > 0 && (
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{propertyDetails.bathrooms}</span>
          </div>
        )}
        {propertyDetails.carSpaces > 0 && (
          <div className="flex items-center gap-1.5">
            <Car className="w-4 h-4" />
            <span className="text-sm">{propertyDetails.carSpaces}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Building2 className="w-4 h-4" />
          <span className="text-sm">{propertyTypeLabels[propertyDetails.propertyType]}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Leased {formatDate(leaseStartDate)}</span>
          </div>
          {leaseLength && (
            <span>{leaseLength} month lease</span>
          )}
        </div>
        {agency && (
          <span className="text-xs text-gray-400 truncate max-w-[150px]">
            {agency}
          </span>
        )}
      </div>
    </Card>
  );
}

// Compact variant for list views
interface RentalListItemProps {
  rental: RentalRecord;
  onClick?: () => void;
}

export function RentalListItem({ rental, onClick }: RentalListItemProps) {
  const { address, propertyDetails, weeklyRent, leaseStartDate } = rental;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100',
        'hover:border-brand-gold/30 hover:shadow-sm transition-all cursor-pointer'
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-status-rental/10 flex items-center justify-center flex-shrink-0">
        <Home className="w-6 h-6 text-status-rental" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-brand-charcoal truncate">
          {address.streetNumber} {address.streetName} {address.streetType}
        </p>
        <p className="text-sm text-gray-500">
          {address.suburb} · {propertyDetails.bedrooms}bed {propertyDetails.bathrooms}bath
        </p>
      </div>

      {/* Price & Date */}
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-status-rental">{formatRent(weeklyRent)}</p>
        <p className="text-sm text-gray-500">{formatDate(leaseStartDate)}</p>
      </div>
    </div>
  );
}
