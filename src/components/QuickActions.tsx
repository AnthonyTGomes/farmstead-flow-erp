
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, FileText, Heart } from 'lucide-react';
import AddAnimalModal from '@/components/modals/AddAnimalModal';
import VaccinationModal from '@/components/modals/VaccinationModal';
import ProductionModal from '@/components/modals/ProductionModal';
import HealthModal from '@/components/modals/HealthModal';

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
            <HealthModal />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
