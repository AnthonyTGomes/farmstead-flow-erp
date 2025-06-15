import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Eye, Edit, Trash2, Users, Heart, AlertTriangle, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AddAnimalModal from '@/components/modals/AddAnimalModal';
import ViewAnimalModal from '@/components/modals/ViewAnimalModal';
import { usePagination } from '@/hooks/usePagination';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBreed, setFilterBreed] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const { toast } = useToast();

  const handleViewAnimal = (animal: any) => {
    setSelectedAnimal(animal);
    setViewModalOpen(true);
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

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || animal.status === filterStatus;
    const matchesBreed = filterBreed === 'all' || animal.breed === filterBreed;
    const matchesGender = filterGender === 'all' || animal.gender === filterGender;
    return matchesSearch && matchesStatus && matchesBreed && matchesGender;
  });

  const { 
    currentPage, 
    totalPages, 
    paginatedData, 
    goToPage,
    goToNext, 
    goToPrevious, 
    hasNext, 
    hasPrevious,
    totalItems 
  } = usePagination({ data: filteredAnimals, itemsPerPage: 10 });

  const handleAddAnimal = (newAnimal: any) => {
    setAnimals([...animals, newAnimal]);
  };

  const uniqueBreeds = [...new Set(animals.map(animal => animal.breed))];
  const uniqueStatuses = [...new Set(animals.map(animal => animal.status))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Livestock Inventory</h2>
        <AddAnimalModal onAnimalAdded={handleAddAnimal} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">247</div>
                <div className="text-sm text-gray-600">Total Animals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">232</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">8</div>
                <div className="text-sm text-gray-600">Sick</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-sm text-gray-600">Quarantine</div>
              </div>
            </div>
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {uniqueStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterBreed} onValueChange={setFilterBreed}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Breeds</SelectItem>
                  {uniqueBreeds.map(breed => (
                    <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterGender} onValueChange={setFilterGender}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm text-gray-600">
            Showing {paginatedData.length} of {totalItems} animals
          </div>
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
              {paginatedData.map((animal) => (
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
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={goToPrevious}
                      className={!hasPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        onClick={() => goToPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={goToNext}
                      className={!hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <ViewAnimalModal 
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        animal={selectedAnimal}
      />
    </div>
  );
};

export default LivestockInventory;
