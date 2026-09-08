import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getCertificatesByOwner, getInstrumentsByOwner } from '../../data/services';
import QRCodeDisplay from '../common/QRCodeDisplay';
import { formatDate, daysUntil } from '../../utils/helpers';
import { Award, Clock, Shield } from 'lucide-react';

export default function CertificateView() {
  const { currentUser, refreshKey } = useApp();
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-600">My Certificates</h1>
        <p className="text-gray-500 text-sm mt-1">{certificates.length} certificate{certificates.length !== 1 ? 's' : ''}</p>
      </div>

      {certificates.length === 0 ? (
        <div className="card text-center py-12">
          <Award className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No certificates issued yet.</p>
          <p className="text-sm text-gray-400 mt-1">Certificates are issued after successful instrument verification.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert) => {
            const inst = instruments.find((i) => i.id === cert.instrumentId);
            const days = daysUntil(cert.expiryDate);
            const expiryColor = days > 90 ? 'text-green-600 bg-green-50' : days > 30 ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';

            return (
              <div key={cert.id} className="card hover:shadow-md transition-shadow">
                {/* Certificate header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-600">{cert.id}</h3>
                      <p className="text-xs text-gray-500">{inst?.type || 'Instrument'}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${expiryColor}`}>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {days > 0 ? `${days} days left` : 'Expired'}
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <QRCodeDisplay
                  payload={cert.qrPayload}
                  title="Verification Certificate"
                  certificateId={cert.id}
                  expiryDate={cert.expiryDate}
                />

                {/* Details */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instrument:</span>
                    <span className="font-medium">{inst?.type} — {inst?.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Issued:</span>
                    <span className="font-medium">{formatDate(cert.issueDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expires:</span>
                    <span className="font-medium">{formatDate(cert.expiryDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium text-right max-w-[200px] truncate">{inst?.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
