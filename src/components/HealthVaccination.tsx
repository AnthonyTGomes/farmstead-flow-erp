import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Syringe, Heart, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import VaccinationModal from '@/components/modals/VaccinationModal';
import HealthModal from '@/components/modals/HealthModal';
import StatusSelector from '@/components/ui/status-selector';

const HealthVaccination = () => {
  const [vaccinations, setVaccinations] = useState([
    {
      id: 'VAC001',
      animalId: 'COW001',
      animalName: 'Bella',
      vaccine: 'FMD Vaccine',
      dueDate: '2024-06-15',
      status: 'Due',
      lastVaccinated: '2024-03-15'
    },
    {
      id: 'VAC002',
      animalId: 'COW002',
      animalName: 'Thunder',
      vaccine: 'Brucellosis',
      dueDate: '2024-06-20',
      status: 'Overdue',
      lastVaccinated: '2023-12-20'
    },
    {
      id: 'VAC003',
      animalId: 'COW003',
      animalName: 'Daisy',
      vaccine: 'Anthrax',
      dueDate: '2024-07-01',
      status: 'Scheduled',
      lastVaccinated: '2024-01-01'
    }
  ]);

  const [healthRecords, setHealthRecords] = useState([
    {
      id: 'HEALTH001',
      animalId: 'COW003',
      animalName: 'Daisy',
      condition: 'Mastitis',
      treatment: 'Antibiotics',
      vet: 'Dr. Smith',
      date: '2024-05-20',
      status: 'Under Treatment'
    },
    {
      id: 'HEALTH002',
      animalId: 'COW004',
      animalName: 'Moo',
      condition: 'Hoof Rot',
      treatment: 'Topical Treatment',
      vet: 'Dr. Johnson',
      date: '2024-05-18',
      status: 'Recovered'
    }
  ]);

  const { toast } = useToast();

  const vaccinationStatusOptions = [
    { value: 'Scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
    { value: 'Due', label: 'Due', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Overdue', label: 'Overdue', color: 'bg-red-100 text-red-800' },
    { value: 'Completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'Cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-800' }
  ];

  const healthStatusOptions = [
    { value: 'Under Treatment', label: 'Under Treatment', color: 'bg-orange-100 text-orange-800' },
    { value: 'Recovered', label: 'Recovered', color: 'bg-green-100 text-green-800' },
    { value: 'Chronic', label: 'Chronic', color: 'bg-purple-100 text-purple-800' },
    { value: 'Monitoring', label: 'Monitoring', color: 'bg-blue-100 text-blue-800' }
  ];

  const getStatusColor = (status: string) => {
    const allOptions = [...vaccinationStatusOptions, ...healthStatusOptions];
    const option = allOptions.find(opt => opt.value === status);
    return option?.color || 'bg-gray-100 text-gray-800';
  };

  const handleVaccinationStatusChange = (vaccinationId: string, newStatus: string) => {
    setVaccinations(prev => prev.map(vac => 
      vac.id === vaccinationId ? { ...vac, status: newStatus } : vac
    ));
    
    const vaccination = vaccinations.find(v => v.id === vaccinationId);
    toast({
      title: "Vaccination Status Updated",
      description: `${vaccination?.animalName}'s ${vaccination?.vaccine} status changed to ${newStatus}`,
    });
  };

  const handleHealthStatusChange = (recordId: string, newStatus: string) => {
    setHealthRecords(prev => prev.map(record => 
      record.id === recordId ? { ...record, status: newStatus } : record
    ));
    
    const record = healthRecords.find(r => r.id === recordId);
    toast({
      title: "Health Record Updated",
      description: `${record?.animalName}'s ${record?.condition} status changed to ${newStatus}`,
    });
  };

  const handleViewVaccination = (vaccination: any) => {
    toast({
      title: "Vaccination Details",
      description: `Viewing details for ${vaccination.animalName} - ${vaccination.vaccine}`,
    });
  };

  const handleEditVaccination = (vaccination: any) => {
    toast({
      title: "Edit Vaccination",
      description: `Opening edit form for ${vaccination.animalName} - ${vaccination.vaccine}`,
    });
  };

  const handleDeleteVaccination = (vaccinationId: string) => {
    setVaccinations(prev => prev.filter(vac => vac.id !== vaccinationId));
    toast({
      title: "Vaccination Record Deleted",
      description: "Vaccination record has been removed",
    });
  };

  const handleViewHealth = (record: any) => {
    toast({
      title: "Health Record Details",
      description: `Viewing details for ${record.animalName} - ${record.condition}`,
    });
  };

  const handleEditHealth = (record: any) => {
    toast({
      title: "Edit Health Record",
      description: `Opening edit form for ${record.animalName} - ${record.condition}`,
    });
  };

  const handleDeleteHealth = (recordId: string) => {
    setHealthRecords(prev => prev.filter(record => record.id !== recordId));
    toast({
      title: "Health Record Deleted",
      description: "Health record has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Health & Vaccination</h2>
        <div className="flex space-x-2">
          <VaccinationModal />
          <HealthModal />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-sm text-gray-600">Healthy Animals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Syringe className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Due Vaccinations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">8</div>
                <div className="text-sm text-gray-600">Health Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">15</div>
                <div className="text-sm text-gray-600">Vet Visits</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Syringe className="w-5 h-5 mr-2 text-blue-600" />
              Vaccination Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccinations.map((vac) => (
                  <TableRow key={vac.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vac.animalName}</div>
                        <div className="text-sm text-gray-600">{vac.animalId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{vac.vaccine}</TableCell>
                    <TableCell>{vac.dueDate}</TableCell>
                    <TableCell>
                      <StatusSelector
                        currentStatus={vac.status}
                        options={vaccinationStatusOptions}
                        onStatusChange={(newStatus) => handleVaccinationStatusChange(vac.id, newStatus)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewVaccination(vac)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditVaccination(vac)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteVaccination(vac.id)}>
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
              <Heart className="w-5 h-5 mr-2 text-red-600" />
              Health Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.animalName}</div>
                        <div className="text-sm text-gray-600">{record.animalId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.condition}</TableCell>
                    <TableCell>{record.treatment}</TableCell>
                    <TableCell>
                      <StatusSelector
                        currentStatus={record.status}
                        options={healthStatusOptions}
                        onStatusChange={(newStatus) => handleHealthStatusChange(record.id, newStatus)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewHealth(record)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditHealth(record)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteHealth(record.id)}>
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
    </div>
  );
};

export default HealthVaccination;
