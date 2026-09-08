// Canonical lifecycle stages — used consistently across all screens
export const LIFECYCLE_STAGES = [
  { key: 'registered', label: 'Instrument Registered', step: 1 },
  { key: 'submitted', label: 'Application Submitted', step: 2 },
  { key: 'documents_uploaded', label: 'Documents Uploaded', step: 3 },
  { key: 'officer_assigned', label: 'Officer Assigned', step: 4 },
  { key: 'field_verification', label: 'Field Verification', step: 5 },
  { key: 'decision', label: 'Decision', step: 6 },
  { key: 'certified', label: 'Certificate Issued', step: 7 },
  { key: 'tracking', label: 'Tracking & Alerts', step: 8 },
  { key: 'reverification', label: 'Re-Verification', step: 9 },
];

// Status colors mapping for StatusBadge
export const STATUS_CONFIG = {
  registered:         { color: 'bg-blue-100 text-blue-800', label: 'Registered' },
  submitted:          { color: 'bg-amber-100 text-amber-800', label: 'Submitted' },
  documents_uploaded: { color: 'bg-amber-100 text-amber-800', label: 'Documents Uploaded' },
  officer_assigned:   { color: 'bg-indigo-100 text-indigo-800', label: 'Officer Assigned' },
  field_verification: { color: 'bg-purple-100 text-purple-800', label: 'Field Verification' },
  decision:           { color: 'bg-orange-100 text-orange-800', label: 'Under Decision' },
  verified:           { color: 'bg-green-100 text-green-800', label: 'Verified' },
  certified:          { color: 'bg-green-100 text-green-800', label: 'Certified' },
  rejected:           { color: 'bg-red-100 text-red-800', label: 'Rejected' },
  expired:            { color: 'bg-gray-100 text-gray-600', label: 'Expired' },
  tracking:           { color: 'bg-teal-100 text-teal-800', label: 'Active' },
  reverification:     { color: 'bg-yellow-100 text-yellow-800', label: 'Re-Verification Due' },
  pending:            { color: 'bg-amber-100 text-amber-800', label: 'Pending' },
};

// Instrument types
export const INSTRUMENT_TYPES = [
  'Electronic Weighing Scale',
  'Mechanical Weighing Scale',
  'Platform Scale',
  'Counter Scale',
  'Beam Balance',
  'Spring Balance',
  'Fuel Dispensing Unit',
  'Water Meter',
  'Measuring Tape',
  'Weights (Standard Set)',
  'Capacity Measure',
  'Length Measure',
];

// Regions for filtering
export const REGIONS = [
  'Delhi NCR',
  'Mumbai',
  'Kolkata',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Lucknow',
];

// Verification checklist items for officers
export const VERIFICATION_CHECKLIST = [
  { id: 'vc1', label: 'Instrument physically present and accessible', required: true },
  { id: 'vc2', label: 'Serial number matches registration', required: true },
  { id: 'vc3', label: 'No visible signs of tampering', required: true },
  { id: 'vc4', label: 'Accuracy test passed (within tolerance)', required: true },
  { id: 'vc5', label: 'Seals intact and valid', required: true },
  { id: 'vc6', label: 'Calibration markings visible', required: false },
  { id: 'vc7', label: 'Environmental conditions acceptable', required: false },
  { id: 'vc8', label: 'Previous certificate verified', required: false },
];

// Role definitions
export const ROLES = {
  applicant: { label: 'Applicant', description: 'Shopkeeper / Trader / Manufacturer' },
  officer: { label: 'LMO/GATC Officer', description: 'Field Verification Officer' },
  admin: { label: 'Admin', description: 'Legal Metrology Department' },
};

// Navigation items per role
export const NAV_ITEMS = {
  applicant: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { key: 'register', label: 'Register Instrument', icon: 'Plus' },
    { key: 'applications', label: 'My Applications', icon: 'FileText' },
    { key: 'certificates', label: 'Certificates', icon: 'Award' },
    { key: 'alerts', label: 'Alerts', icon: 'Bell' },
  ],
  officer: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { key: 'queue', label: 'Assigned Queue', icon: 'ClipboardList' },
    { key: 'verification', label: 'Field Verification', icon: 'CheckSquare' },
    { key: 'schedule', label: 'Schedule', icon: 'Calendar' },
  ],
  admin: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { key: 'registry', label: 'Instrument Registry', icon: 'Database' },
    { key: 'audit', label: 'Audit Log', icon: 'ScrollText' },
    { key: 'users', label: 'User Management', icon: 'Users' },
  ],
};
