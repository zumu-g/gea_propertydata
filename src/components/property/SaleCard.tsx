'use client';

import { MapPin, Bed, Bath, Car, Calendar, Clock, Building2 } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { SaleRecord } from '@/types';
import {
  formatCurrency,
  formatDate,
  formatRelativeDate,
  propertyTypeLabels,
  cn,
} from '@/lib/utils';

interface SaleCardProps {
  sale: SaleRecord;
  onClick?: () => void;
}

export function SaleCard({ sale, onClick }: SaleCardProps) {
  const { address, propertyDetails, salePrice, saleDate, daysOnMarket, agency } = sale;

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
            <Badge variant="success">Sold</Badge>
            <span className="text-sm text-gray-500">
              {formatRelativeDate(saleDate)}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-brand-charcoal truncate group-hover:text-brand-gold transition-colors">
            {address.fullAddress}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-display font-bold text-status-sale">
            {formatCurrency(salePrice)}
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
            <span>{formatDate(saleDate)}</span>
          </div>
          {daysOnMarket && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{daysOnMarket} days on market</span>
            </div>
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
interface SaleListItemProps {
  sale: SaleRecord;
  onClick?: () => void;
}

export function SaleListItem({ sale, onClick }: SaleListItemProps) {
  const { address, propertyDetails, salePrice, saleDate, daysOnMarket } = sale;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100',
        'hover:border-brand-gold/30 hover:shadow-sm transition-all cursor-pointer'
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-status-sale/10 flex items-center justify-center flex-shrink-0">
        <Building2 className="w-6 h-6 text-status-sale" />
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
        <p className="font-semibold text-status-sale">{formatCurrency(salePrice)}</p>
        <p className="text-sm text-gray-500">{formatDate(saleDate)}</p>
      </div>
    </div>
  );
}
