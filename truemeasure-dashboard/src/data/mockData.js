/**
 * TRUEMEASURE Mock Data
 * Realistic seed data for the dashboard prototype.
 * ~10 users, ~18 instruments, ~12 applications, certificates, and audit logs.
 */

// ─── USERS ─────────────────────────────────────────────────────
export const users = [
  // Applicants (shopkeepers / traders / manufacturers)
  { id: 'USR-001', name: 'Rajesh Kumar', role: 'applicant', businessName: 'Kumar General Store', phone: '9876543210', email: 'rajesh@kumarstore.in', region: 'Delhi NCR', avatar: 'RK' },
  { id: 'USR-002', name: 'Priya Sharma', role: 'applicant', businessName: 'Sharma Kirana & Provisions', phone: '9876543211', email: 'priya@sharmakirana.in', region: 'Mumbai', avatar: 'PS' },
  { id: 'USR-003', name: 'Mohammed Iqbal', role: 'applicant', businessName: 'Iqbal Fuel Station', phone: '9876543212', email: 'iqbal@fuelstation.in', region: 'Hyderabad', avatar: 'MI' },
  { id: 'USR-004', name: 'Anita Desai', role: 'applicant', businessName: 'Desai Jewellers', phone: '9876543213', email: 'anita@desaijewellers.in', region: 'Ahmedabad', avatar: 'AD' },
  { id: 'USR-005', name: 'Suresh Patel', role: 'applicant', businessName: 'Patel Industrial Weighing', phone: '9876543214', email: 'suresh@patelindustrial.in', region: 'Pune', avatar: 'SP' },

  // Officers
  { id: 'USR-006', name: 'Inspector Vikram Singh', role: 'officer', businessName: 'LMO — Delhi Division', phone: '9876543215', email: 'vikram.singh@lmd.gov.in', region: 'Delhi NCR', avatar: 'VS' },
  { id: 'USR-007', name: 'Inspector Meena Rao', role: 'officer', businessName: 'GATC — Mumbai Division', phone: '9876543216', email: 'meena.rao@lmd.gov.in', region: 'Mumbai', avatar: 'MR' },
  { id: 'USR-008', name: 'Inspector Arjun Nair', role: 'officer', businessName: 'LMO — Hyderabad Division', phone: '9876543217', email: 'arjun.nair@lmd.gov.in', region: 'Hyderabad', avatar: 'AN' },

  // Admins
  { id: 'USR-009', name: 'Dr. Kavita Mehta', role: 'admin', businessName: 'Legal Metrology Department', phone: '9876543218', email: 'kavita.mehta@lmd.gov.in', region: 'Delhi NCR', avatar: 'KM' },
  { id: 'USR-010', name: 'Sanjay Gupta', role: 'admin', businessName: 'Legal Metrology Department', phone: '9876543219', email: 'sanjay.gupta@lmd.gov.in', region: 'Delhi NCR', avatar: 'SG' },
];

