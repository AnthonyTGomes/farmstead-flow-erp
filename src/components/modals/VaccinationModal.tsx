
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VaccinationModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    animalId: '',
    vaccineName: '',
    date: '',
    nextDue: '',
    veterinarian: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Scheduling vaccination:', formData);
    
    toast({
      title: "Vaccination Scheduled",
      description: `${formData.vaccineName} vaccination scheduled for ${formData.animalId}.`,
    });

    setFormData({
      animalId: '',
      vaccineName: '',
      date: '',
      nextDue: '',
      veterinarian: '',
      notes: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Vaccination
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Vaccination</DialogTitle>
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
          
          <div>
            <Label htmlFor="vaccineName">Vaccine Name</Label>
            <Select value={formData.vaccineName} onValueChange={(value) => setFormData({ ...formData, vaccineName: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select vaccine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FMD">Foot and Mouth Disease</SelectItem>
                <SelectItem value="Rabies">Rabies</SelectItem>
                <SelectItem value="Anthrax">Anthrax</SelectItem>
                <SelectItem value="Blackleg">Blackleg</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Vaccination Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="nextDue">Next Due</Label>
              <Input
                id="nextDue"
                type="date"
                value={formData.nextDue}
                onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
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

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Schedule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VaccinationModal;
