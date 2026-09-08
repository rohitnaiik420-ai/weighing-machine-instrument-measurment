import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getInstrumentsByOwner, getApplicationsByApplicant, getCertificatesByOwner } from '../../data/services';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';
import { Scale, FileText, Award, AlertTriangle, Plus, ArrowRight, Clock } from 'lucide-react';
import { formatDate, daysUntil } from '../../utils/helpers';

export default function ApplicantDashboard() {
  const { currentUser, setActiveView, refreshKey } = useApp();
  const [instruments, setInstruments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [inst, apps, certs] = await Promise.all([
        getInstrumentsByOwner(currentUser.id),
        getApplicationsByApplicant(currentUser.id),
        getCertificatesByOwner(currentUser.id),
      ]);
      setInstruments(inst);
      setApplications(apps);
      setCertificates(certs);
      setLoading(false);
    }
    load();
  }, [currentUser.id, refreshKey]);

  const pendingApps = applications.filter((a) => !['certified', 'rejected'].includes(a.status));
  const activeCerts = certificates.filter((c) => c.status === 'active' || c.status === 'expiring');
  const expiringSoon = certificates.filter((c) => {
    const d = daysUntil(c.expiryDate);
    return d !== null && d > 0 && d <= 60;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-navy-600">Welcome, {currentUser.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{currentUser.businessName} — Instrument Verification Dashboard</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Scale} label="My Instruments" value={instruments.length} color="bg-blue-100 text-blue-600" />
        <StatCard icon={FileText} label="Pending Applications" value={pendingApps.length} color="bg-amber-100 text-amber-600" />
        <StatCard icon={Award} label="Active Certificates" value={activeCerts.length} color="bg-green-100 text-green-600" />
        <StatCard icon={AlertTriangle} label="Expiring Soon" value={expiringSoon.length} color="bg-red-100 text-red-600" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveView('register')}
          className="card flex items-center gap-4 hover:border-brand-blue hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-navy-600">Register New Instrument</h3>
            <p className="text-sm text-gray-500">Submit an instrument for verification</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-blue transition-colors" />
        </button>

        <button
          onClick={() => setActiveView('applications')}
          className="card flex items-center gap-4 hover:border-brand-blue hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-navy-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-navy-600">Track Applications</h3>
            <p className="text-sm text-gray-500">View status of all your applications</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-blue transition-colors" />
        </button>
      </div>

      {/* Recent Applications */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-600">Recent Applications</h2>
          <button onClick={() => setActiveView('applications')} className="text-sm text-brand-blue hover:underline font-medium">
            View All →
          </button>
        </div>
        {applications.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No applications yet. Register an instrument to get started.</p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => {
              const inst = instruments.find((i) => i.id === app.instrumentId);
              return (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center">
                      <Scale className="w-5 h-5 text-navy-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{inst?.type || 'Unknown Instrument'}</p>
                      <p className="text-xs text-gray-500">{app.id} • {formatDate(app.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={app.status} />
                    {app.scheduleDate && (
                      <span className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(app.scheduleDate)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
