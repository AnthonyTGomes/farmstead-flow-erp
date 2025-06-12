import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Baby, Calendar, Eye, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import BreedingModal from '@/components/modals/BreedingModal';
import ViewBreedingModal from '@/components/modals/ViewBreedingModal';
import CompleteBreedingModal from '@/components/modals/CompleteBreedingModal';
import StatusSelector from '@/components/ui/status-selector';

const BreedingReproduction = () => {
  const [breedingRecords, setBreedingRecords] = useState([
    {
      id: 'BREED001',
      femaleId: 'COW001',
      femaleName: 'Bella',
      maleId: 'BULL001',
      maleName: 'Thunder',
      breedingDate: '2024-03-15',
      expectedCalving: '2024-12-15',
      status: 'Pregnant',
      stage: '2 months'
    },
    {
      id: 'BREED002',
      femaleId: 'COW005',
      femaleName: 'Luna',
      maleId: 'AI-001',
      maleName: 'AI Service',
      breedingDate: '2024-04-20',
      expectedCalving: '2025-01-20',
      status: 'Confirmed',
      stage: '1 month'
    }
  ]);

  const [birthRecords, setBirthRecords] = useState([
    {
      id: 'BIRTH001',
      motherId: 'COW002',
      motherName: 'Daisy',
      calfId: 'CALF001',
      calfName: 'Little Belle',
      birthDate: '2024-02-15',
      gender: 'Female',
      weight: '35 kg',
      status: 'Healthy'
    },
    {
      id: 'BIRTH002',
      motherId: 'COW003',
      motherName: 'Rosie',
      calfId: 'CALF002',
      calfName: 'Max',
      birthDate: '2024-01-28',
      gender: 'Male',
      weight: '42 kg',
      status: 'Healthy'
    }
  ]);

  const [viewBreedingModalOpen, setViewBreedingModalOpen] = useState(false);
  const [completeBreedingModalOpen, setCompleteBreedingModalOpen] = useState(false);
  const [selectedBreedingRecord, setSelectedBreedingRecord] = useState(null);
  const { toast } = useToast();

  const breedingStatusOptions = [
    { value: 'Breeding', label: 'Breeding', color: 'bg-blue-100 text-blue-800' },
    { value: 'Confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
    { value: 'Pregnant', label: 'Pregnant', color: 'bg-purple-100 text-purple-800' },
    { value: 'Failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
    { value: 'Completed', label: 'Completed', color: 'bg-gray-100 text-gray-800' }
  ];

  const birthStatusOptions = [
    { value: 'Healthy', label: 'Healthy', color: 'bg-green-100 text-green-800' },
    { value: 'Monitoring', label: 'Monitoring', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Sick', label: 'Sick', color: 'bg-red-100 text-red-800' },
    { value: 'Deceased', label: 'Deceased', color: 'bg-gray-100 text-gray-800' }
  ];

  const getStatusColor = (status: string) => {
    const allOptions = [...breedingStatusOptions, ...birthStatusOptions];
    const option = allOptions.find(opt => opt.value === status);
    return option?.color || 'bg-gray-100 text-gray-800';
  };

  const handleBreedingStatusChange = (recordId: string, newStatus: string) => {
    setBreedingRecords(prev => prev.map(record => 
      record.id === recordId ? { ...record, status: newStatus } : record
    ));
    
    const record = breedingRecords.find(r => r.id === recordId);
    toast({
      title: "Breeding Status Updated",
      description: `${record?.femaleName}'s breeding status changed to ${newStatus}`,
    });
  };

  const handleBirthStatusChange = (recordId: string, newStatus: string) => {
    setBirthRecords(prev => prev.map(record => 
      record.id === recordId ? { ...record, status: newStatus } : record
    ));
    
    const record = birthRecords.find(r => r.id === recordId);
    toast({
      title: "Birth Record Updated",
      description: `${record?.calfName}'s status changed to ${newStatus}`,
    });
  };

  const handleCompleteBreeding = (record: any) => {
    setSelectedBreedingRecord(record);
    setCompleteBreedingModalOpen(true);
  };

  const handleBreedingComplete = (recordId: string, data: any) => {
    setBreedingRecords(prev => prev.map(record => 
      record.id === recordId ? { ...record, ...data } : record
    ));
  };

  const handleViewBreeding = (record: any) => {
    setSelectedBreedingRecord(record);
    setViewBreedingModalOpen(true);
  };

  const handleEditBreeding = (record: any) => {
    console.log('Editing breeding record:', record);
    toast({
      title: "Edit Breeding Record",
      description: `Opening edit form for ${record.femaleName}`,
    });
  };

  const handleDeleteBreeding = (recordId: string) => {
    setBreedingRecords(prev => prev.filter(record => record.id !== recordId));
    toast({
      title: "Breeding Record Deleted",
      description: "Breeding record has been removed",
    });
  };

  const handleViewBirth = (record: any) => {
    console.log('Viewing birth record:', record);
    toast({
      title: "Birth Record Details",
      description: `Viewing details for ${record.calfName}`,
    });
  };

  const handleEditBirth = (record: any) => {
    console.log('Editing birth record:', record);
    toast({
      title: "Edit Birth Record",
      description: `Opening edit form for ${record.calfName}`,
    });
  };

  const handleDeleteBirth = (recordId: string) => {
    setBirthRecords(prev => prev.filter(record => record.id !== recordId));
    toast({
      title: "Birth Record Deleted",
      description: "Birth record has been removed",
    });
  };

  const canCompleteBreeding = (status: string) => {
    return ['Breeding', 'Confirmed', 'Pregnant'].includes(status);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Breeding & Reproduction</h2>
        <div className="flex space-x-2">
          <BreedingModal type="breeding" />
          <BreedingModal type="birth" />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-sm text-gray-600">Pregnant Animals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Baby className="w-8 h-8 text-pink-600" />
              <div>
                <div className="text-2xl font-bold text-pink-600">8</div>
                <div className="text-sm text-gray-600">Expected Births</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Total Births</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">%</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-purple-600" />
              Active Breeding Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Female</TableHead>
                  <TableHead>Male/AI</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breedingRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.femaleName}</div>
                        <div className="text-sm text-gray-600">{record.femaleId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.maleName}</div>
                        <div className="text-sm text-gray-600">{record.maleId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.expectedCalving}</TableCell>
                    <TableCell>
                      <StatusSelector
                        currentStatus={record.status}
                        options={breedingStatusOptions}
                        onStatusChange={(newStatus) => handleBreedingStatusChange(record.id, newStatus)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {canCompleteBreeding(record.status) && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleCompleteBreeding(record)}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleViewBreeding(record)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditBreeding(record)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteBreeding(record.id)}>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Baby className="w-5 h-5 mr-2 text-pink-600" />
              Recent Births
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Calf</TableHead>
                  <TableHead>Mother</TableHead>
                  <TableHead>Birth Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {birthRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.calfName}</div>
                        <div className="text-sm text-gray-600">{record.calfId} • {record.weight}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.motherName}</div>
                        <div className="text-sm text-gray-600">{record.motherId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.birthDate}</TableCell>
                    <TableCell>
                      <StatusSelector
                        currentStatus={record.status}
                        options={birthStatusOptions}
                        onStatusChange={(newStatus) => handleBirthStatusChange(record.id, newStatus)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewBirth(record)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditBirth(record)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteBirth(record.id)}>
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

      <ViewBreedingModal 
        open={viewBreedingModalOpen}
        onOpenChange={setViewBreedingModalOpen}
        record={selectedBreedingRecord}
      />

      <CompleteBreedingModal
        open={completeBreedingModalOpen}
        onOpenChange={setCompleteBreedingModalOpen}
        breedingRecord={selectedBreedingRecord}
        onComplete={handleBreedingComplete}
      />
    </div>
  );
};

export default BreedingReproduction;
