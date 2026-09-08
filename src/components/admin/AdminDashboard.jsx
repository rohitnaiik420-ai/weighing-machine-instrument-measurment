import React from 'react';
import { useApp } from '../../context/AppContext';
import KPIRow from './KPIRow';
import Charts from './Charts';
import { Database, ScrollText, Users, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const { setActiveView } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-600">Admin Dashboard</h1>
      </div>
      
      <KPIRow />
      <Charts />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div 
          onClick={() => setActiveView('registry')}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-blue/10 rounded-lg text-brand-blue">
              <Database size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Instrument Registry</h3>
              <p className="text-sm text-gray-500">View all registered instruments</p>
            </div>
          </div>
          <ArrowRight className="text-gray-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" size={20} />
        </div>

        <div 
          onClick={() => setActiveView('audit')}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-blue/10 rounded-lg text-brand-blue">
              <ScrollText size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Audit Log</h3>
              <p className="text-sm text-gray-500">Track system activities</p>
            </div>
          </div>
          <ArrowRight className="text-gray-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" size={20} />
        </div>

        <div 
          onClick={() => setActiveView('users')}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-brand-blue/10 rounded-lg text-brand-blue">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">User Management</h3>
              <p className="text-sm text-gray-500">Manage roles and access</p>
            </div>
          </div>
          <ArrowRight className="text-gray-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" size={20} />
        </div>
      </div>
    </div>
  );
}
