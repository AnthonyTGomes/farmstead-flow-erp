
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    animalId: '',
    condition: '',
    symptoms: '',
    treatment: '',
    veterinarian: '',
    date: '',
    severity: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Recording health issue:', formData);
    
    toast({
      title: "Health Issue Recorded",
      description: `Health issue for ${formData.animalId} has been recorded successfully.`,
    });

    setFormData({
      animalId: '',
      condition: '',
      symptoms: '',
      treatment: '',
      veterinarian: '',
      date: '',
      severity: '',
      notes: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Record Health Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Health Issue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="animalId">Animal ID</Label>
            <Input
              id="animalId"
              value={formData.animalId}
              onChange={(e) => setFormData({ ...formData, animalId: e.target.value })}
              placeholder="e.g., COW001"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mastitis">Mastitis</SelectItem>
                  <SelectItem value="Hoof Rot">Hoof Rot</SelectItem>
                  <SelectItem value="Respiratory">Respiratory Issue</SelectItem>
                  <SelectItem value="Digestive">Digestive Issue</SelectItem>
                  <SelectItem value="Injury">Injury</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mild">Mild</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="symptoms">Symptoms</Label>
            <Input
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              placeholder="Describe symptoms..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="treatment">Treatment</Label>
              <Input
                id="treatment"
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                placeholder="e.g., Antibiotics"
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="veterinarian">Veterinarian</Label>
            <Input
              id="veterinarian"
              value={formData.veterinarian}
              onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
              placeholder="Dr. Smith"
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HealthModal;
