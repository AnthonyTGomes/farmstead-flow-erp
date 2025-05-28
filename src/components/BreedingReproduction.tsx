
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Baby, Calendar, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BreedingReproduction = () => {
  const [breedingRecords] = useState([
    {
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

  const [birthRecords] = useState([
    {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pregnant': return 'bg-purple-100 text-purple-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Breeding': return 'bg-blue-100 text-blue-800';
      case 'Healthy': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Breeding & Reproduction</h2>
        <div className="flex space-x-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Heart className="w-4 h-4 mr-2" />
            Record Breeding
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Baby className="w-4 h-4 mr-2" />
            Record Birth
          </Button>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {breedingRecords.map((record, index) => (
                  <TableRow key={index}>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {birthRecords.map((record, index) => (
                  <TableRow key={index}>
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

export default BreedingReproduction;
