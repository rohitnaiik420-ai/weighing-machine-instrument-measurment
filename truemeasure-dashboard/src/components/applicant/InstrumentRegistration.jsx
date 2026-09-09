import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { registerInstrument, createApplication } from '../../data/services';
import { INSTRUMENT_TYPES, REGIONS } from '../../utils/constants';
import { ChevronLeft, ChevronRight, Upload, FileText, Check, X, AlertCircle } from 'lucide-react';

const INITIAL = { type: '', make: '', model: '', serialNumber: '', capacity: '', location: '', region: '' };

export default function InstrumentRegistration() {
  const { currentUser, setActiveView, triggerRefresh, addNotification } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [documents, setDocuments] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.type) e.type = 'Select instrument type';
    if (!form.make) e.make = 'Enter make/manufacturer';
    if (!form.model) e.model = 'Enter model number';
    if (!form.serialNumber) e.serialNumber = 'Enter serial number';
    if (!form.capacity) e.capacity = 'Enter capacity/range';
    if (!form.location) e.location = 'Enter location';
    if (!form.region) e.region = 'Select region';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileAdd = (e) => {
    const files = Array.from(e.target.files || []);
    const newDocs = files.slice(0, 5 - documents.length).map((f) => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploaded: new Date().toISOString().split('T')[0],
    }));
    setDocuments((d) => [...d, ...newDocs]);
  };

  const removeDoc = (idx) => setDocuments((d) => d.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const inst = await registerInstrument({ ...form, ownerId: currentUser.id });
      // Mock OCR extract from document
      const ocrExtract = {
        'Business Name': currentUser.businessName,
        'Owner': currentUser.name,
        'Instrument Type': form.type,
        'Make': `${form.make} ${form.model}`,
        'Capacity': form.capacity,
      };
      await createApplication({
        instrumentId: inst.id,
        applicantId: currentUser.id,
        documents,
        ocrExtract,
      });
      addNotification({ message: `Instrument ${form.type} registered and application submitted successfully!`, type: 'success' });
      triggerRefresh();
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center card">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-navy-600 mb-2">Registration Successful!</h2>
        <p className="text-gray-500 mb-6">Your instrument has been registered and the verification application has been submitted. You will be notified when an officer is assigned.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setActiveView('applications')} className="btn-primary">Track Application</button>
          <button onClick={() => { setForm(INITIAL); setDocuments([]); setStep(1); setSuccess(false); setConfirmed(false); }} className="btn-secondary">Register Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-600">Register New Instrument</h1>
        <p className="text-gray-500 text-sm mt-1">Complete all steps to register and apply for verification</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-brand-blue' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>
      <p className="text-sm text-gray-500 font-medium">
        Step {step} of 3: {step === 1 ? 'Instrument Details' : step === 2 ? 'Document Upload' : 'Review & Submit'}
      </p>

      {/* Step 1: Instrument Details */}
      {step === 1 && (
        <div className="card space-y-4">
          <div>
            <label className="label-text">Instrument Type *</label>
            <select value={form.type} onChange={(e) => update('type', e.target.value)} className="input-field">
              <option value="">Select type...</option>
              {INSTRUMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-text">Make / Manufacturer *</label>
              <input type="text" value={form.make} onChange={(e) => update('make', e.target.value)} className="input-field" placeholder="e.g. Essae" />
              {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make}</p>}
            </div>
            <div>
              <label className="label-text">Model *</label>
              <input type="text" value={form.model} onChange={(e) => update('model', e.target.value)} className="input-field" placeholder="e.g. DS-252" />
              {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-text">Serial Number *</label>
              <input type="text" value={form.serialNumber} onChange={(e) => update('serialNumber', e.target.value)} className="input-field" placeholder="e.g. EWS-2026-00145" />
              {errors.serialNumber && <p className="text-red-500 text-xs mt-1">{errors.serialNumber}</p>}
            </div>
            <div>
              <label className="label-text">Capacity / Range *</label>
              <input type="text" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} className="input-field" placeholder="e.g. 30 kg" />
              {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
            </div>
          </div>
          <div>
            <label className="label-text">Location / Address *</label>
            <textarea value={form.location} onChange={(e) => update('location', e.target.value)} className="input-field" rows={2} placeholder="Full address where instrument is installed" />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          <div>
            <label className="label-text">Region *</label>
            <select value={form.region} onChange={(e) => update('region', e.target.value)} className="input-field">
              <option value="">Select region...</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
          </div>
        </div>
      )}

      {/* Step 2: Document Upload */}
      {step === 2 && (
        <div className="card space-y-4">
          <p className="text-sm text-gray-600">Upload your business license, previous certificates, purchase invoices, or any supporting documents.</p>
          {/* TODO: Connect to real file upload service */}
          <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-brand-blue hover:bg-blue-50/50 transition-colors">
            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-600">Drag & drop files here, or click to browse</p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — Max 5 files</p>
            <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileAdd} disabled={documents.length >= 5} />
          </label>

          {documents.length > 0 && (
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-brand-blue" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.size}</p>
                    </div>
                  </div>
                  <button onClick={() => removeDoc(i)} className="p-1 hover:bg-red-50 rounded">
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {documents.length === 0 && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <p className="text-sm text-amber-700">At least one document is recommended for faster processing.</p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="card space-y-4">
          <h3 className="font-semibold text-navy-600">Review Your Submission</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-500">Type:</span><span className="font-medium">{form.type}</span>
              <span className="text-gray-500">Make:</span><span className="font-medium">{form.make}</span>
              <span className="text-gray-500">Model:</span><span className="font-medium">{form.model}</span>
              <span className="text-gray-500">Serial No:</span><span className="font-medium">{form.serialNumber}</span>
              <span className="text-gray-500">Capacity:</span><span className="font-medium">{form.capacity}</span>
              <span className="text-gray-500">Region:</span><span className="font-medium">{form.region}</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <span className="text-gray-500">Location:</span>
              <p className="font-medium">{form.location}</p>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <span className="text-gray-500">Documents ({documents.length}):</span>
              {documents.map((d, i) => <p key={i} className="font-medium">{d.name}</p>)}
              {documents.length === 0 && <p className="text-gray-400 italic">No documents uploaded</p>}
            </div>
          </div>

          <label className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 w-4 h-4 text-brand-blue rounded" />
            <span className="text-sm text-gray-700">I confirm that the above details are correct and I authorize the Legal Metrology Department to verify this instrument.</span>
          </label>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => step === 1 ? setActiveView('dashboard') : setStep(step - 1)}
          className="btn-secondary flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {step === 1 ? 'Cancel' : 'Back'}
        </button>

        {step < 3 ? (
          <button
            onClick={() => { if (step === 1 && !validateStep1()) return; setStep(step + 1); }}
            className="btn-primary flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!confirmed || submitting}
            className="btn-primary flex items-center gap-2"
          >
            {submitting ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
            ) : (
              <><Check className="w-4 h-4" /> Submit Application</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
