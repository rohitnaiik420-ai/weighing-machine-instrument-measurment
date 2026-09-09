import React, { useState } from 'react';
import { FileText, Check, Edit3, AlertTriangle, Bot } from 'lucide-react';

export default function DocumentReview({ application, onConfirm }) {
  const defaultExtracted = application.ocrExtract || {
    "Serial Number": "SN-99882211",
    "Model": "M-300",
    "Manufacturer": "WeighTech Inc",
    "Max Capacity": "150 kg",
    "Min Capacity": "500 g"
  };

  const [extractedData, setExtractedData] = useState(defaultExtracted);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [confirmedFields, setConfirmedFields] = useState({});

  const handleEditClick = (key, value) => {
    setEditingField(key);
    setTempValue(value);
  };

  const handleSaveEdit = (key) => {
    setExtractedData(prev => ({ ...prev, [key]: tempValue }));
    setEditingField(null);
  };

  const handleConfirmField = (key) => {
    setConfirmedFields(prev => ({ ...prev, [key]: true }));
    if (editingField === key) setEditingField(null);
  };

  const allConfirmed = Object.keys(extractedData).every(key => confirmedFields[key]);

  const handleConfirmAll = () => {
    const all = {};
    Object.keys(extractedData).forEach(k => all[k] = true);
    setConfirmedFields(all);
  };

  const handleProceed = () => {
    // In a real app, you might save the confirmed data to the backend here
    // before moving to the decision step.
    if (allConfirmed) {
      onConfirm();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 flex items-start space-x-3 rounded">
        <AlertTriangle className="text-amber-500 mt-0.5" size={20} />
        <p className="text-amber-800 text-sm">
          <strong>Disclaimer:</strong> AI assists document extraction. The officer must review and confirm all fields. Auto-approval is not permitted.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel: Documents */}
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Uploaded Documents</h3>
          <ul className="space-y-3">
            {['invoice.pdf', 'calibration_cert.pdf', 'photo_id.jpg'].map((doc, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FileText className="text-brand-blue" size={20} />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
                <button className="text-xs text-brand-blue hover:underline">View</button>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-2 border-dashed border-gray-200 rounded h-64 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <FileText size={48} className="mb-2 opacity-50" />
            <p>Document Preview</p>
          </div>
        </div>

        {/* Right Panel: OCR Data */}
        <div className="flex-1 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <span>AI-Extracted Data (OCR)</span>
            </h3>
            {!allConfirmed && (
              <button onClick={handleConfirmAll} className="text-xs px-3 py-1 bg-gray-100 border rounded hover:bg-gray-200 text-gray-700">
                Confirm All
              </button>
            )}
          </div>

          <div className="space-y-4">
            {Object.entries(extractedData).map(([key, value]) => {
              const isConfirmed = confirmedFields[key];
              const isEditing = editingField === key;
              
              return (
                <div key={key} className={`p-3 border rounded transition-colors ${isConfirmed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase">{key}</span>
                    <span className="text-[10px] flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      <Bot size={10} /> <span>AI Suggested</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={tempValue} 
                        onChange={(e) => setTempValue(e.target.value)}
                        className="border p-1 text-sm rounded w-full mr-2 focus:ring-1 focus:ring-brand-blue outline-none"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-gray-800">{value}</span>
                    )}
                    
                    <div className="flex items-center space-x-2 ml-2">
                      {isEditing ? (
                        <button onClick={() => handleSaveEdit(key)} className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          <Check size={16} />
                        </button>
                      ) : (
                        <button onClick={() => handleEditClick(key, value)} disabled={isConfirmed} className={`p-1.5 rounded ${isConfirmed ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}>
                          <Edit3 size={16} />
                        </button>
                      )}
                      {!isConfirmed && !isEditing && (
                        <button onClick={() => handleConfirmField(key)} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200">
                          <Check size={16} />
                        </button>
                      )}
                      {isConfirmed && (
                        <Check size={18} className="text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t flex justify-end">
            <button 
              onClick={handleProceed}
              disabled={!allConfirmed}
              className={`px-6 py-2 rounded font-medium ${allConfirmed ? 'bg-brand-blue text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Proceed to Decision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
