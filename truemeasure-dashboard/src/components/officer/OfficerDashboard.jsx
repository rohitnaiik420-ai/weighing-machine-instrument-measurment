import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getApplicationsByOfficer } from '../../data/services';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';
import { ClipboardList, Clock, CheckCircle, Calendar, ArrowRight } from 'lucide-react';

export default function OfficerDashboard() {
  const { user, setActiveView } = useApp();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const apps = await getApplicationsByOfficer(user.id);
        setApplications(apps || []);
      } catch (err) {
        console.error('Failed to fetch officer applications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [user.id]);

  if (loading) return <div className="p-4">Loading dashboard...</div>;

  const todayStr = new Date().toISOString().split('T')[0];
  const assignedToday = applications.filter(app => app.scheduleDate && app.scheduleDate.startsWith(todayStr));
  const pendingVerification = applications.filter(app => app.status === 'officer_assigned' || app.status === 'field_verification');
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const completedThisWeek = applications.filter(app => {
    if (app.status !== 'verified' && app.status !== 'rejected') return false;
    const updateDate = new Date(app.updatedAt || app.createdAt);
    return updateDate >= oneWeekAgo;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-navy-600">Officer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Today" value={assignedToday.length} icon={<ClipboardList className="text-brand-blue" />} color="blue" />
        <StatCard title="Pending Verification" value={pendingVerification.length} icon={<Clock className="text-status-pending" />} color="amber" />
        <StatCard title="Completed This Week" value={completedThisWeek.length} icon={<CheckCircle className="text-status-verified" />} color="green" />
        <StatCard title="Total Assigned" value={applications.length} icon={<Calendar className="text-navy-600" />} color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-navy-600">Today's Assignments</h2>
          {assignedToday.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-gray-500">No assignments scheduled for today.</div>
          ) : (
            <div className="space-y-4">
              {assignedToday.map(app => (
                <div key={app.id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center justify-between border-l-4 border-brand-blue">
                  <div>
                    <h3 className="font-semibold text-gray-800">{app.applicantName || 'Unknown Applicant'}</h3>
                    <p className="text-sm text-gray-600">{app.instrumentType || 'Instrument'} - {app.location || 'Location not specified'}</p>
                    <div className="mt-2"><StatusBadge status={app.status} /></div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button 
                      onClick={() => setActiveView('Queue')}
                      className="btn-primary flex items-center space-x-2 text-sm px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-700"
                    >
                      <span>Start Verification</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-navy-600">Quick Actions</h2>
          <div className="bg-white p-4 rounded shadow space-y-3">
            <button 
              onClick={() => setActiveView('Queue')}
              className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50 text-left"
            >
              <div className="flex items-center space-x-3">
                <ClipboardList className="text-brand-blue" size={20} />
                <span className="font-medium">View Full Queue</span>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
            <button 
              onClick={() => setActiveView('Schedule')}
              className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50 text-left"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="text-navy-600" size={20} />
                <span className="font-medium">View Schedule</span>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
