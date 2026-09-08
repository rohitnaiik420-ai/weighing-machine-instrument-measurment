import React, { useState, useEffect } from 'react';
import { getKPIs } from '../../data/services';
import StatCard from '../common/StatCard';
import { Scale, Clock, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react';

export default function KPIRow() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const data = await getKPIs();
        setKpis(data);
      } catch (error) {
        console.error('Failed to fetch KPIs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchKPIs();
  }, []);

  if (loading) {
    return <div className="h-28 bg-gray-100 animate-pulse rounded-xl"></div>;
  }

  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard
        title="Total Instruments"
        value={kpis.totalInstruments || 0}
        icon={<Scale className="w-6 h-6 text-blue-700" />}
        iconBg="bg-blue-100"
      />
      <StatCard
        title="Pending Verifications"
        value={kpis.pendingVerifications || 0}
        icon={<Clock className="w-6 h-6 text-amber-700" />}
        iconBg="bg-amber-100"
      />
      <StatCard
        title="Verified This Month"
        value={kpis.verifiedThisMonth || 0}
        icon={<CheckCircle className="w-6 h-6 text-green-700" />}
        iconBg="bg-green-100"
      />
      <StatCard
        title="Expiring in 30 Days"
        value={kpis.expiringIn30Days ?? kpis.expiringSoon ?? 0}
        icon={<AlertTriangle className="w-6 h-6 text-red-700" />}
        iconBg="bg-red-100"
      />
      <StatCard
        title="Active Officers"
        value={kpis.activeOfficers || 0}
        icon={<UserCheck className="w-6 h-6 text-indigo-700" />}
        iconBg="bg-indigo-100"
      />
    </div>
  );
}
