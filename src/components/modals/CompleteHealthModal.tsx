
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompleteHealthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  healthRecord: {
    id: string;
    animalId: string;
    animalName: string;
    condition: string;
    status: string;
  } | null;
  onComplete: (recordId: string, data: any) => void;
}

const CompleteHealthModal = ({ open, onOpenChange, healthRecord, onComplete }: CompleteHealthModalProps) => {
  const [formData, setFormData] = useState({
    treatmentDate: '',
    veterinarian: '',
    treatment: '',
    medication: '',
    dosage: '',
    outcome: 'Recovered',
    followUpDate: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!healthRecord) return;

    onComplete(healthRecord.id, {
      ...formData,
      status: formData.outcome
    });

    toast({
      title: "Treatment Completed",
      description: `Treatment for ${healthRecord.condition} completed for ${healthRecord.animalName}`,
    });

    setFormData({
      treatmentDate: '',
      veterinarian: '',
      treatment: '',
      medication: '',
      dosage: '',
      outcome: 'Recovered',
      followUpDate: '',
      notes: ''
    });
    onOpenChange(false);
  };

  if (!healthRecord) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-red-600" />
            </div>
            Complete Treatment
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{healthRecord.animalName} ({healthRecord.animalId})</h3>
            <Badge className="bg-orange-100 text-orange-800">{healthRecord.status}</Badge>
          </div>
          <p className="text-sm text-gray-600">Condition: {healthRecord.condition}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="treatmentDate">Treatment Date *</Label>
              <Input
                id="treatmentDate"
                type="date"
                value={formData.treatmentDate}
                onChange={(e) => setFormData({ ...formData, treatmentDate: e.target.value })}
                required
              />
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
          </div>

          <div>
            <Label htmlFor="treatment">Treatment Given *</Label>
            <Input
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              placeholder="Antibiotic injection"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="medication">Medication</Label>
              <Input
                id="medication"
                value={formData.medication}
                onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                placeholder="Penicillin"
              />
            </div>
            <div>
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                placeholder="10ml daily"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="outcome">Treatment Outcome *</Label>
            <Select value={formData.outcome} onValueChange={(value) => setFormData({ ...formData, outcome: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Recovered">Fully Recovered</SelectItem>
                <SelectItem value="Monitoring">Still Monitoring</SelectItem>
                <SelectItem value="Chronic">Chronic Condition</SelectItem>
                <SelectItem value="Deceased">Animal Deceased</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="followUpDate">Follow-up Date</Label>
            <Input
              id="followUpDate"
              type="date"
              value={formData.followUpDate}
              onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="notes">Treatment Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Treatment details, observations..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Complete Treatment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteHealthModal;
