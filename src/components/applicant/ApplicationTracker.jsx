import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getApplicationsByApplicant, getInstrumentsByOwner } from '../../data/services';
import StepperTracker from '../common/StepperTracker';
import StatusBadge from '../common/StatusBadge';
import { getStepFromStatus, formatDate } from '../../utils/helpers';
import { FileText, ChevronDown, ChevronUp, Scale, MapPin, User, Calendar, Award } from 'lucide-react';

export default function ApplicationTracker() {
  const { currentUser, setActiveView, refreshKey } = useApp();
  const [applications, setApplications] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [apps, inst] = await Promise.all([
        getApplicationsByApplicant(currentUser.id),
        getInstrumentsByOwner(currentUser.id),
      ]);
      setApplications(apps);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-600">My Applications</h1>
          <p className="text-gray-500 text-sm mt-1">{applications.length} application{applications.length !== 1 ? 's' : ''} found</p>
        </div>
        <button onClick={() => setActiveView('register')} className="btn-primary text-sm">+ New Application</button>
      </div>

      {applications.length === 0 ? (
        <div className="card text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No applications yet.</p>
          <button onClick={() => setActiveView('register')} className="btn-primary">Register an Instrument</button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const inst = instruments.find((i) => i.id === app.instrumentId);
            const isExpanded = expanded === app.id;
            const currentStep = getStepFromStatus(app.status);

            return (
              <div key={app.id} className="card hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Scale className="w-5 h-5 text-navy-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-600">{inst?.type || 'Unknown Instrument'}</h3>
                      <p className="text-xs text-gray-500">{app.id} • Submitted {formatDate(app.createdAt)}</p>
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                {/* Stepper */}
                <div className="mb-4">
                  <StepperTracker currentStep={currentStep} status={app.status} />
                </div>

                {/* Expand/Collapse */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : app.id)}
                  className="flex items-center gap-1 text-sm text-brand-blue hover:underline font-medium"
                >
                  {isExpanded ? 'Hide' : 'Show'} Details
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {inst && (
                        <>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Scale className="w-4 h-4 text-gray-400" />
                            <span>{inst.make || ''} {inst.model || ''} — {inst.serialNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{inst.location}</span>
                          </div>
                        </>
                      )}
                      {app.assignedOfficerId && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>Officer: {app.assignedOfficerId}</span>
                        </div>
                      )}
                      {app.scheduleDate && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>Scheduled: {formatDate(app.scheduleDate)}</span>
                        </div>
                      )}
                    </div>

                    {app.fieldVerification?.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">
                        <p className="text-gray-500 font-medium mb-1">Verification Notes:</p>
                        <p className="text-gray-700">{app.fieldVerification.notes}</p>
                      </div>
                    )}

                    {app.decisionReason && (
                      <div className={`rounded-lg p-3 text-sm ${app.decision === 'verified' ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className="font-medium mb-1 ${app.decision === 'verified' ? 'text-green-700' : 'text-red-700'}">
                          Decision: {app.decision === 'verified' ? '✅ Verified' : '❌ Rejected'}
                        </p>
                        <p className="text-gray-700">{app.decisionReason}</p>
                      </div>
                    )}

                    {app.certificateId && (
                      <button
                        onClick={() => setActiveView('certificates')}
                        className="flex items-center gap-2 text-sm text-brand-blue hover:underline font-medium"
                      >
                        <Award className="w-4 h-4" /> View Certificate
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
