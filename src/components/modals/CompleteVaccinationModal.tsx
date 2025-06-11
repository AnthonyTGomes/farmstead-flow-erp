
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Syringe, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompleteVaccinationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: {
    id: string;
    animalId: string;
    animalName: string;
    vaccine: string;
    status: string;
  } | null;
  onComplete: (vaccinationId: string, data: any) => void;
}

const CompleteVaccinationModal = ({ open, onOpenChange, schedule, onComplete }: CompleteVaccinationModalProps) => {
  const [formData, setFormData] = useState({
    completionDate: '',
    veterinarian: '',
    batchNumber: '',
    nextDueDate: '',
    notes: '',
    reaction: 'None'
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!schedule) return;

    onComplete(schedule.id, {
      ...formData,
      status: 'Completed'
    });

    toast({
      title: "Vaccination Completed",
      description: `${schedule.vaccine} vaccination completed for ${schedule.animalName}`,
    });

    setFormData({
      completionDate: '',
      veterinarian: '',
      batchNumber: '',
      nextDueDate: '',
      notes: '',
      reaction: 'None'
    });
    onOpenChange(false);
  };

  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Syringe className="w-4 h-4 text-blue-600" />
            </div>
            Complete Vaccination
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{schedule.animalName} ({schedule.animalId})</h3>
            <Badge className="bg-blue-100 text-blue-800">{schedule.status}</Badge>
          </div>
          <p className="text-sm text-gray-600">Vaccine: {schedule.vaccine}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="completionDate">Completion Date *</Label>
              <Input
                id="completionDate"
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="nextDueDate">Next Due Date *</Label>
              <Input
                id="nextDueDate"
                type="date"
                value={formData.nextDueDate}
                onChange={(e) => setFormData({ ...formData, nextDueDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="veterinarian">Veterinarian *</Label>
            <Input
              id="veterinarian"
              value={formData.veterinarian}
              onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
              placeholder="Dr. Smith"
              required
            />
          </div>

          <div>
            <Label htmlFor="batchNumber">Batch Number</Label>
            <Input
              id="batchNumber"
              value={formData.batchNumber}
              onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              placeholder="VAC-2024-001"
            />
          </div>

          <div>
            <Label htmlFor="reaction">Animal Reaction</Label>
            <Select value={formData.reaction} onValueChange={(value) => setFormData({ ...formData, reaction: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">No Reaction</SelectItem>
                <SelectItem value="Mild">Mild Reaction</SelectItem>
                <SelectItem value="Moderate">Moderate Reaction</SelectItem>
                <SelectItem value="Severe">Severe Reaction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional observations or notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Complete Vaccination
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteVaccinationModal;
