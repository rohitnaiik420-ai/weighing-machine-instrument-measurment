import React, { useState } from 'react';
import { MapPin, Camera, CheckSquare, FileText, Navigation } from 'lucide-react';
import { submitFieldVerification } from '../../data/services';
import { VERIFICATION_CHECKLIST } from '../../utils/constants';
import { getMockGPS } from '../../utils/helpers';

export default function FieldVerification({ application, onComplete }) {
  const [gps, setGps] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [checklist, setChecklist] = useState({});
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCaptureGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGps({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setGps(getMockGPS());
        }
      );
    } else {
      setGps(getMockGPS());
    }
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    if (photos.length >= 5) return;
    const newPhotos = [...photos, `photo_${Date.now()}.jpg`];
    setPhotos(newPhotos);
  };

  const toggleChecklist = (id) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    setError('');
    if (!gps) {
      setError('GPS Location is required.');
      return;
    }
    
    // Check required items
    const requiredItems = VERIFICATION_CHECKLIST?.filter(item => item.required) || [];
    const missing = requiredItems.filter(item => !checklist[item.id]);
    
    if (missing.length > 0) {
      setError('All required checklist items must be completed.');
      return;
    }

    setLoading(true);
    try {
      await submitFieldVerification(application.id, { gps, photos, checklist, notes });
      onComplete();
    } catch (err) {
      setError('Failed to submit verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-navy-600 border-b pb-2">Field Verification: {application.id}</h2>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}

      {/* GPS Section */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Navigation size={20}/> Location Verification</h3>
        <div>
          {gps ? (
            <div className="p-4 bg-gray-50 border rounded flex items-center justify-between">
              <div>
                <p className="font-mono text-sm">Lat: {gps.lat}</p>
                <p className="font-mono text-sm">Lng: {gps.lng}</p>
              </div>
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                Map View
              </div>
            </div>
          ) : (
            <button 
              onClick={handleCaptureGPS}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              <MapPin size={18} />
              <span>Capture GPS Location</span>
            </button>
          )}
        </div>
      </section>

      {/* Photos Section */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Camera size={20}/> Evidence Photos (Max 5)</h3>
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handlePhotoDrop}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
        >
          <Camera size={24} className="mb-2" />
          <p>Drag and drop photos here, or click to upload</p>
        </div>
        {photos.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {photos.map((photo, i) => (
              <div key={i} className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600 border overflow-hidden p-1 text-center">
                {photo}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Checklist Section */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2"><CheckSquare size={20}/> Verification Checklist</h3>
        <div className="space-y-2 border rounded p-4 bg-gray-50">
          {(VERIFICATION_CHECKLIST || []).map(item => (
            <label key={item.id} className="flex items-start space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                checked={!!checklist[item.id]}
                onChange={() => toggleChecklist(item.id)}
              />
              <div>
                <span className="font-medium text-gray-800">
                  {item.label} {item.required && <span className="text-red-500">*</span>}
                </span>
                {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Notes Section */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2"><FileText size={20}/> Officer Notes</h3>
        <textarea 
          className="w-full border rounded p-3 focus:ring-2 focus:ring-brand-blue outline-none min-h-[100px]"
          placeholder="Enter any additional observations..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </section>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-brand-blue text-white rounded hover:bg-blue-700 font-medium disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Complete Field Verification'}
        </button>
      </div>
    </div>
  );
}
