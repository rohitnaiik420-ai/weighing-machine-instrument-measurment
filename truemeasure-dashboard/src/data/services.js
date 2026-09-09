/**
 * TRUEMEASURE Service Module
 * 
 * Swappable data access layer. Currently backed by in-memory mock data.
 * To connect a real backend, replace each function's implementation with
 * fetch('/api/...') calls — component code stays untouched.
 * 
 * All functions return Promises to simulate async API behavior.
 * 
 * TODO: Replace with real FastAPI + PostgreSQL backend calls
 */

import { users, instruments, applications, certificates, auditLogs, chartData } from './mockData';

// Simulate network delay (50-150ms)
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, Math.random() * ms + 50));

// ─── USER SERVICES ─────────────────────────────────────────────

export async function getUserById(userId) {
  await delay();
  return users.find((u) => u.id === userId) || null;
}

export async function getUsersByRole(role) {
  await delay();
  return users.filter((u) => u.role === role);
}

export async function getAllUsers() {
  await delay();
  return [...users];
}

// ─── INSTRUMENT SERVICES ───────────────────────────────────────

export async function getInstrumentsByOwner(ownerId) {
  await delay();
  return instruments.filter((i) => i.ownerId === ownerId);
}

export async function getInstrumentById(instrumentId) {
  await delay();
  return instruments.find((i) => i.id === instrumentId) || null;
}

export async function getAllInstruments() {
  await delay();
  return [...instruments];
}

export async function registerInstrument(data) {
  await delay(200);
  const newInstrument = {
    id: `INS-${String(instruments.length + 1).padStart(3, '0')}`,
    ...data,
    registrationDate: new Date().toISOString().split('T')[0],
    status: 'registered',
    lastVerifiedDate: null,
    expiryDate: null,
  };
  instruments.push(newInstrument);
  return newInstrument;
}

// ─── APPLICATION SERVICES ──────────────────────────────────────

export async function getApplicationsByApplicant(applicantId) {
  await delay();
  return applications.filter((a) => a.applicantId === applicantId);
}

export async function getApplicationsByOfficer(officerId) {
  await delay();
  return applications.filter((a) => a.assignedOfficerId === officerId);
}

export async function getApplicationById(applicationId) {
  await delay();
  return applications.find((a) => a.id === applicationId) || null;
}

export async function getAllApplications() {
  await delay();
  return [...applications];
}

export async function createApplication(data) {
  await delay(200);
  const newApp = {
    id: `APP-${String(applications.length + 1).padStart(3, '0')}`,
    ...data,
    status: 'submitted',
    documents: data.documents || [],
    ocrExtract: data.ocrExtract || {},
    assignedOfficerId: null,
    scheduleDate: null,
    fieldVerification: null,
    decision: null,
    decisionDate: null,
    decisionReason: null,
    certificateId: null,
    createdAt: new Date().toISOString().split('T')[0],
  };
  applications.push(newApp);

  // Update instrument status
  const inst = instruments.find((i) => i.id === data.instrumentId);
  if (inst) inst.status = 'submitted';

  return newApp;
}

export async function updateApplicationStatus(applicationId, status, details = {}) {
  await delay(200);
  const app = applications.find((a) => a.id === applicationId);
  if (!app) throw new Error('Application not found');

  app.status = status;
  Object.assign(app, details);

  // Sync instrument status
  const inst = instruments.find((i) => i.id === app.instrumentId);
  if (inst) {
    if (status === 'verified' || status === 'certified') {
      inst.status = 'certified';
      inst.lastVerifiedDate = new Date().toISOString().split('T')[0];
      inst.expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    } else if (status === 'rejected') {
      inst.status = 'rejected';
    } else {
      inst.status = status;
    }
  }

  return app;
}

export async function assignOfficer(applicationId, officerId, scheduleDate) {
  await delay(200);
  const app = applications.find((a) => a.id === applicationId);
  if (!app) throw new Error('Application not found');

  app.assignedOfficerId = officerId;
  app.scheduleDate = scheduleDate;
  app.status = 'officer_assigned';

  const inst = instruments.find((i) => i.id === app.instrumentId);
  if (inst) inst.status = 'officer_assigned';

  return app;
}

