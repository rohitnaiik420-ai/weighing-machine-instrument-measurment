import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal';
import { submitDecision } from '../../data/services';
import { useApp } from '../../context/AppContext';

export default function DecisionPanel({ application, onDecision }) {
  const { addNotification } = useApp();
  const [modalType, setModalType] = useState(null); // 'verify' or 'reject'
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDecision = async (decision) => {
    setLoading(true);
    try {
      await submitDecision(application.id, decision, decision === 'reject' ? rejectionReason : null);
      addNotification({
        type: decision === 'verify' ? 'success' : 'error',
        message: `Application ${application.id} has been ${decision === 'verify' ? 'verified' : 'rejected'}.`
      });
      onDecision();
    } catch (error) {
      console.error(error);
      addNotification({ type: 'error', message: 'Failed to submit decision.' });
    } finally {
      setLoading(false);
      setModalType(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded shadow border-t-4 border-navy-600">
        <h2 className="text-2xl font-bold text-navy-600 mb-4">Final Decision</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-gray-50 rounded border">
            <span className="text-xs text-gray-500 uppercase block">Application ID</span>
            <span className="font-medium">{application.id}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded border">
            <span className="text-xs text-gray-500 uppercase block">Applicant</span>
            <span className="font-medium">{application.applicantName || 'N/A'}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded border">
            <span className="text-xs text-gray-500 uppercase block">Instrument</span>
            <span className="font-medium">{application.instrumentType || 'N/A'}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded border">
            <span className="text-xs text-gray-500 uppercase block">Verification Status</span>
            <span className="font-medium text-green-600 flex items-center space-x-1">
              <CheckCircle size={14}/> <span>Checks Passed</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div 
            className="flex-1 bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 transition-colors"
            onClick={() => setModalType('verify')}
          >
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-green-700">Approve & Verify</h3>
            <p className="text-sm text-green-600 text-center mt-2">Issue verification certificate for this instrument.</p>
          </div>
          
          <div 
            className="flex-1 bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-red-100 transition-colors"
            onClick={() => setModalType('reject')}
          >
            <XCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-700">Reject</h3>
            <p className="text-sm text-red-600 text-center mt-2">Deny application and return to applicant for correction.</p>
          </div>
        </div>
      </div>

      {/* Verify Modal */}
      <Modal isOpen={modalType === 'verify'} onClose={() => setModalType(null)} title="Confirm Verification">
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 text-blue-800 rounded">
            <AlertTriangle size={24} className="flex-shrink-0" />
            <p className="text-sm">You are about to approve application <strong>{application.id}</strong>. A verification certificate will be generated and the applicant will be notified.</p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button onClick={() => setModalType(null)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
            <button 
              onClick={() => handleDecision('verify')} 
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? 'Processing...' : <><CheckCircle size={18} /> <span>Confirm Verification</span></>}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal isOpen={modalType === 'reject'} onClose={() => setModalType(null)} title="Confirm Rejection">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Please provide a reason for rejection. This will be visible to the applicant.</p>
          <textarea 
            className="w-full border rounded p-3 focus:ring-2 focus:ring-red-500 outline-none"
            rows="4"
            placeholder="Reason for rejection (mandatory)..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          ></textarea>
          <div className="flex justify-end space-x-3 pt-4">
            <button onClick={() => setModalType(null)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
            <button 
              onClick={() => handleDecision('reject')} 
              disabled={loading || !rejectionReason.trim()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? 'Processing...' : <><XCircle size={18} /> <span>Confirm Rejection</span></>}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
