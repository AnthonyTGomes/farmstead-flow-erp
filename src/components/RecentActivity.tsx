
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Heart, TrendingUp } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'health',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      title: 'Vaccination completed',
      description: 'Cow #247 received FMD vaccination',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'production',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      title: 'Milk production recorded',
      description: '45L collected from morning session',
      time: '4 hours ago',
    },
    {
      id: 3,
      type: 'livestock',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'New animal registered',
      description: 'Holstein cow #248 added to inventory',
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'health',
      icon: Heart,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'Health check completed',
      description: 'All animals in Pen A checked - healthy',
      time: '2 days ago',
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
