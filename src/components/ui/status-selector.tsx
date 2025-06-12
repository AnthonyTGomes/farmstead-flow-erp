
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
      case 'under treatment':
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
      <SelectTrigger className={`min-w-[140px] border-2 hover:border-gray-400 transition-colors ${size === 'sm' ? 'h-8 text-xs' : 'h-10 text-sm'} bg-white`}>
        <SelectValue>
          <div className="flex items-center gap-2">
            <Badge className={`${currentOption?.color} flex items-center gap-1 px-2 py-1`}>
              {getStatusIcon(currentStatus)}
              <span className="font-medium">{currentOption?.label || currentStatus}</span>
            </Badge>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border-2 shadow-lg z-50 min-w-[160px]">
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="hover:bg-gray-50 cursor-pointer py-2"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex items-center gap-2">
                {getStatusIcon(option.value)}
                <span className="font-medium">{option.label}</span>
              </div>
              <Badge className={`${option.color} ml-auto text-xs`}>
                {option.label}
              </Badge>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
