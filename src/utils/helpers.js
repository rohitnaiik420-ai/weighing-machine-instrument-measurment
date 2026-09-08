/**
 * Utility helper functions for TRUEMEASURE dashboard
 */

// Format date to readable string
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Format date with time
export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Calculate days until a date (positive = future, negative = past)
export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Generate a simple unique ID
let idCounter = 1000;
export function generateId(prefix = 'TM') {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${idCounter}`;
}

// Get lifecycle step number from status string
export function getStepFromStatus(status) {
  const map = {
    registered: 1,
    submitted: 2,
    documents_uploaded: 3,
    officer_assigned: 4,
    field_verification: 5,
    decision: 6,
    verified: 7,
    certified: 7,
    tracking: 8,
    reverification: 9,
    rejected: 6,
    expired: 8,
  };
  return map[status] || 1;
}

// Truncate text
export function truncate(str, maxLen = 40) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}

// Mock GPS coordinates near Indian cities
export function getMockGPS() {
  const locations = [
    { lat: 28.6139, lng: 77.2090, label: 'New Delhi' },
    { lat: 19.0760, lng: 72.8777, label: 'Mumbai' },
    { lat: 22.5726, lng: 88.3639, label: 'Kolkata' },
    { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
    { lat: 12.9716, lng: 77.5946, label: 'Bengaluru' },
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

// Format currency (INR)
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Search filter helper — checks if any value in an object matches a query
export function matchesSearch(obj, query) {
  if (!query) return true;
  const lowerQuery = query.toLowerCase();
  return Object.values(obj).some((val) => {
    if (typeof val === 'string') return val.toLowerCase().includes(lowerQuery);
    if (typeof val === 'number') return val.toString().includes(lowerQuery);
    return false;
  });
}
