
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, AlertTriangle, X } from 'lucide-react';

interface StatusOption {
  value: string;
  label: string;
  color: string;
  icon?: React.ReactNode;
}

interface StatusSelectorProps {
  currentStatus: string;
  options: StatusOption[];
  onStatusChange: (newStatus: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'default';
}

const StatusSelector = ({ 
  currentStatus, 
  options, 
  onStatusChange, 
  disabled = false,
  size = 'default' 
}: StatusSelectorProps) => {
  const currentOption = options.find(option => option.value === currentStatus);
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'recovered':
      case 'confirmed':
      case 'healthy':
        return <Check className="w-3 h-3" />;
      case 'due':
      case 'scheduled':
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'overdue':
      case 'urgent':
      case 'sick':
        return <AlertTriangle className="w-3 h-3" />;
      case 'cancelled':
      case 'failed':
        return <X className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <Select value={currentStatus} onValueChange={onStatusChange} disabled={disabled}>
      <SelectTrigger className={`w-auto min-w-[120px] ${size === 'sm' ? 'h-8 text-xs' : 'h-9 text-sm'}`}>
        <SelectValue>
          <Badge className={`${currentOption?.color} flex items-center gap-1`}>
            {getStatusIcon(currentStatus)}
            {currentOption?.label || currentStatus}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {getStatusIcon(option.value)}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
