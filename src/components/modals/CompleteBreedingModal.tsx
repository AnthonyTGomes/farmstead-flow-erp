
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Baby, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompleteBreedingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  breedingRecord: {
    id: string;
    femaleId: string;
    femaleName: string;
    status: string;
  } | null;
  onComplete: (recordId: string, data: any) => void;
}

const CompleteBreedingModal = ({ open, onOpenChange, breedingRecord, onComplete }: CompleteBreedingModalProps) => {
  const [formData, setFormData] = useState({
    confirmationDate: '',
    confirmationMethod: 'Ultrasound',
    expectedCalving: '',
    veterinarian: '',
    outcome: 'Confirmed',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!breedingRecord) return;

    onComplete(breedingRecord.id, {
      ...formData,
      status: formData.outcome
    });

    toast({
      title: "Breeding Status Updated",
      description: `Breeding record updated for ${breedingRecord.femaleName}`,
    });

    setFormData({
      confirmationDate: '',
      confirmationMethod: 'Ultrasound',
      expectedCalving: '',
      veterinarian: '',
      outcome: 'Confirmed',
      notes: ''
    });
    onOpenChange(false);
  };

  if (!breedingRecord) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-purple-600" />
            </div>
            Update Breeding Status
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{breedingRecord.femaleName} ({breedingRecord.femaleId})</h3>
            <Badge className="bg-purple-100 text-purple-800">{breedingRecord.status}</Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="outcome">Breeding Outcome *</Label>
            <Select value={formData.outcome} onValueChange={(value) => setFormData({ ...formData, outcome: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmed">Pregnancy Confirmed</SelectItem>
                <SelectItem value="Failed">Breeding Failed</SelectItem>
                <SelectItem value="Completed">Birth Completed</SelectItem>
                <SelectItem value="Monitoring">Under Monitoring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="confirmationDate">Confirmation Date *</Label>
              <Input
                id="confirmationDate"
                type="date"
                value={formData.confirmationDate}
                onChange={(e) => setFormData({ ...formData, confirmationDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmationMethod">Confirmation Method</Label>
              <Select value={formData.confirmationMethod} onValueChange={(value) => setFormData({ ...formData, confirmationMethod: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                  <SelectItem value="Physical Exam">Physical Examination</SelectItem>
                  <SelectItem value="Blood Test">Blood Test</SelectItem>
                  <SelectItem value="Visual">Visual Observation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(formData.outcome === 'Confirmed' || formData.outcome === 'Monitoring') && (
            <div>
              <Label htmlFor="expectedCalving">Expected Calving Date</Label>
              <Input
                id="expectedCalving"
                type="date"
                value={formData.expectedCalving}
                onChange={(e) => setFormData({ ...formData, expectedCalving: e.target.value })}
              />
            </div>
          )}

          <div>
            <Label htmlFor="veterinarian">Veterinarian</Label>
            <Input
              id="veterinarian"
              value={formData.veterinarian}
              onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
              placeholder="Dr. Smith"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional observations..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Update Status
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteBreedingModal;