// ─── INSTRUMENTS ───────────────────────────────────────────────
export const instruments = [
  // Rajesh Kumar's instruments
  { id: 'INS-001', ownerId: 'USR-001', type: 'Electronic Weighing Scale', make: 'Essae', model: 'DS-252', serialNumber: 'EWS-2024-00145', capacity: '30 kg', location: 'Shop Floor, Chandni Chowk, Delhi', registrationDate: '2025-08-15', status: 'certified', lastVerifiedDate: '2025-09-01', expiryDate: '2026-09-01', region: 'Delhi NCR' },
  { id: 'INS-002', ownerId: 'USR-001', type: 'Counter Scale', make: 'Sansui', model: 'SC-110', serialNumber: 'CS-2024-00312', capacity: '10 kg', location: 'Counter, Chandni Chowk, Delhi', registrationDate: '2026-07-10', status: 'officer_assigned', lastVerifiedDate: null, expiryDate: null, region: 'Delhi NCR' },
  { id: 'INS-003', ownerId: 'USR-001', type: 'Weights (Standard Set)', make: 'National', model: 'WS-5kg', serialNumber: 'WT-2025-00089', capacity: '5 kg set', location: 'Shop Floor, Chandni Chowk, Delhi', registrationDate: '2026-08-20', status: 'submitted', lastVerifiedDate: null, expiryDate: null, region: 'Delhi NCR' },

  // Priya Sharma's instruments
  { id: 'INS-004', ownerId: 'USR-002', type: 'Electronic Weighing Scale', make: 'Essae', model: 'DS-450', serialNumber: 'EWS-2024-00267', capacity: '50 kg', location: 'Main Store, Dadar, Mumbai', registrationDate: '2025-06-20', status: 'tracking', lastVerifiedDate: '2025-07-15', expiryDate: '2026-07-15', region: 'Mumbai' },
  { id: 'INS-005', ownerId: 'USR-002', type: 'Platform Scale', make: 'Avery', model: 'PL-200', serialNumber: 'PS-2024-00098', capacity: '200 kg', location: 'Warehouse, Dadar, Mumbai', registrationDate: '2025-03-10', status: 'expired', lastVerifiedDate: '2025-04-01', expiryDate: '2026-04-01', region: 'Mumbai' },
  { id: 'INS-006', ownerId: 'USR-002', type: 'Measuring Tape', make: 'Stanley', model: 'MT-30m', serialNumber: 'MT-2026-00034', capacity: '30 m', location: 'Store, Dadar, Mumbai', registrationDate: '2026-08-01', status: 'documents_uploaded', lastVerifiedDate: null, expiryDate: null, region: 'Mumbai' },

  // Mohammed Iqbal's instruments
  { id: 'INS-007', ownerId: 'USR-003', type: 'Fuel Dispensing Unit', make: 'Tokheim', model: 'Q330', serialNumber: 'FDU-2024-00056', capacity: '100 L/min', location: 'Pump 1, Secunderabad, Hyderabad', registrationDate: '2025-05-15', status: 'certified', lastVerifiedDate: '2025-06-10', expiryDate: '2026-12-10', region: 'Hyderabad' },
  { id: 'INS-008', ownerId: 'USR-003', type: 'Fuel Dispensing Unit', make: 'Gilbarco', model: 'SK700', serialNumber: 'FDU-2024-00057', capacity: '100 L/min', location: 'Pump 2, Secunderabad, Hyderabad', registrationDate: '2025-05-15', status: 'reverification', lastVerifiedDate: '2025-06-10', expiryDate: '2026-09-10', region: 'Hyderabad' },
  { id: 'INS-009', ownerId: 'USR-003', type: 'Electronic Weighing Scale', make: 'CAS', model: 'ED-30', serialNumber: 'EWS-2026-00401', capacity: '30 kg', location: 'Shop, Secunderabad, Hyderabad', registrationDate: '2026-08-25', status: 'field_verification', lastVerifiedDate: null, expiryDate: null, region: 'Hyderabad' },

  // Anita Desai's instruments
  { id: 'INS-010', ownerId: 'USR-004', type: 'Beam Balance', make: 'National', model: 'BB-100g', serialNumber: 'BB-2025-00023', capacity: '100 g', location: 'Workshop, Maninagar, Ahmedabad', registrationDate: '2025-11-01', status: 'certified', lastVerifiedDate: '2025-12-05', expiryDate: '2026-12-05', region: 'Ahmedabad' },
  { id: 'INS-011', ownerId: 'USR-004', type: 'Electronic Weighing Scale', make: 'Shimadzu', model: 'UX-420H', serialNumber: 'EWS-2026-00512', capacity: '420 g (0.001g)', location: 'Lab, Maninagar, Ahmedabad', registrationDate: '2026-07-15', status: 'verified', lastVerifiedDate: '2026-08-10', expiryDate: '2027-08-10', region: 'Ahmedabad' },
  { id: 'INS-012', ownerId: 'USR-004', type: 'Weights (Standard Set)', make: 'OIML', model: 'E2-1mg', serialNumber: 'WT-2026-00102', capacity: '1 mg – 200 g', location: 'Lab, Maninagar, Ahmedabad', registrationDate: '2026-08-30', status: 'registered', lastVerifiedDate: null, expiryDate: null, region: 'Ahmedabad' },

  // Suresh Patel's instruments
  { id: 'INS-013', ownerId: 'USR-005', type: 'Platform Scale', make: 'Essae', model: 'SI-810', serialNumber: 'PS-2025-00156', capacity: '500 kg', location: 'Factory, Hinjewadi, Pune', registrationDate: '2025-07-20', status: 'certified', lastVerifiedDate: '2025-08-15', expiryDate: '2026-08-15', region: 'Pune' },
  { id: 'INS-014', ownerId: 'USR-005', type: 'Electronic Weighing Scale', make: 'Mettler Toledo', model: 'ME-3002', serialNumber: 'EWS-2025-00678', capacity: '3200 g', location: 'Lab, Hinjewadi, Pune', registrationDate: '2025-09-10', status: 'tracking', lastVerifiedDate: '2025-10-05', expiryDate: '2026-10-05', region: 'Pune' },
  { id: 'INS-015', ownerId: 'USR-005', type: 'Spring Balance', make: 'Salter', model: 'SB-25', serialNumber: 'SB-2026-00045', capacity: '25 kg', location: 'Warehouse, Hinjewadi, Pune', registrationDate: '2026-06-01', status: 'rejected', lastVerifiedDate: null, expiryDate: null, region: 'Pune' },

  // Additional instruments for volume
  { id: 'INS-016', ownerId: 'USR-001', type: 'Capacity Measure', make: 'National', model: 'CM-10L', serialNumber: 'CM-2026-00078', capacity: '10 L', location: 'Shop, Chandni Chowk, Delhi', registrationDate: '2026-09-01', status: 'registered', lastVerifiedDate: null, expiryDate: null, region: 'Delhi NCR' },
  { id: 'INS-017', ownerId: 'USR-002', type: 'Water Meter', make: 'Itron', model: 'WM-50', serialNumber: 'WM-2026-00034', capacity: '50 m³/h', location: 'Warehouse, Dadar, Mumbai', registrationDate: '2026-08-15', status: 'officer_assigned', lastVerifiedDate: null, expiryDate: null, region: 'Mumbai' },
  { id: 'INS-018', ownerId: 'USR-003', type: 'Length Measure', make: 'Freemans', model: 'FT-15', serialNumber: 'LM-2026-00012', capacity: '15 m', location: 'Shop, Secunderabad, Hyderabad', registrationDate: '2026-08-28', status: 'submitted', lastVerifiedDate: null, expiryDate: null, region: 'Hyderabad' },
];

