'use client';

import { FileText, Calendar, MapPin, Building2, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { PlanningPermit, PlanningStatus } from '@/types';
import {
  formatDate,
  formatRelativeDate,
  planningStatusLabels,
  planningTypeLabels,
  truncate,
  cn,
} from '@/lib/utils';

interface PlanningPermitCardProps {
  permit: PlanningPermit;
  onClick?: () => void;
}

const statusVariants: Record<PlanningStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  lodged: 'info',
  under_assessment: 'warning',
  approved: 'success',
  refused: 'error',
  withdrawn: 'default',
  lapsed: 'default',
};

const statusIcons: Record<PlanningStatus, typeof CheckCircle> = {
  lodged: FileText,
  under_assessment: Clock,
  approved: CheckCircle,
  refused: XCircle,
  withdrawn: AlertCircle,
  lapsed: AlertCircle,
};

export function PlanningPermitCard({ permit, onClick }: PlanningPermitCardProps) {
  const {
    applicationNumber,
    address,
    description,
    applicationType,
    status,
    dateReceived,
    dateDecided,
    council,
    zone,
    overlays,
  } = permit;

  const StatusIcon = statusIcons[status];

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
            <Badge variant={statusVariants[status]}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {planningStatusLabels[status]}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatRelativeDate(dateReceived)}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-brand-charcoal truncate group-hover:text-brand-gold transition-colors">
            {address.fullAddress}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-mono text-gray-500">{applicationNumber}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4">
        {truncate(description, 150)}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Application Type</p>
          <p className="text-sm font-medium text-brand-charcoal">
            {planningTypeLabels[applicationType]}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Zone</p>
          <p className="text-sm font-medium text-brand-charcoal">{zone}</p>
        </div>
      </div>

      {/* Overlays */}
      {overlays && overlays.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Overlays</p>
          <div className="flex flex-wrap gap-2">
            {overlays.map((overlay, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
              >
                {overlay}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Lodged {formatDate(dateReceived)}</span>
          </div>
          {dateDecided && (
            <span>Decided {formatDate(dateDecided)}</span>
          )}
        </div>
        <span className="text-xs text-gray-400 truncate max-w-[150px]">
          {council}
        </span>
      </div>
    </Card>
  );
}

// Compact variant for list views
interface PlanningListItemProps {
  permit: PlanningPermit;
  onClick?: () => void;
}

export function PlanningListItem({ permit, onClick }: PlanningListItemProps) {
  const { applicationNumber, address, description, status, dateReceived } = permit;
  const StatusIcon = statusIcons[status];

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100',
        'hover:border-brand-gold/30 hover:shadow-sm transition-all cursor-pointer'
      )}
    >
      {/* Icon */}
      <div className={cn(
        'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
        status === 'approved' && 'bg-emerald-50',
        status === 'refused' && 'bg-red-50',
        status === 'under_assessment' && 'bg-amber-50',
        (status === 'lodged' || status === 'withdrawn' || status === 'lapsed') && 'bg-gray-50'
      )}>
        <StatusIcon className={cn(
          'w-6 h-6',
          status === 'approved' && 'text-emerald-600',
          status === 'refused' && 'text-red-600',
          status === 'under_assessment' && 'text-amber-600',
          (status === 'lodged' || status === 'withdrawn' || status === 'lapsed') && 'text-gray-600'
        )} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-brand-charcoal truncate">
          {address.streetNumber} {address.streetName} {address.streetType}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {truncate(description, 60)}
        </p>
      </div>

      {/* Status & Date */}
      <div className="text-right flex-shrink-0">
        <Badge variant={statusVariants[status]} className="mb-1">
          {planningStatusLabels[status]}
        </Badge>
        <p className="text-sm text-gray-500">{formatDate(dateReceived)}</p>
      </div>
    </div>
  );
}
