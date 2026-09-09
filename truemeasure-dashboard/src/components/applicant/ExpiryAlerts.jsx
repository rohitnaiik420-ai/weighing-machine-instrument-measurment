import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getCertificatesByOwner, getInstrumentsByOwner } from '../../data/services';
import { daysUntil, formatDate } from '../../utils/helpers';
import AlertBanner from '../common/AlertBanner';
import { AlertTriangle, Clock, RefreshCw, CheckCircle, Scale } from 'lucide-react';

export default function ExpiryAlerts() {
  const { currentUser, setActiveView, refreshKey } = useApp();
  const [certificates, setCertificates] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [certs, inst] = await Promise.all([
        getCertificatesByOwner(currentUser.id),
        getInstrumentsByOwner(currentUser.id),
      ]);
      setCertificates(certs);
      setInstruments(inst);
      setLoading(false);
    }
    load();
  }, [currentUser.id, refreshKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const critical = certificates.filter((c) => { const d = daysUntil(c.expiryDate); return d !== null && d <= 30 && d > 0; });
  const warning = certificates.filter((c) => { const d = daysUntil(c.expiryDate); return d !== null && d > 30 && d <= 60; });
  const upcoming = certificates.filter((c) => { const d = daysUntil(c.expiryDate); return d !== null && d > 60 && d <= 90; });
  const expired = certificates.filter((c) => { const d = daysUntil(c.expiryDate); return d !== null && d <= 0; });
  const hasAlerts = critical.length > 0 || warning.length > 0 || upcoming.length > 0 || expired.length > 0;

  const renderAlertCard = (cert, type) => {
    const inst = instruments.find((i) => i.id === cert.instrumentId);
    const days = daysUntil(cert.expiryDate);
    const colors = {
      critical: 'border-red-200 bg-red-50',
      expired: 'border-gray-300 bg-gray-50',
      warning: 'border-amber-200 bg-amber-50',
      upcoming: 'border-blue-200 bg-blue-50',
    };

    return (
      <div key={cert.id} className={`rounded-lg border p-4 ${colors[type]}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">{inst?.type || 'Instrument'}</p>
              <p className="text-xs text-gray-500">{cert.id} • {inst?.serialNumber}</p>
              <p className="text-xs text-gray-500 mt-1">
                Expires: {formatDate(cert.expiryDate)}
                {days > 0 ? ` (${days} days)` : ' (Expired)'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('register')}
            className="flex items-center gap-1 text-xs font-semibold text-brand-blue bg-white px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex-shrink-0"
          >
            <RefreshCw className="w-3 h-3" /> Re-Verify
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-600">Expiry Alerts & Reminders</h1>
        <p className="text-gray-500 text-sm mt-1">Stay on top of certificate expirations and re-verification deadlines</p>
      </div>

      {!hasAlerts ? (
        <AlertBanner type="success" message="All your certificates are valid and not expiring soon. You're all set!" />
      ) : (
        <div className="space-y-6">
          {/* Expired */}
          {expired.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-600">Expired ({expired.length})</h2>
              </div>
              <div className="space-y-3">
                {expired.map((c) => renderAlertCard(c, 'expired'))}
              </div>
            </div>
          )}

          {/* Critical */}
          {critical.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-semibold text-red-600">Critical — Expiring in 30 Days ({critical.length})</h2>
              </div>
              <div className="space-y-3">
                {critical.map((c) => renderAlertCard(c, 'critical'))}
              </div>
            </div>
          )}

          {/* Warning */}
          {warning.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-amber-600">Warning — Expiring in 30–60 Days ({warning.length})</h2>
              </div>
              <div className="space-y-3">
                {warning.map((c) => renderAlertCard(c, 'warning'))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-blue-600">Upcoming — Expiring in 60–90 Days ({upcoming.length})</h2>
              </div>
              <div className="space-y-3">
                {upcoming.map((c) => renderAlertCard(c, 'upcoming'))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
