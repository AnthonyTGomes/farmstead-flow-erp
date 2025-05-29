import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Syringe, Heart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import VaccinationModal from '@/components/modals/VaccinationModal';
import HealthModal from '@/components/modals/HealthModal';

const HealthVaccination = () => {
  const [vaccinations] = useState([
    {
      animalId: 'COW001',
      animalName: 'Bella',
      vaccine: 'FMD Vaccine',
      dueDate: '2024-06-15',
      status: 'Due',
      lastVaccinated: '2024-03-15'
    },
    {
      animalId: 'COW002',
      animalName: 'Thunder',
      vaccine: 'Brucellosis',
      dueDate: '2024-06-20',
      status: 'Overdue',
      lastVaccinated: '2023-12-20'
    },
    {
      animalId: 'COW003',
      animalName: 'Daisy',
      vaccine: 'Anthrax',
      dueDate: '2024-07-01',
      status: 'Scheduled',
      lastVaccinated: '2024-01-01'
    }
  ]);

  const [healthRecords] = useState([
    {
      animalId: 'COW003',
      animalName: 'Daisy',
      condition: 'Mastitis',
      treatment: 'Antibiotics',
      vet: 'Dr. Smith',
      date: '2024-05-20',
      status: 'Under Treatment'
    },
    {
      animalId: 'COW004',
      animalName: 'Moo',
      condition: 'Hoof Rot',
      treatment: 'Topical Treatment',
      vet: 'Dr. Johnson',
      date: '2024-05-18',
      status: 'Recovered'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Due': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Under Treatment': return 'bg-orange-100 text-orange-800';
      case 'Recovered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccinations.map((vac, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vac.animalName}</div>
                        <div className="text-sm text-gray-600">{vac.animalId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{vac.vaccine}</TableCell>
                    <TableCell>{vac.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vac.status)}>
                        {vac.status}
                      </Badge>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.animalName}</div>
                        <div className="text-sm text-gray-600">{record.animalId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.condition}</TableCell>
                    <TableCell>{record.treatment}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
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
