import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AddAnimalModal from '@/components/modals/AddAnimalModal';

const LivestockInventory = () => {
  const [animals, setAnimals] = useState([
    {
      id: 'COW001',
      name: 'Bella',
      breed: 'Holstein',
      age: '3 years',
      gender: 'Female',
      weight: '650 kg',
      status: 'Active',
      location: 'Pen A1'
    },
    {
      id: 'COW002',
      name: 'Thunder',
      breed: 'Angus',
      age: '5 years',
      gender: 'Male',
      weight: '800 kg',
      status: 'Active',
      location: 'Pen B2'
    },
    {
      id: 'COW003',
      name: 'Daisy',
      breed: 'Jersey',
      age: '2 years',
      gender: 'Female',
      weight: '450 kg',
      status: 'Sick',
      location: 'Isolation'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { toast } = useToast();

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === '' || animal.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddAnimal = (newAnimal: any) => {
    setAnimals([...animals, newAnimal]);
  };

  const handleViewAnimal = (animal: any) => {
    console.log('Viewing animal:', animal);
    toast({
      title: "Animal Details",
      description: `Viewing details for ${animal.name} (${animal.id})`,
    });
  };

  const handleEditAnimal = (animal: any) => {
    console.log('Editing animal:', animal);
    toast({
      title: "Edit Animal",
      description: `Opening edit form for ${animal.name}`,
    });
  };

  const handleDeleteAnimal = (animalId: string) => {
    setAnimals(animals.filter(animal => animal.id !== animalId));
    toast({
      title: "Animal Removed",
      description: "Animal has been removed from inventory",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Sick': return 'bg-red-100 text-red-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Livestock Inventory</h2>
        <AddAnimalModal onAnimalAdded={handleAddAnimal} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">247</div>
            <div className="text-sm text-gray-600">Total Animals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">232</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">8</div>
            <div className="text-sm text-gray-600">Sick</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">7</div>
            <div className="text-sm text-gray-600">Quarantine</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Animal Registry</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search animals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFilterStatus(filterStatus === 'Active' ? '' : 'Active')}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filterStatus === 'Active' ? 'Show All' : 'Active Only'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="font-medium">{animal.id}</TableCell>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell>{animal.breed}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>{animal.weight}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(animal.status)}>
                      {animal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{animal.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewAnimal(animal)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditAnimal(animal)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteAnimal(animal.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivestockInventory;
