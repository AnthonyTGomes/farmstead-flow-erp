
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, FileText, Heart } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add New Animal',
      description: 'Register a new animal to your inventory',
      icon: Plus,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Schedule Vaccination',
      description: 'Set up vaccination appointments',
      icon: Calendar,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Record Production',
      description: 'Log daily milk or meat production',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: 'Health Check',
      description: 'Record animal health observations',
      icon: Heart,
      color: 'bg-red-600 hover:bg-red-700',
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color} text-white`}
              >
                <Icon className="w-8 h-8" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
