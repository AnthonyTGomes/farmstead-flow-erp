
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FinancialModalProps {
  type: 'income' | 'expense';
}

const FinancialModal = ({ type }: FinancialModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: ''
  });
  const { toast } = useToast();

  const incomeCategories = ['Milk Sales', 'Animal Sales', 'Meat Sales', 'Other Income'];
  const expenseCategories = ['Feed', 'Veterinary', 'Labor', 'Equipment', 'Utilities', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(`Recording ${type}:`, formData);
    
    toast({
      title: `${type === 'income' ? 'Income' : 'Expense'} Recorded`,
      description: `$${formData.amount} ${type} has been recorded successfully.`,
    });

    setFormData({
      category: '',
      amount: '',
      date: '',
      description: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={type === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>
          {type === 'income' ? <Plus className="w-4 h-4 mr-2" /> : <Receipt className="w-4 h-4 mr-2" />}
          Add {type === 'income' ? 'Income' : 'Expense'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record {type === 'income' ? 'Income' : 'Expense'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {(type === 'income' ? incomeCategories : expenseCategories).map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description..."
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className={type === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>
              Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialModal;
