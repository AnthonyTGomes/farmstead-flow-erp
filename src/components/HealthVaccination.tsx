import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Syringe, Calendar, Eye, Edit, Trash2, CheckCircle, Search, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import VaccinationModal from '@/components/modals/VaccinationModal';
import HealthModal from '@/components/modals/HealthModal';
import CompleteVaccinationModal from '@/components/modals/CompleteVaccinationModal';
import CompleteHealthModal from '@/components/modals/CompleteHealthModal';
import ViewVaccinationModal from '@/components/modals/ViewVaccinationModal';
import ViewHealthModal from '@/components/modals/ViewHealthModal';
import StatusSelector from '@/components/ui/status-selector';
import { usePagination } from '@/hooks/usePagination';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HealthVaccination = () => {
  const [vaccinationSchedules, setVaccinationSchedules] = useState([
    {
      id: 'VAC001',
      animalId: 'COW001',
      animalName: 'Bella',
      vaccine: 'FMD Vaccine',
      dueDate: '2024-06-15',
      status: 'Due',
      notes: 'Annual vaccination due'
    },
    {
      id: 'VAC002',
      animalId: 'COW002',
      animalName: 'Daisy',
      vaccine: 'Brucellosis',
      dueDate: '2024-06-10',
      status: 'Overdue',
      notes: 'Urgent - overdue by 5 days'
    }
  ]);

  const [healthRecords, setHealthRecords] = useState([
    {
      id: 'HEALTH001',
      animalId: 'COW001',
      animalName: 'Bella',
      checkupType: 'Routine Checkup',
      date: '2024-05-28',
      status: 'Healthy',
      temperature: '38.5°C',
      notes: 'All vitals normal'
    },
    {
      id: 'HEALTH002',
      animalId: 'COW003',
      animalName: 'Luna',
      checkupType: 'Sick Visit',
      date: '2024-05-26',
      status: 'Under Treatment',
      temperature: '39.8°C',
      notes: 'Fever, started antibiotics'
    }
  ]);

  const [vaccinationSearchTerm, setVaccinationSearchTerm] = useState('');
  const [vaccinationStatusFilter, setVaccinationStatusFilter] = useState('all');
  const [healthSearchTerm, setHealthSearchTerm] = useState('');
  const [healthStatusFilter, setHealthStatusFilter] = useState('all');
  const [viewVaccinationModalOpen, setViewVaccinationModalOpen] = useState(false);
  const [viewHealthModalOpen, setViewHealthModalOpen] = useState(false);
  const [completeVaccinationModalOpen, setCompleteVaccinationModalOpen] = useState(false);
  const [completeHealthModalOpen, setCompleteHealthModalOpen] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [selectedHealth, setSelectedHealth] = useState(null);
  const { toast } = useToast();

  const vaccinationStatusOptions = [
    { value: 'Scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
    { value: 'Due', label: 'Due', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Overdue', label: 'Overdue', color: 'bg-red-100 text-red-800' },
    { value: 'Completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'Cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-800' }
  ];

  const healthStatusOptions = [
    { value: 'Healthy', label: 'Healthy', color: 'bg-green-100 text-green-800' },
    { value: 'Sick', label: 'Sick', color: 'bg-red-100 text-red-800' },
    { value: 'Under Treatment', label: 'Under Treatment', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Recovered', label: 'Recovered', color: 'bg-blue-100 text-blue-800' },
    { value: 'Monitoring', label: 'Monitoring', color: 'bg-purple-100 text-purple-800' }
  ];

  const filteredVaccinationSchedules = vaccinationSchedules.filter(schedule => {
    const matchesSearch = schedule.animalName.toLowerCase().includes(vaccinationSearchTerm.toLowerCase()) ||
                         schedule.animalId.toLowerCase().includes(vaccinationSearchTerm.toLowerCase()) ||
                         schedule.vaccine.toLowerCase().includes(vaccinationSearchTerm.toLowerCase());
    const matchesStatus = vaccinationStatusFilter === 'all' || schedule.status === vaccinationStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredHealthRecords = healthRecords.filter(record => {
    const matchesSearch = record.animalName.toLowerCase().includes(healthSearchTerm.toLowerCase()) ||
                         record.animalId.toLowerCase().includes(healthSearchTerm.toLowerCase()) ||
                         record.checkupType.toLowerCase().includes(healthSearchTerm.toLowerCase());
    const matchesStatus = healthStatusFilter === 'all' || record.status === healthStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const { 
    currentPage: vaccinationCurrentPage, 
    totalPages: vaccinationTotalPages, 
    paginatedData: paginatedVaccinationData, 
    goToNext: vaccinationGoToNext, 
    goToPrevious: vaccinationGoToPrevious, 
    hasNext: vaccinationHasNext, 
    hasPrevious: vaccinationHasPrevious,
    goToPage: vaccinationGoToPage
  } = usePagination({ data: filteredVaccinationSchedules, itemsPerPage: 5 });

  const { 
    currentPage: healthCurrentPage, 
    totalPages: healthTotalPages, 
    paginatedData: paginatedHealthData, 
    goToNext: healthGoToNext, 
    goToPrevious: healthGoToPrevious, 
    hasNext: healthHasNext, 
    hasPrevious: healthHasPrevious,
    goToPage: healthGoToPage
  } = usePagination({ data: filteredHealthRecords, itemsPerPage: 5 });

  const handleVaccinationStatusChange = (scheduleId: string, newStatus: string) => {
    setVaccinationSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId ? { ...schedule, status: newStatus } : schedule
    ));
    
    const schedule = vaccinationSchedules.find(s => s.id === scheduleId);
    toast({
      title: "Vaccination Status Updated",
      description: `${schedule?.animalName}'s vaccination status changed to ${newStatus}`,
    });
  };

  const handleHealthStatusChange = (recordId: string, newStatus: string) => {
    setHealthRecords(prev => prev.map(record => 
      record.id === recordId ? { ...record, status: newStatus } : record
    ));
    
    const record = healthRecords.find(r => r.id === recordId);
    toast({
      title: "Health Status Updated",
      description: `${record?.animalName}'s health status changed to ${newStatus}`,
    });
  };

  const handleCompleteVaccination = (schedule: any) => {
    setSelectedVaccination(schedule);
    setCompleteVaccinationModalOpen(true);
  };

  const handleCompleteHealth = (record: any) => {
    setSelectedHealth(record);
    setCompleteHealthModalOpen(true);
  };

  const handleVaccinationComplete = (scheduleId: string, data: any) => {
    setVaccinationSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId ? { ...schedule, ...data } : schedule
    ));
  };

  const handleHealthComplete = (recordId: string, data: any) => {
    setHealthRecords(prev => prev.map(record => 
      record.id === recordId ? { ...record, ...data } : record
    ));
  };

  const handleViewVaccination = (schedule: any) => {
    setSelectedVaccination(schedule);
    setViewVaccinationModalOpen(true);
  };

  const handleViewHealth = (record: any) => {
    setSelectedHealth(record);
    setViewHealthModalOpen(true);
  };

  const handleEditVaccination = (schedule: any) => {
    console.log('Editing vaccination:', schedule);
    toast({
      title: "Edit Vaccination",
      description: `Opening edit form for ${schedule.animalName}`,
    });
  };

  const handleDeleteVaccination = (scheduleId: string) => {
    setVaccinationSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
    toast({
      title: "Vaccination Deleted",
      description: "Vaccination schedule has been removed",
    });
  };

  const handleEditHealth = (record: any) => {
    console.log('Editing health record:', record);
    toast({
      title: "Edit Health Record",
      description: `Opening edit form for ${record.animalName}`,
    });
  };

  const handleDeleteHealth = (recordId: string) => {
    setHealthRecords(prev => prev.filter(record => record.id !== recordId));
    toast({
      title: "Health Record Deleted",
      description: "Health record has been removed",
    });
  };

  const canCompleteVaccination = (status: string) => {
    return ['Due', 'Overdue', 'Scheduled'].includes(status);
  };

  const canCompleteHealth = (status: string) => {
    return ['Sick', 'Under Treatment'].includes(status);
  };

  // Remove empty/falsy status from list of filter statuses
  const uniqueVaccinationStatuses = [
    ...new Set(
      vaccinationSchedules.map(schedule => schedule.status).filter(Boolean).filter(s => s.trim() !== '')
    ),
  ];
  const uniqueHealthStatuses = [
    ...new Set(
      healthRecords.map(record => record.status).filter(Boolean).filter(s => s.trim() !== '')
    ),
  ];

  const getStatusColor = (status: string) => {
    const vaccinationOption = vaccinationStatusOptions.find(opt => opt.value === status);
    if (vaccinationOption) return vaccinationOption.color || 'bg-gray-100 text-gray-800';
  
    const healthOption = healthStatusOptions.find(opt => opt.value === status);
    if (healthOption) return healthOption.color || 'bg-gray-100 text-gray-800';
  
    return 'bg-gray-100 text-gray-800';
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
              <Syringe className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Due Vaccinations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Sick Animals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">85</div>
                <div className="text-sm text-gray-600">Healthy Animals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">%</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">96%</div>
                <div className="text-sm text-gray-600">Health Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Syringe className="w-5 h-5 mr-2 text-blue-600" />
                Vaccination Schedule
              </CardTitle>
              {/* Filter group - new UI for usability and responsiveness */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 bg-muted/50 rounded-lg p-3 items-stretch md:items-center border">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search vaccinations..."
                    value={vaccinationSearchTerm}
                    onChange={(e) => setVaccinationSearchTerm(e.target.value)}
                    className="pl-10 w-full md:w-48"
                  />
                </div>
                <div className="flex-1">
                  <Select value={vaccinationStatusFilter} onValueChange={setVaccinationStatusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {uniqueVaccinationStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button 
                  className="flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold bg-primary text-white rounded-md hover:scale-105 transition-transform shadow-sm border border-primary"
                  tabIndex={-1}
                  type="button"
                  title="Filter"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVaccinationData.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{schedule.animalName}</div>
                        <div className="text-sm text-gray-600">{schedule.animalId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{schedule.vaccine}</TableCell>
                    <TableCell>{schedule.dueDate}</TableCell>
                    <TableCell>
                      <StatusSelector
                        currentStatus={schedule.status}
                        options={vaccinationStatusOptions}
                        onStatusChange={(newStatus) => handleVaccinationStatusChange(schedule.id, newStatus)}
                        readOnly={canCompleteVaccination(schedule.status)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-1">
                        {canCompleteVaccination(schedule.status) && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleCompleteVaccination(schedule)}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleViewVaccination(schedule)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditVaccination(schedule)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteVaccination(schedule.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {vaccinationTotalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={vaccinationGoToPrevious}
                        className={!vaccinationHasPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: vaccinationTotalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => vaccinationGoToPage(page)}
                          isActive={vaccinationCurrentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={vaccinationGoToNext}
                        className={!vaccinationHasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                Health Records
              </CardTitle>
              {/* Filter group - new UI for usability and responsiveness */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 bg-muted/50 rounded-lg p-3 items-stretch md:items-center border">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search health..."
                    value={healthSearchTerm}
                    onChange={(e) => setHealthSearchTerm(e.target.value)}
                    className="pl-10 w-full md:w-40"
                  />
                </div>
                <div className="flex-1">
                  <Select value={healthStatusFilter} onValueChange={setHealthStatusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {uniqueHealthStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button 
                  className="flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold bg-primary text-white rounded-md hover:scale-105 transition-transform shadow-sm border border-primary"
                  tabIndex={-1}
                  type="button"
                  title="Filter"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedHealthData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.animalName}</div>
                        <div className="text-sm text-gray-600">{record.animalId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.checkupType}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <StatusSelector
                        currentStatus={record.status}
                        options={healthStatusOptions}
                        onStatusChange={(newStatus) => handleHealthStatusChange(record.id, newStatus)}
                        readOnly={canCompleteHealth(record.status)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-1">
                        {canCompleteHealth(record.status) && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleCompleteHealth(record)}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
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
            
            {healthTotalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={healthGoToPrevious}
                        className={!healthHasPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: healthTotalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => healthGoToPage(page)}
                          isActive={healthCurrentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={healthGoToNext}
                        className={!healthHasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ViewVaccinationModal 
        open={viewVaccinationModalOpen}
        onOpenChange={setViewVaccinationModalOpen}
        schedule={selectedVaccination}
      />

      <ViewHealthModal 
        open={viewHealthModalOpen}
        onOpenChange={setViewHealthModalOpen}
        record={selectedHealth}
      />

      <CompleteVaccinationModal
        open={completeVaccinationModalOpen}
        onOpenChange={setCompleteVaccinationModalOpen}
        schedule={selectedVaccination}
        onComplete={handleVaccinationComplete}
      />

      <CompleteHealthModal
        open={completeHealthModalOpen}
        onOpenChange={setCompleteHealthModalOpen}
        record={selectedHealth}
        onComplete={handleHealthComplete}
      />
    </div>
  );
};

export default HealthVaccination;
