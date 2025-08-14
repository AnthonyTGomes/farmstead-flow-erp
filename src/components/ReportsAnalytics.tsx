
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart3, Download, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const ReportsAnalytics = () => {
  // Sample data for charts
  const milkProductionData = [
    { month: 'Jan', production: 42000, target: 45000 },
    { month: 'Feb', production: 38000, target: 45000 },
    { month: 'Mar', production: 47000, target: 45000 },
    { month: 'Apr', production: 49000, target: 45000 },
    { month: 'May', production: 52000, target: 45000 },
    { month: 'Jun', production: 48000, target: 45000 }
  ];

  const revenueExpenseData = [
    { month: 'Jan', revenue: 85000, expenses: 65000 },
    { month: 'Feb', revenue: 78000, expenses: 62000 },
    { month: 'Mar', revenue: 92000, expenses: 68000 },
    { month: 'Apr', revenue: 95000, expenses: 71000 },
    { month: 'May', revenue: 102000, expenses: 74000 },
    { month: 'Jun', revenue: 98000, expenses: 72000 }
  ];

  const diseaseData = [
    { disease: 'Mastitis', cases: 15, color: '#ef4444' },
    { disease: 'Lameness', cases: 8, color: '#f97316' },
    { disease: 'Respiratory', cases: 5, color: '#eab308' },
    { disease: 'Digestive', cases: 3, color: '#22c55e' },
    { disease: 'Other', cases: 2, color: '#6366f1' }
  ];

  const breedingTimelineData = [
    { month: 'Jan', pregnancies: 12, births: 8, conception: 15 },
    { month: 'Feb', pregnancies: 15, births: 10, conception: 18 },
    { month: 'Mar', pregnancies: 18, births: 12, conception: 20 },
    { month: 'Apr', pregnancies: 16, births: 15, conception: 17 },
    { month: 'May', pregnancies: 14, births: 18, conception: 16 },
    { month: 'Jun', pregnancies: 19, births: 14, conception: 22 }
  ];

  const chartConfig = {
    production: {
      label: "Production",
      color: "#3b82f6",
    },
    target: {
      label: "Target",
      color: "#ef4444",
    },
    revenue: {
      label: "Revenue",
      color: "#22c55e",
    },
    expenses: {
      label: "Expenses",
      color: "#ef4444",
    },
    pregnancies: {
      label: "Pregnancies",
      color: "#8b5cf6",
    },
    births: {
      label: "Births",
      color: "#ec4899",
    },
    conception: {
      label: "Conception",
      color: "#06b6d4",
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Farm Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">+12%</div>
                <div className="text-sm text-gray-600">YoY Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-gray-600">Animal Health</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 text-orange-600 font-bold text-2xl flex items-center justify-center">৳</div>
              <div>
                <div className="text-2xl font-bold text-orange-600">4.2K</div>
                <div className="text-sm text-gray-600">Avg Monthly Profit</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="production" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="breeding">Breeding</TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Milk Production Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={milkProductionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="production" fill="#3b82f6" name="Production (L)" />
                      <Bar dataKey="target" fill="#ef4444" name="Target (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feed Efficiency Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>Feed Conversion Ratio</span>
                    <span className="font-bold text-blue-600">1.8:1</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Cost per Liter</span>
                    <span className="font-bold text-green-600">0.45</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>Feed Quality Score</span>
                    <span className="font-bold text-purple-600">A-</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span>Daily Feed Consumption</span>
                    <span className="font-bold text-orange-600">2.4 tons</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueExpenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span>Highest Cost: Feed</span>
                    <span className="font-bold text-red-600">45% of expenses</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span>Labor Costs</span>
                    <span className="font-bold text-yellow-600">20% of expenses</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>ROI This Quarter</span>
                    <span className="font-bold text-blue-600">18.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Profit Margin</span>
                    <span className="font-bold text-green-600">28.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Vaccination Rate</span>
                    <span className="font-bold text-green-600">96%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span>Mortality Rate</span>
                    <span className="font-bold text-red-600">2.1%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>Avg Vet Visits/Month</span>
                    <span className="font-bold text-blue-600">8</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>Healthy Animals</span>
                    <span className="font-bold text-purple-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disease Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diseaseData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="cases"
                        label={({ disease, cases }) => `${disease}: ${cases}`}
                      >
                        {diseaseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Total Disease Cases: 33</p>
                  <p className="text-sm text-gray-500">Most common: Mastitis (45% of cases)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breeding" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Breeding Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>Conception Rate</span>
                    <span className="font-bold text-purple-600">89%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <span>Birth Rate</span>
                    <span className="font-bold text-pink-600">95%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>Avg Gestation Period</span>
                    <span className="font-bold text-blue-600">283 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Active Pregnancies</span>
                    <span className="font-bold text-green-600">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breeding Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={breedingTimelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="pregnancies" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Pregnancies" />
                      <Area type="monotone" dataKey="births" stackId="2" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} name="Births" />
                      <Area type="monotone" dataKey="conception" stackId="3" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="Conception" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">15 pregnancies expected this quarter</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
