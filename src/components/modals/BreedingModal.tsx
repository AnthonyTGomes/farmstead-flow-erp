
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

const BreedingModal = ({ type }: BreedingModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    type === 'breeding' 
      ? {
          femaleId: '',
          maleId: '',
          breedingDate: '',
          method: '',
          notes: ''
        }
      : {
          motherId: '',
          calfName: '',
          birthDate: '',
          gender: '',
          weight: '',
          status: 'Healthy'
        }
  );
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(`Recording ${type}:`, formData);
    
    toast({
      title: `${type === 'breeding' ? 'Breeding' : 'Birth'} Recorded`,
      description: `${type === 'breeding' ? 'Breeding record' : 'Birth record'} has been successfully saved.`,
    });

    setFormData(
      type === 'breeding' 
        ? { femaleId: '', maleId: '', breedingDate: '', method: '', notes: '' }
        : { motherId: '', calfName: '', birthDate: '', gender: '', weight: '', status: 'Healthy' }
    );
    setOpen(false);
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
                    value={formData.femaleId}
                    onChange={(e) => setFormData({ ...formData, femaleId: e.target.value })}
                    placeholder="e.g., COW001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maleId">Male/AI ID</Label>
                  <Input
                    id="maleId"
                    value={formData.maleId}
                    onChange={(e) => setFormData({ ...formData, maleId: e.target.value })}
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
                    value={formData.breedingDate}
                    onChange={(e) => setFormData({ ...formData, breedingDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="method">Method</Label>
                  <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
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
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="motherId">Mother ID</Label>
                  <Input
                    id="motherId"
                    value={formData.motherId}
                    onChange={(e) => setFormData({ ...formData, motherId: e.target.value })}
                    placeholder="e.g., COW001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="calfName">Calf Name</Label>
                  <Input
                    id="calfName"
                    value={formData.calfName}
                    onChange={(e) => setFormData({ ...formData, calfName: e.target.value })}
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
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
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
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
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
