
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductionModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    animalId: '',
    productionType: '',
    quantity: '',
    date: '',
    quality: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Recording production:', formData);
    
    toast({
      title: "Production Recorded",
      description: `${formData.quantity} liters of ${formData.productionType} recorded for ${formData.animalId}.`,
    });

    setFormData({
      animalId: '',
      productionType: '',
      quantity: '',
      date: '',
      quality: '',
      notes: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <FileText className="w-4 h-4 mr-2" />
          Record Production
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Production</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="productionType">Production Type</Label>
              <Select value={formData.productionType} onValueChange={(value) => setFormData({ ...formData, productionType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Milk">Milk</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                  <SelectItem value="Eggs">Eggs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g., 25 liters"
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
            <Label htmlFor="quality">Quality Grade</Label>
            <Select value={formData.quality} onValueChange={(value) => setFormData({ ...formData, quality: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Grade A</SelectItem>
                <SelectItem value="B">Grade B</SelectItem>
                <SelectItem value="C">Grade C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductionModal;