// ─── APPLICATIONS ──────────────────────────────────────────────
export const applications = [
  {
    id: 'APP-001', instrumentId: 'INS-001', applicantId: 'USR-001', status: 'certified',
    documents: [{ name: 'Business License.pdf', size: '1.2 MB', uploaded: '2025-08-16' }, { name: 'Previous Certificate.pdf', size: '0.8 MB', uploaded: '2025-08-16' }],
    ocrExtract: { 'Business Name': 'Kumar General Store', 'License No': 'DL/LM/2024/1156', 'Owner': 'Rajesh Kumar', 'Address': 'Chandni Chowk, Delhi', 'Instrument Type': 'Electronic Weighing Scale', 'Capacity': '30 kg' },
    assignedOfficerId: 'USR-006', scheduleDate: '2025-08-28',
    fieldVerification: { gps: { lat: 28.6505, lng: 77.2303 }, photos: ['photo_front.jpg', 'photo_scale.jpg', 'photo_seal.jpg'], notes: 'Scale in good condition. All seals intact. Accuracy within ±0.5g at 10kg load.' },
    decision: 'verified', decisionDate: '2025-09-01', decisionReason: 'All parameters within tolerance. Instrument meets legal metrology standards.',
    certificateId: 'CERT-001', createdAt: '2025-08-15',
  },
  {
    id: 'APP-002', instrumentId: 'INS-002', applicantId: 'USR-001', status: 'officer_assigned',
    documents: [{ name: 'Business License.pdf', size: '1.2 MB', uploaded: '2026-07-11' }, { name: 'Scale Purchase Invoice.pdf', size: '0.5 MB', uploaded: '2026-07-11' }],
    ocrExtract: { 'Business Name': 'Kumar General Store', 'License No': 'DL/LM/2024/1156', 'Owner': 'Rajesh Kumar', 'Instrument Type': 'Counter Scale', 'Make': 'Sansui SC-110' },
    assignedOfficerId: 'USR-006', scheduleDate: '2026-09-05',
    fieldVerification: null, decision: null, decisionDate: null, decisionReason: null,
    certificateId: null, createdAt: '2026-07-10',
  },
  {
    id: 'APP-003', instrumentId: 'INS-003', applicantId: 'USR-001', status: 'submitted',
    documents: [{ name: 'Business License.pdf', size: '1.2 MB', uploaded: '2026-08-21' }],
    ocrExtract: { 'Business Name': 'Kumar General Store', 'License No': 'DL/LM/2024/1156', 'Owner': 'Rajesh Kumar', 'Instrument Type': 'Weights Set' },
    assignedOfficerId: null, scheduleDate: null,
    fieldVerification: null, decision: null, decisionDate: null, decisionReason: null,
    certificateId: null, createdAt: '2026-08-20',
  },
  {
    id: 'APP-004', instrumentId: 'INS-004', applicantId: 'USR-002', status: 'certified',
    documents: [{ name: 'Shop License.pdf', size: '0.9 MB', uploaded: '2025-06-21' }, { name: 'Scale Certificate.pdf', size: '0.4 MB', uploaded: '2025-06-21' }],
    ocrExtract: { 'Business Name': 'Sharma Kirana & Provisions', 'License No': 'MH/LM/2024/2087', 'Owner': 'Priya Sharma', 'Instrument Type': 'Electronic Weighing Scale', 'Capacity': '50 kg' },
    assignedOfficerId: 'USR-007', scheduleDate: '2025-07-10',
    fieldVerification: { gps: { lat: 19.0178, lng: 72.8478 }, photos: ['photo1.jpg', 'photo2.jpg'], notes: 'Instrument calibrated correctly. Minor wear on platform, acceptable.' },
    decision: 'verified', decisionDate: '2025-07-15', decisionReason: 'Meets all requirements.',
    certificateId: 'CERT-002', createdAt: '2025-06-20',
  },
  {
    id: 'APP-005', instrumentId: 'INS-006', applicantId: 'USR-002', status: 'documents_uploaded',
    documents: [{ name: 'Shop License.pdf', size: '0.9 MB', uploaded: '2026-08-02' }, { name: 'Tape Calibration Report.pdf', size: '0.3 MB', uploaded: '2026-08-03' }],
    ocrExtract: { 'Business Name': 'Sharma Kirana & Provisions', 'License No': 'MH/LM/2024/2087', 'Owner': 'Priya Sharma', 'Instrument Type': 'Measuring Tape', 'Make': 'Stanley MT-30m' },
    assignedOfficerId: null, scheduleDate: null,
    fieldVerification: null, decision: null, decisionDate: null, decisionReason: null,
    certificateId: null, createdAt: '2026-08-01',
  },
  {
    id: 'APP-006', instrumentId: 'INS-007', applicantId: 'USR-003', status: 'certified',
    documents: [{ name: 'Fuel License.pdf', size: '1.5 MB', uploaded: '2025-05-16' }, { name: 'Dispenser Manual.pdf', size: '2.1 MB', uploaded: '2025-05-16' }],
    ocrExtract: { 'Business Name': 'Iqbal Fuel Station', 'License No': 'TS/LM/2024/0892', 'Owner': 'Mohammed Iqbal', 'Instrument Type': 'Fuel Dispensing Unit', 'Model': 'Tokheim Q330' },
    assignedOfficerId: 'USR-008', scheduleDate: '2025-06-05',
    fieldVerification: { gps: { lat: 17.4399, lng: 78.4983 }, photos: ['pump_front.jpg', 'display.jpg', 'seal.jpg'], notes: 'Flow rate calibration verified. Digital display accurate. Government seal intact.' },
    decision: 'verified', decisionDate: '2025-06-10', decisionReason: 'Dispenser calibration within ±0.25% tolerance.',
    certificateId: 'CERT-003', createdAt: '2025-05-15',
  },
  {
    id: 'APP-007', instrumentId: 'INS-009', applicantId: 'USR-003', status: 'field_verification',
    documents: [{ name: 'Fuel License.pdf', size: '1.5 MB', uploaded: '2026-08-26' }, { name: 'Scale Invoice.pdf', size: '0.6 MB', uploaded: '2026-08-26' }],
    ocrExtract: { 'Business Name': 'Iqbal Fuel Station', 'License No': 'TS/LM/2024/0892', 'Owner': 'Mohammed Iqbal', 'Instrument Type': 'Electronic Weighing Scale', 'Make': 'CAS ED-30' },
    assignedOfficerId: 'USR-008', scheduleDate: '2026-09-03',
    fieldVerification: null, decision: null, decisionDate: null, decisionReason: null,
    certificateId: null, createdAt: '2026-08-25',
  },
  {
    id: 'APP-008', instrumentId: 'INS-010', applicantId: 'USR-004', status: 'certified',
    documents: [{ name: 'Jeweller License.pdf', size: '1.1 MB', uploaded: '2025-11-02' }, { name: 'Balance Certificate.pdf', size: '0.4 MB', uploaded: '2025-11-02' }],
    ocrExtract: { 'Business Name': 'Desai Jewellers', 'License No': 'GJ/LM/2025/0345', 'Owner': 'Anita Desai', 'Instrument Type': 'Beam Balance', 'Capacity': '100 g' },
    assignedOfficerId: 'USR-006', scheduleDate: '2025-11-28',
    fieldVerification: { gps: { lat: 23.0225, lng: 72.5714 }, photos: ['balance.jpg', 'weights.jpg'], notes: 'Precision balance in excellent condition. Sensitivity test passed.' },
    decision: 'verified', decisionDate: '2025-12-05', decisionReason: 'Meets precision requirements for jewellery trade.',
    certificateId: 'CERT-004', createdAt: '2025-11-01',
  },
  {
    id: 'APP-009', instrumentId: 'INS-013', applicantId: 'USR-005', status: 'certified',
    documents: [{ name: 'Factory License.pdf', size: '1.8 MB', uploaded: '2025-07-21' }, { name: 'Scale Calibration.pdf', size: '0.7 MB', uploaded: '2025-07-21' }],
    ocrExtract: { 'Business Name': 'Patel Industrial Weighing', 'License No': 'MH/LM/2025/1234', 'Owner': 'Suresh Patel', 'Instrument Type': 'Platform Scale', 'Capacity': '500 kg' },
    assignedOfficerId: 'USR-007', scheduleDate: '2025-08-10',
    fieldVerification: { gps: { lat: 18.5913, lng: 73.7389 }, photos: ['platform.jpg', 'display.jpg', 'foundation.jpg'], notes: 'Industrial platform scale. Level verified. Accuracy within ±50g at 500kg.' },
    decision: 'verified', decisionDate: '2025-08-15', decisionReason: 'All industrial tolerance requirements met.',
    certificateId: 'CERT-005', createdAt: '2025-07-20',
  },
  {
    id: 'APP-010', instrumentId: 'INS-015', applicantId: 'USR-005', status: 'rejected',
    documents: [{ name: 'Factory License.pdf', size: '1.8 MB', uploaded: '2026-06-02' }],
    ocrExtract: { 'Business Name': 'Patel Industrial Weighing', 'License No': 'MH/LM/2025/1234', 'Owner': 'Suresh Patel', 'Instrument Type': 'Spring Balance', 'Make': 'Salter SB-25' },
    assignedOfficerId: 'USR-007', scheduleDate: '2026-06-15',
    fieldVerification: { gps: { lat: 18.5913, lng: 73.7389 }, photos: ['spring_balance.jpg'], notes: 'Spring mechanism shows fatigue. Readings inconsistent across range. Zero error detected.' },
    decision: 'rejected', decisionDate: '2026-06-20', decisionReason: 'Instrument fails accuracy test. Spring mechanism fatigued, zero error exceeds tolerance. Recommend replacement.',
    certificateId: null, createdAt: '2026-06-01',
  },
  {
    id: 'APP-011', instrumentId: 'INS-017', applicantId: 'USR-002', status: 'officer_assigned',
    documents: [{ name: 'Shop License.pdf', size: '0.9 MB', uploaded: '2026-08-16' }, { name: 'Water Meter Specs.pdf', size: '0.5 MB', uploaded: '2026-08-16' }],
    ocrExtract: { 'Business Name': 'Sharma Kirana & Provisions', 'License No': 'MH/LM/2024/2087', 'Owner': 'Priya Sharma', 'Instrument Type': 'Water Meter', 'Make': 'Itron WM-50' },
    assignedOfficerId: 'USR-007', scheduleDate: '2026-09-08',
    fieldVerification: null, decision: null, decisionDate: null, decisionReason: null,
    certificateId: null, createdAt: '2026-08-15',
  },
  {
    id: 'APP-012', instrumentId: 'INS-018', applicantId: 'USR-003', status: 'submitted',
    documents: [{ name: 'Fuel License.pdf', size: '1.5 MB', uploaded: '2026-08-29' }],
    ocrExtract: { 'Business Name': 'Iqbal Fuel Station', 'License No': 'TS/LM/2024/0892', 'Owner': 'Mohammed Iqbal', 'Instrument Type': 'Length Measure' },
    assignedOfficerId: null, scheduleDate: null,
    fieldVerification: null, decision: null, decisionDate: null, decisionReason: null,
    certificateId: null, createdAt: '2026-08-28',
  },
  {
    id: 'APP-013', instrumentId: 'INS-011', applicantId: 'USR-004', status: 'decision',
    documents: [{ name: 'Jeweller License.pdf', size: '1.1 MB', uploaded: '2026-07-16' }, { name: 'Shimadzu Manual.pdf', size: '0.8 MB', uploaded: '2026-07-16' }],
    ocrExtract: { 'Business Name': 'Desai Jewellers', 'Owner': 'Anita Desai', 'Instrument Type': 'Electronic Weighing Scale', 'Make': 'Shimadzu UX-420H', 'Sensitivity': '0.001g' },
    assignedOfficerId: 'USR-006', scheduleDate: '2026-09-02',
    fieldVerification: { gps: { lat: 23.0225, lng: 72.5714 }, photos: ['lab_scale_front.jpg', 'weights_test.jpg'], notes: 'Micro-balance calibrated with Class E2 test weights. Corner load error within 0.002g.' },
    decision: null, decisionDate: null, decisionReason: null,
    certificateId: null, createdAt: '2026-07-15',
  },
];

