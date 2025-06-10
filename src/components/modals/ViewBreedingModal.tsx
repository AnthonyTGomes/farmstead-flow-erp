
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Calendar, Baby, Clock } from 'lucide-react';

interface ViewBreedingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: {
    femaleId: string;
    femaleName: string;
    maleId: string;
    maleName: string;
    breedingDate: string;
    expectedCalving: string;
    status: string;
    stage: string;
  } | null;
}

const ViewBreedingModal = ({ open, onOpenChange, record }: ViewBreedingModalProps) => {
  if (!record) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pregnant': return 'bg-purple-100 text-purple-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Breeding': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            Breeding Record
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Status Card */}
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p className="text-lg font-semibold">{record.stage}</p>
                </div>
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Parents Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 text-sm">♀</span>
                  </div>
                  Female
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{record.femaleName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ID</p>
                    <p className="font-semibold">{record.femaleId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">♂</span>
                  </div>
                  Male/Service
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Name/Service</p>
                    <p className="font-semibold">{record.maleName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ID</p>
                    <p className="font-semibold">{record.maleId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Breeding Date</p>
                    <p className="font-semibold">{record.breedingDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Baby className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Calving</p>
                    <p className="font-semibold">{record.expectedCalving}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Days Remaining</p>
                    <p className="font-semibold text-blue-600">
                      {Math.ceil((new Date(record.expectedCalving).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBreedingModal;
