
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, FileText, Heart } from 'lucide-react';
import AddAnimalModal from '@/components/modals/AddAnimalModal';
import VaccinationModal from '@/components/modals/VaccinationModal';
import ProductionModal from '@/components/modals/ProductionModal';

const QuickActions = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center space-y-2 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <AddAnimalModal />
          </div>
          
          <div className="flex flex-col items-center space-y-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <VaccinationModal />
          </div>
          
          <div className="flex flex-col items-center space-y-2 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
            <ProductionModal />
          </div>
          
          <div className="flex flex-col items-center space-y-2 p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold text-sm">Health Check</div>
                <div className="text-xs opacity-90">Record animal health observations</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