// ─── CERTIFICATES ──────────────────────────────────────────────
export const certificates = [
  {
    id: 'CERT-001', applicationId: 'APP-001', instrumentId: 'INS-001',
    qrPayload: JSON.stringify({ cert: 'CERT-001', instrument: 'INS-001', owner: 'Rajesh Kumar', type: 'Electronic Weighing Scale', verified: '2025-09-01', expires: '2026-09-01', authority: 'Legal Metrology Dept — Delhi' }),
    issueDate: '2025-09-01', expiryDate: '2026-09-01', status: 'active',
  },
  {
    id: 'CERT-002', applicationId: 'APP-004', instrumentId: 'INS-004',
    qrPayload: JSON.stringify({ cert: 'CERT-002', instrument: 'INS-004', owner: 'Priya Sharma', type: 'Electronic Weighing Scale', verified: '2025-07-15', expires: '2026-07-15', authority: 'Legal Metrology Dept — Mumbai' }),
    issueDate: '2025-07-15', expiryDate: '2026-07-15', status: 'expiring',
  },
  {
    id: 'CERT-003', applicationId: 'APP-006', instrumentId: 'INS-007',
    qrPayload: JSON.stringify({ cert: 'CERT-003', instrument: 'INS-007', owner: 'Mohammed Iqbal', type: 'Fuel Dispensing Unit', verified: '2025-06-10', expires: '2026-12-10', authority: 'Legal Metrology Dept — Hyderabad' }),
    issueDate: '2025-06-10', expiryDate: '2026-12-10', status: 'active',
  },
  {
    id: 'CERT-004', applicationId: 'APP-008', instrumentId: 'INS-010',
    qrPayload: JSON.stringify({ cert: 'CERT-004', instrument: 'INS-010', owner: 'Anita Desai', type: 'Beam Balance', verified: '2025-12-05', expires: '2026-12-05', authority: 'Legal Metrology Dept — Ahmedabad' }),
    issueDate: '2025-12-05', expiryDate: '2026-12-05', status: 'active',
  },
  {
    id: 'CERT-005', applicationId: 'APP-009', instrumentId: 'INS-013',
    qrPayload: JSON.stringify({ cert: 'CERT-005', instrument: 'INS-013', owner: 'Suresh Patel', type: 'Platform Scale', verified: '2025-08-15', expires: '2026-08-15', authority: 'Legal Metrology Dept — Pune' }),
    issueDate: '2025-08-15', expiryDate: '2026-08-15', status: 'expiring',
  },
  {
    id: 'CERT-006', applicationId: null, instrumentId: 'INS-005',
    qrPayload: JSON.stringify({ cert: 'CERT-006', instrument: 'INS-005', owner: 'Priya Sharma', type: 'Platform Scale', verified: '2025-04-01', expires: '2026-04-01', authority: 'Legal Metrology Dept — Mumbai', status: 'EXPIRED' }),
    issueDate: '2025-04-01', expiryDate: '2026-04-01', status: 'expired',
  },
];

