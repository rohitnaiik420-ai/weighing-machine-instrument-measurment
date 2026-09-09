import React, { useState, useEffect } from 'react';
import { getApplicationsByOfficer, getUserById, getInstrumentById } from '../../data/services';
import { useApp } from '../../context/AppContext';
import { Search, Filter, MapPin } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import FieldVerification from './FieldVerification';
import DocumentReview from './DocumentReview';
import DecisionPanel from './DecisionPanel';

export default function AssignedQueue() {
  const { user } = useApp();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchApps = async () => {
    setLoading(true);
    try {
      const apps = await getApplicationsByOfficer(user.id);
      // Enhance apps with mock data for display if missing
      const enhancedApps = apps.map(app => ({
        ...app,
        applicantName: app.applicantName || 'Test Applicant',
        instrumentType: app.instrumentType || 'Weighing Scale',
        location: app.location || 'Central Market'
      }));
      setApplications(enhancedApps || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [user.id]);

  const handleActionComplete = () => {
    setSelectedApp(null);
    fetchApps();
  };

  const filteredApps = applications.filter(app => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        app.id.toLowerCase().includes(query) ||
        (app.applicantName && app.applicantName.toLowerCase().includes(query)) ||
        (app.instrumentType && app.instrumentType.toLowerCase().includes(query))
      );
    }
    return true;
  });

  if (selectedApp) {
    return (
      <div className="p-6">
        <button onClick={() => setSelectedApp(null)} className="mb-4 text-brand-blue hover:underline">
          &larr; Back to Queue
        </button>
        {selectedApp.status === 'officer_assigned' && <FieldVerification application={selectedApp} onComplete={handleActionComplete} />}
        {selectedApp.status === 'field_verification' && <DocumentReview application={selectedApp} onConfirm={handleActionComplete} />}
        {selectedApp.status === 'decision' && <DecisionPanel application={selectedApp} onDecision={handleActionComplete} />}
        {['verified', 'rejected'].includes(selectedApp.status) && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Application Already Processed</h2>
            <p>This application is currently marked as <StatusBadge status={selectedApp.status} />.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-navy-600">Assigned Queue</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, Applicant, or Instrument..." 
            className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-brand-blue outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-500" size={18} />
          <select 
            className="border p-2 rounded focus:ring-2 focus:ring-brand-blue outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="officer_assigned">Assigned</option>
            <option value="field_verification">Document Review</option>
            <option value="decision">Pending Decision</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading queue...</div>
      ) : (
        <div className="grid gap-4">
          {filteredApps.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-center text-gray-500">No applications match your criteria.</div>
          ) : (
            filteredApps.map(app => (
              <div key={app.id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-gray-500">{app.id}</span>
                    <StatusBadge status={app.status} />
                  </div>
                  <h3 className="font-semibold text-lg">{app.applicantName}</h3>
                  <div className="text-sm text-gray-600 flex items-center space-x-4">
                    <span>{app.instrumentType}</span>
                    <span className="flex items-center"><MapPin size={14} className="mr-1" /> {app.location}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Scheduled: {app.scheduleDate ? new Date(app.scheduleDate).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button 
                    onClick={() => setSelectedApp(app)}
                    className="px-4 py-2 bg-navy-600 text-white rounded hover:bg-navy-700 transition-colors"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
