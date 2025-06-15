
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
  readOnly?: boolean;
}

const StatusSelector = ({ 
  currentStatus, 
  options, 
  onStatusChange, 
  disabled = false,
  size = 'default',
  readOnly = false
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
      case 'under treatment':
        return <AlertTriangle className="w-3 h-3" />;
      case 'cancelled':
      case 'failed':
        return <X className="w-3 h-3" />;
      default:
        return null;
    }
  };

  // Filter out any options with empty string values
  const validOptions = options.filter(option => option.value && option.value.trim() !== '');

  // If read-only, just show a badge
  if (readOnly) {
    return (
      <Badge className={`${currentOption?.color} flex items-center gap-1 px-2 py-1`}>
        {getStatusIcon(currentStatus)}
        <span className="font-medium">{currentOption?.label || currentStatus}</span>
      </Badge>
    );
  }

  return (
    <Select value={currentStatus} onValueChange={onStatusChange} disabled={disabled}>
      <SelectTrigger className={`min-w-[120px] border hover:border-gray-400 transition-colors ${size === 'sm' ? 'h-8 text-xs' : 'h-9 text-sm'} bg-white`}>
        <SelectValue>
          <Badge className={`${currentOption?.color} flex items-center gap-1 px-2 py-1`}>
            {getStatusIcon(currentStatus)}
            <span className="font-medium">{currentOption?.label || currentStatus}</span>
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg z-50 min-w-[140px]">
        {validOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="hover:bg-gray-50 cursor-pointer py-2"
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(option.value)}
              <span className="font-medium">{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
