
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Baby } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BreedingModalProps {
  type: 'breeding' | 'birth';
}

interface BreedingFormData {
  femaleId: string;
  maleId: string;
  breedingDate: string;
  method: string;
  notes: string;
}

interface BirthFormData {
  motherId: string;
  calfName: string;
  birthDate: string;
  gender: string;
  weight: string;
  status: string;
}

const BreedingModal = ({ type }: BreedingModalProps) => {
  const [open, setOpen] = useState(false);
  const [breedingData, setBreedingData] = useState<BreedingFormData>({
    femaleId: '',
    maleId: '',
    breedingDate: '',
    method: '',
    notes: ''
  });
  const [birthData, setBirthData] = useState<BirthFormData>({
    motherId: '',
    calfName: '',
    birthDate: '',
    gender: '',
    weight: '',
    status: 'Healthy'
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = type === 'breeding' ? breedingData : birthData;
    console.log(`Recording ${type}:`, formData);
    
    toast({
      title: `${type === 'breeding' ? 'Breeding' : 'Birth'} Recorded`,
      description: `${type === 'breeding' ? 'Breeding record' : 'Birth record'} has been successfully saved.`,
    });

    if (type === 'breeding') {
      setBreedingData({
        femaleId: '',
        maleId: '',
        breedingDate: '',
        method: '',
        notes: ''
      });
    } else {
      setBirthData({
        motherId: '',
        calfName: '',
        birthDate: '',
        gender: '',
        weight: '',
        status: 'Healthy'
      });
    }
    setOpen(false);
  };

  const updateBreedingData = (field: keyof BreedingFormData, value: string) => {
    setBreedingData(prev => ({ ...prev, [field]: value }));
  };

  const updateBirthData = (field: keyof BirthFormData, value: string) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={type === 'breeding' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-pink-600 hover:bg-pink-700'}>
          {type === 'breeding' ? <Heart className="w-4 h-4 mr-2" /> : <Baby className="w-4 h-4 mr-2" />}
          Record {type === 'breeding' ? 'Breeding' : 'Birth'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record {type === 'breeding' ? 'Breeding' : 'Birth'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'breeding' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="femaleId">Female ID</Label>
                  <Input
                    id="femaleId"
                    value={breedingData.femaleId}
                    onChange={(e) => updateBreedingData('femaleId', e.target.value)}
                    placeholder="e.g., COW001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maleId">Male/AI ID</Label>
                  <Input
                    id="maleId"
                    value={breedingData.maleId}
                    onChange={(e) => updateBreedingData('maleId', e.target.value)}
                    placeholder="e.g., BULL001"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="breedingDate">Breeding Date</Label>
                  <Input
                    id="breedingDate"
                    type="date"
                    value={breedingData.breedingDate}
                    onChange={(e) => updateBreedingData('breedingDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="method">Method</Label>
                  <Select value={breedingData.method} onValueChange={(value) => updateBreedingData('method', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Natural">Natural</SelectItem>
                      <SelectItem value="AI">Artificial Insemination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={breedingData.notes}
                  onChange={(e) => updateBreedingData('notes', e.target.value)}
                  placeholder="Additional notes..."
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="motherId">Mother ID</Label>
                  <Input
                    id="motherId"
                    value={birthData.motherId}
                    onChange={(e) => updateBirthData('motherId', e.target.value)}
                    placeholder="e.g., COW001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="calfName">Calf Name</Label>
                  <Input
                    id="calfName"
                    value={birthData.calfName}
                    onChange={(e) => updateBirthData('calfName', e.target.value)}
                    placeholder="e.g., Little Belle"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthData.birthDate}
                    onChange={(e) => updateBirthData('birthDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={birthData.gender} onValueChange={(value) => updateBirthData('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="weight">Birth Weight</Label>
                <Input
                  id="weight"
                  value={birthData.weight}
                  onChange={(e) => updateBirthData('weight', e.target.value)}
                  placeholder="e.g., 35 kg"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className={type === 'breeding' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-pink-600 hover:bg-pink-700'}>
              Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BreedingModal;
