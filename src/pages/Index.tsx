
import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DashboardStats from '@/components/DashboardStats';
import RecentActivity from '@/components/RecentActivity';
import AlertsPanel from '@/components/AlertsPanel';
import QuickActions from '@/components/QuickActions';
import LivestockInventory from '@/components/LivestockInventory';
import HealthVaccination from '@/components/HealthVaccination';
import BreedingReproduction from '@/components/BreedingReproduction';
import ProductionTracking from '@/components/ProductionTracking';
import FinancialManagement from '@/components/FinancialManagement';
import ReportsAnalytics from '@/components/ReportsAnalytics';
import FarmSettings from '@/components/FarmSettings';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, Mr. Moti!</h2>
              <p className="text-green-100">Here's what's happening on your farm today</p>
            </div>

            {/* Dashboard Stats */}
            <DashboardStats />

            {/* Quick Actions */}
            <QuickActions />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>

              {/* Alerts Panel */}
              <div>
                <AlertsPanel />
              </div>
            </div>
          </div>
        );
      case 'livestock':
        return <LivestockInventory />;
      case 'health':
        return <HealthVaccination />;
      case 'breeding':
        return <BreedingReproduction />;
      case 'production':
        return <ProductionTracking />;
      case 'financial':
        return <FinancialManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <FarmSettings />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
              {activeModule.replace('-', ' & ')} Module
            </h2>
            <p className="text-gray-600 mb-6">
              This module is under development. Full functionality coming soon!
            </p>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Module In Development</h3>
              <p className="text-gray-600">We're working hard to bring you this feature. Stay tuned!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-600">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🐄</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LivestockPro ERP</h1>
                <p className="text-sm text-gray-600">Farm Management System</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">MM</span>
              </div>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className={`lg:w-64 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderActiveModule()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
