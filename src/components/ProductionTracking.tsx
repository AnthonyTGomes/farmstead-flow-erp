import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Milk, Beef, TrendingUp, Plus, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProductionModal from '@/components/modals/ProductionModal';
import FeedModal from '@/components/modals/FeedModal';

const ProductionTracking = () => {
  const [milkRecords] = useState([
    {
      animalId: 'COW001',
      animalName: 'Bella',
      date: '2024-05-28',
      morning: '12.5 L',
      evening: '11.2 L',
      total: '23.7 L',
      quality: 'A'
    },
    {
      animalId: 'COW002',
      animalName: 'Luna',
      date: '2024-05-28',
      morning: '15.8 L',
      evening: '14.1 L',
      total: '29.9 L',
      quality: 'A+'
    },
    {
      animalId: 'COW003',
      animalName: 'Daisy',
      date: '2024-05-28',
      morning: '8.3 L',
      evening: '7.9 L',
      total: '16.2 L',
      quality: 'B'
    }
  ]);

  const [feedRecords] = useState([
    {
      date: '2024-05-28',
      feedType: 'Hay',
      quantity: '250 kg',
      cost: '$125',
      supplier: 'Green Valley Farm'
    },
    {
      date: '2024-05-28',
      feedType: 'Concentrate',
      quantity: '100 kg',
      cost: '$180',
      supplier: 'Feed Master Ltd'
    },
    {
      date: '2024-05-27',
      feedType: 'Silage',
      quantity: '300 kg',
      cost: '$90',
      supplier: 'Local Co-op'
    }
  ]);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-yellow-100 text-yellow-800';
      case 'C': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Production Tracking</h2>
        <div className="flex space-x-2">
          <ProductionModal />
          <FeedModal />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Milk className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">1,450L</div>
                <div className="text-sm text-gray-600">Today's Milk</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">+5%</div>
                <div className="text-sm text-gray-600">Weekly Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Beef className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">18.5</div>
                <div className="text-sm text-gray-600">Avg L/Animal</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Quality Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Milk className="w-5 h-5 mr-2 text-blue-600" />
              Daily Milk Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Morning</TableHead>
                  <TableHead>Evening</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Quality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {milkRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.animalName}</div>
                        <div className="text-sm text-gray-600">{record.animalId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.morning}</TableCell>
                    <TableCell>{record.evening}</TableCell>
                    <TableCell className="font-medium">{record.total}</TableCell>
                    <TableCell>
                      <Badge className={getQualityColor(record.quality)}>
                        {record.quality}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Today:</span>
                <span className="text-xl font-bold text-blue-600">69.8 L</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Beef className="w-5 h-5 mr-2 text-green-600" />
              Feed Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedRecords.map((feed, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{feed.feedType}</div>
                      <div className="text-sm text-gray-600">{feed.supplier}</div>
                      <div className="text-sm text-gray-500">{feed.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{feed.quantity}</div>
                      <div className="text-sm text-green-600">{feed.cost}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Daily Cost:</span>
                <span className="text-lg font-bold text-green-600">$395</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionTracking;