// ─── AUDIT LOG ─────────────────────────────────────────────────
export const auditLogs = [
  { id: 'AUD-001', actorId: 'USR-001', action: 'Registered Instrument', targetId: 'INS-001', details: 'Electronic Weighing Scale — Kumar General Store', timestamp: '2025-08-15T10:30:00Z' },
  { id: 'AUD-002', actorId: 'USR-001', action: 'Submitted Application', targetId: 'APP-001', details: 'Verification request for INS-001', timestamp: '2025-08-15T10:35:00Z' },
  { id: 'AUD-003', actorId: 'USR-009', action: 'Assigned Officer', targetId: 'APP-001', details: 'Assigned to Inspector Vikram Singh', timestamp: '2025-08-20T09:15:00Z' },
  { id: 'AUD-004', actorId: 'USR-006', action: 'Completed Field Verification', targetId: 'APP-001', details: 'GPS captured, 3 photos, checklist passed', timestamp: '2025-08-28T14:30:00Z' },
  { id: 'AUD-005', actorId: 'USR-006', action: 'Verified Instrument', targetId: 'APP-001', details: 'Decision: Verified — meets legal standards', timestamp: '2025-09-01T11:00:00Z' },
  { id: 'AUD-006', actorId: 'SYSTEM', action: 'Certificate Issued', targetId: 'CERT-001', details: 'Certificate generated for INS-001', timestamp: '2025-09-01T11:01:00Z' },
  { id: 'AUD-007', actorId: 'USR-002', action: 'Registered Instrument', targetId: 'INS-004', details: 'Electronic Weighing Scale — Sharma Kirana', timestamp: '2025-06-20T09:00:00Z' },
  { id: 'AUD-008', actorId: 'USR-007', action: 'Verified Instrument', targetId: 'APP-004', details: 'Decision: Verified', timestamp: '2025-07-15T16:00:00Z' },
  { id: 'AUD-009', actorId: 'USR-003', action: 'Registered Instrument', targetId: 'INS-007', details: 'Fuel Dispensing Unit — Iqbal Fuel Station', timestamp: '2025-05-15T08:30:00Z' },
  { id: 'AUD-010', actorId: 'USR-008', action: 'Verified Instrument', targetId: 'APP-006', details: 'Decision: Verified — dispenser calibration OK', timestamp: '2025-06-10T15:45:00Z' },
  { id: 'AUD-011', actorId: 'USR-007', action: 'Rejected Instrument', targetId: 'APP-010', details: 'Spring balance failed accuracy test', timestamp: '2026-06-20T10:30:00Z' },
  { id: 'AUD-012', actorId: 'USR-001', action: 'Registered Instrument', targetId: 'INS-002', details: 'Counter Scale — Kumar General Store', timestamp: '2026-07-10T11:00:00Z' },
  { id: 'AUD-013', actorId: 'USR-001', action: 'Submitted Application', targetId: 'APP-002', details: 'Verification request for INS-002', timestamp: '2026-07-10T11:05:00Z' },
  { id: 'AUD-014', actorId: 'USR-009', action: 'Assigned Officer', targetId: 'APP-002', details: 'Assigned to Inspector Vikram Singh', timestamp: '2026-07-15T09:00:00Z' },
  { id: 'AUD-015', actorId: 'USR-001', action: 'Submitted Application', targetId: 'APP-003', details: 'Verification request for INS-003', timestamp: '2026-08-20T14:00:00Z' },
  { id: 'AUD-016', actorId: 'USR-002', action: 'Uploaded Documents', targetId: 'APP-005', details: '2 documents uploaded for measuring tape', timestamp: '2026-08-03T10:00:00Z' },
  { id: 'AUD-017', actorId: 'USR-009', action: 'Assigned Officer', targetId: 'APP-007', details: 'Assigned to Inspector Arjun Nair', timestamp: '2026-08-27T09:30:00Z' },
  { id: 'AUD-018', actorId: 'SYSTEM', action: 'Expiry Alert', targetId: 'CERT-001', details: 'Certificate expiring in 30 days', timestamp: '2026-08-01T00:00:00Z' },
  { id: 'AUD-019', actorId: 'SYSTEM', action: 'Expiry Alert', targetId: 'CERT-005', details: 'Certificate expiring in 30 days', timestamp: '2026-07-15T00:00:00Z' },
  { id: 'AUD-020', actorId: 'USR-004', action: 'Registered Instrument', targetId: 'INS-012', details: 'Weights Set — Desai Jewellers', timestamp: '2026-08-30T16:00:00Z' },
];

