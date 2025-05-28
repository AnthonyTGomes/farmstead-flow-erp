
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertTriangle, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'urgent',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      title: 'Sick Animal Alert',
      description: 'Cow #245 showing signs of illness',
      action: 'Contact Vet',
    },
    {
      id: 2,
      type: 'scheduled',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      title: 'Vaccination Due',
      description: '15 animals due for vaccination this week',
      action: 'Schedule',
    },
    {
      id: 3,
      type: 'breeding',
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      title: 'Breeding Reminder',
      description: 'Cow #242 ready for artificial insemination',
      action: 'Plan Breeding',
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-gray-600" />
          Alerts & Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${alert.bgColor}`}>
                    <Icon className={`w-4 h-4 ${alert.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{alert.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                    <Button 
                      size="sm" 
                      className={`mt-2 text-xs ${
                        alert.type === 'urgent' 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
