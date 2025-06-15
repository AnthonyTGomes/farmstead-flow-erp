import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Milk, Beef, TrendingUp, Plus, Calendar, Search, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProductionModal from '@/components/modals/ProductionModal';
import FeedModal from '@/components/modals/FeedModal';
import { usePagination } from '@/hooks/usePagination';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const [milkSearchTerm, setMilkSearchTerm] = useState('');
  const [milkQualityFilter, setMilkQualityFilter] = useState('');
  const [feedSearchTerm, setFeedSearchTerm] = useState('');
  const [feedTypeFilter, setFeedTypeFilter] = useState('');

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-yellow-100 text-yellow-800';
      case 'C': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMilkRecords = milkRecords.filter(record => {
    const matchesSearch = record.animalName.toLowerCase().includes(milkSearchTerm.toLowerCase()) ||
                         record.animalId.toLowerCase().includes(milkSearchTerm.toLowerCase());
    const matchesQuality = milkQualityFilter === '' || record.quality === milkQualityFilter;
    return matchesSearch && matchesQuality;
  });

  const filteredFeedRecords = feedRecords.filter(record => {
    const matchesSearch = record.feedType.toLowerCase().includes(feedSearchTerm.toLowerCase()) ||
                         record.supplier.toLowerCase().includes(feedSearchTerm.toLowerCase());
    const matchesType = feedTypeFilter === '' || record.feedType === feedTypeFilter;
    return matchesSearch && matchesType;
  });

  const { 
    currentPage: milkCurrentPage, 
    totalPages: milkTotalPages, 
    paginatedData: paginatedMilkData, 
    goToNext: milkGoToNext, 
    goToPrevious: milkGoToPrevious, 
    hasNext: milkHasNext, 
    hasPrevious: milkHasPrevious,
    goToPage: milkGoToPage
  } = usePagination({ data: filteredMilkRecords, itemsPerPage: 5 });

  const { 
    currentPage: feedCurrentPage, 
    totalPages: feedTotalPages, 
    paginatedData: paginatedFeedData, 
    goToNext: feedGoToNext, 
    goToPrevious: feedGoToPrevious, 
    hasNext: feedHasNext, 
    hasPrevious: feedHasPrevious,
    goToPage: feedGoToPage
  } = usePagination({ data: filteredFeedRecords, itemsPerPage: 5 });

  const uniqueQualities = [...new Set(milkRecords.map(record => record.quality))];
  const uniqueFeedTypes = [...new Set(feedRecords.map(record => record.feedType))];

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
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Milk className="w-5 h-5 mr-2 text-blue-600" />
                Daily Milk Production
              </CardTitle>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search animals..."
                    value={milkSearchTerm}
                    onChange={(e) => setMilkSearchTerm(e.target.value)}
                    className="pl-10 w-48"
                  />
                </div>
                <Select value={milkQualityFilter} onValueChange={setMilkQualityFilter}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    {uniqueQualities.map(quality => (
                      <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                {paginatedMilkData.map((record, index) => (
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
            
            {milkTotalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={milkGoToPrevious}
                        className={!milkHasPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: milkTotalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => milkGoToPage(page)}
                          isActive={milkCurrentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={milkGoToNext}
                        className={!milkHasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
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
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Beef className="w-5 h-5 mr-2 text-green-600" />
                Feed Consumption
              </CardTitle>
              <div className="flex flex-col space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search feed..."
                    value={feedSearchTerm}
                    onChange={(e) => setFeedSearchTerm(e.target.value)}
                    className="pl-10 w-40"
                  />
                </div>
                <Select value={feedTypeFilter} onValueChange={setFeedTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Feed Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {uniqueFeedTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedFeedData.map((feed, index) => (
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
            
            {feedTotalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={feedGoToPrevious}
                        className={!feedHasPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: feedTotalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => feedGoToPage(page)}
                          isActive={feedCurrentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={feedGoToNext}
                        className={!feedHasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
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