export async function submitFieldVerification(applicationId, verificationData) {
  await delay(200);
  const app = applications.find((a) => a.id === applicationId);
  if (!app) throw new Error('Application not found');

  app.fieldVerification = verificationData;
  app.status = 'decision';

  const inst = instruments.find((i) => i.id === app.instrumentId);
  if (inst) inst.status = 'decision';

  return app;
}

export async function submitDecision(applicationId, decision, reason) {
  await delay(200);
  const app = applications.find((a) => a.id === applicationId);
  if (!app) throw new Error('Application not found');

  app.decision = decision;
  app.decisionDate = new Date().toISOString().split('T')[0];
  app.decisionReason = reason;

  if (decision === 'verified') {
    app.status = 'certified';
    // Create certificate
    const cert = {
      id: `CERT-${String(certificates.length + 1).padStart(3, '0')}`,
      applicationId: app.id,
      instrumentId: app.instrumentId,
      qrPayload: JSON.stringify({
        cert: `CERT-${String(certificates.length + 1).padStart(3, '0')}`,
        instrument: app.instrumentId,
        verified: new Date().toISOString().split('T')[0],
        authority: 'Legal Metrology Department',
      }),
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
    };
    certificates.push(cert);
    app.certificateId = cert.id;

    // Update instrument
    const inst = instruments.find((i) => i.id === app.instrumentId);
    if (inst) {
      inst.status = 'certified';
      inst.lastVerifiedDate = cert.issueDate;
      inst.expiryDate = cert.expiryDate;
    }
  } else {
    app.status = 'rejected';
    const inst = instruments.find((i) => i.id === app.instrumentId);
    if (inst) inst.status = 'rejected';
  }

  // Add audit log
  auditLogs.unshift({
    id: `AUD-${String(auditLogs.length + 1).padStart(3, '0')}`,
    actorId: app.assignedOfficerId,
    action: decision === 'verified' ? 'Verified Instrument' : 'Rejected Instrument',
    targetId: app.id,
    details: reason,
    timestamp: new Date().toISOString(),
  });

  return app;
}

// ─── CERTIFICATE SERVICES ──────────────────────────────────────

export async function getCertificatesByOwner(ownerId) {
  await delay();
  const ownerInstrumentIds = instruments.filter((i) => i.ownerId === ownerId).map((i) => i.id);
  return certificates.filter((c) => ownerInstrumentIds.includes(c.instrumentId));
}

export async function getCertificateById(certId) {
  await delay();
  return certificates.find((c) => c.id === certId) || null;
}

export async function getAllCertificates() {
  await delay();
  return [...certificates];
}

// ─── AUDIT LOG SERVICES ───────────────────────────────────────

export async function getAuditLogs(filters = {}) {
  await delay();
  let logs = [...auditLogs];
  if (filters.actorId) logs = logs.filter((l) => l.actorId === filters.actorId);
  if (filters.action) logs = logs.filter((l) => l.action.toLowerCase().includes(filters.action.toLowerCase()));
  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export async function addAuditLog(entry) {
  await delay();
  const log = {
    id: `AUD-${String(auditLogs.length + 1).padStart(3, '0')}`,
    ...entry,
    timestamp: new Date().toISOString(),
  };
  auditLogs.unshift(log);
  return log;
}

// ─── KPI / ANALYTICS SERVICES ──────────────────────────────────

export async function getKPIs() {
  await delay();
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  return {
    totalInstruments: instruments.length,
    pendingVerifications: applications.filter((a) =>
      ['submitted', 'documents_uploaded', 'officer_assigned', 'field_verification', 'decision'].includes(a.status)
    ).length,
    verifiedThisMonth: applications.filter((a) => {
      if (a.decision !== 'verified') return false;
      const d = new Date(a.decisionDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    expiringIn30Days: certificates.filter((c) => {
      const exp = new Date(c.expiryDate);
      return exp > now && exp <= thirtyDaysFromNow;
    }).length,
    activeOfficers: users.filter((u) => u.role === 'officer').length,
  };
}

export async function getChartData() {
  await delay();
  return chartData;
}
