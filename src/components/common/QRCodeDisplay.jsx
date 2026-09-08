import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeDisplay = ({ payload, title, certificateId, expiryDate }) => {
  const handleDownload = () => {
    // TODO: Implement real PDF generation and download
    console.log('Downloading certificate for:', certificateId);
  };

  const handlePrint = () => {
    // Mock print functionality
    window.print();
  };

  // Simple countdown logic
  const getDaysUntilExpiry = () => {
    if (!expiryDate) return 0;
    const diffTime = Math.abs(new Date(expiryDate) - new Date());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title || 'Certificate QR Code'}</h3>
      
      <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mb-6">
        <QRCodeSVG 
          value={payload || 'https://truemeasure.gov/verify/unknown'} 
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>

      <div className="w-full text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
        <p className="font-mono text-lg font-semibold text-navy-600">{certificateId || 'N/A'}</p>
        
        {expiryDate && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Expires: <span className="font-medium text-gray-900">{new Date(expiryDate).toLocaleDateString()}</span></p>
            <p className="text-xs font-semibold text-amber-600 mt-1">
              {getDaysUntilExpiry()} days remaining
            </p>
          </div>
        )}
      </div>

      <div className="flex w-full gap-3">
        <button 
          onClick={handlePrint}
          className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm transition-colors"
        >
          Print
        </button>
        <button 
          onClick={handleDownload}
          className="flex-1 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg font-medium text-sm transition-colors btn-primary"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
