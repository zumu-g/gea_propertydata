'use client';

import { TrendingUp, TrendingDown, DollarSign, Home, Clock, BarChart3 } from 'lucide-react';
import { Card, StatCard } from '@/components/ui';
import { MarketStats } from '@/types';
import { formatCurrency, formatCurrencyCompact, cn } from '@/lib/utils';

interface MarketStatsDisplayProps {
  stats: MarketStats;
  className?: string;
}

export function MarketStatsDisplay({ stats, className }: MarketStatsDisplayProps) {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      <StatCard
        label="Median Sale Price"
        value={formatCurrencyCompact(stats.medianSalePrice)}
        change={stats.priceChangePercent}
        icon={<DollarSign className="w-5 h-5" />}
      />
      <StatCard
        label="Median Weekly Rent"
        value={`$${stats.medianRent}`}
        change={stats.rentChangePercent}
        icon={<Home className="w-5 h-5" />}
      />
      <StatCard
        label="Total Sales (12 mo)"
        value={stats.totalSales.toLocaleString()}
        icon={<BarChart3 className="w-5 h-5" />}
      />
      <StatCard
        label="Avg Days on Market"
        value={`${stats.averageDaysOnMarket} days`}
        icon={<Clock className="w-5 h-5" />}
      />
    </div>
  );
}

// Compact inline stats for cards
interface InlineStatsProps {
  medianPrice: number;
  medianRent: number;
  priceChange?: number;
  rentChange?: number;
}

export function InlineStats({ medianPrice, medianRent, priceChange, rentChange }: InlineStatsProps) {
  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Median sale:</span>
        <span className="font-semibold text-brand-charcoal">
          {formatCurrencyCompact(medianPrice)}
        </span>
        {priceChange !== undefined && (
          <span className={cn(
            'flex items-center',
            priceChange >= 0 ? 'text-emerald-600' : 'text-red-600'
          )}>
            {priceChange >= 0 ? (
              <TrendingUp className="w-3 h-3 mr-0.5" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-0.5" />
            )}
            {Math.abs(priceChange)}%
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Median rent:</span>
        <span className="font-semibold text-brand-charcoal">${medianRent}/wk</span>
        {rentChange !== undefined && (
          <span className={cn(
            'flex items-center',
            rentChange >= 0 ? 'text-emerald-600' : 'text-red-600'
          )}>
            {rentChange >= 0 ? (
              <TrendingUp className="w-3 h-3 mr-0.5" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-0.5" />
            )}
            {Math.abs(rentChange)}%
          </span>
        )}
      </div>
    </div>
  );
}