// ─── CHART DATA (for Admin dashboard) ──────────────────────────
export const chartData = {
  applicationsOverTime: [
    { month: 'Mar 2026', applications: 3, verified: 2, rejected: 1 },
    { month: 'Apr 2026', applications: 5, verified: 3, rejected: 0 },
    { month: 'May 2026', applications: 4, verified: 4, rejected: 0 },
    { month: 'Jun 2026', applications: 7, verified: 4, rejected: 1 },
    { month: 'Jul 2026', applications: 6, verified: 3, rejected: 0 },
    { month: 'Aug 2026', applications: 8, verified: 2, rejected: 0 },
  ],
  statusBreakdown: [
    { name: 'Certified', value: 5, color: '#16a34a' },
    { name: 'Pending', value: 4, color: '#f59e0b' },
    { name: 'Field Verification', value: 2, color: '#8b5cf6' },
    { name: 'Rejected', value: 1, color: '#dc2626' },
    { name: 'Expired', value: 1, color: '#6b7280' },
    { name: 'Re-Verification', value: 1, color: '#eab308' },
  ],
  officerWorkload: [
    { name: 'Vikram Singh', assigned: 4, completed: 2, pending: 2 },
    { name: 'Meena Rao', assigned: 4, completed: 2, pending: 2 },
    { name: 'Arjun Nair', assigned: 3, completed: 1, pending: 2 },
  ],
};
