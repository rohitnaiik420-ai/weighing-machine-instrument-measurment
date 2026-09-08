import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Applicant components
import ApplicantDashboard from './components/applicant/ApplicantDashboard';
import InstrumentRegistration from './components/applicant/InstrumentRegistration';
import ApplicationTracker from './components/applicant/ApplicationTracker';
import CertificateView from './components/applicant/CertificateView';
import ExpiryAlerts from './components/applicant/ExpiryAlerts';

// Officer components
import OfficerDashboard from './components/officer/OfficerDashboard';
import AssignedQueue from './components/officer/AssignedQueue';
import FieldVerification from './components/officer/FieldVerification';
import ScheduleCalendar from './components/officer/ScheduleCalendar';

// Admin components
import AdminDashboard from './components/admin/AdminDashboard';
import InstrumentRegistry from './components/admin/InstrumentRegistry';
import AuditLogViewer from './components/admin/AuditLogViewer';
import UserManagement from './components/admin/UserManagement';

function AppContent() {
  const { currentUser, activeView } = useApp();
  
  const renderContent = () => {
    const role = currentUser?.role || 'applicant';
    
    if (role === 'applicant') {
      switch (activeView) {
        case 'dashboard': return <ApplicantDashboard />;
        case 'register': return <InstrumentRegistration />;
        case 'applications': return <ApplicationTracker />;
        case 'certificates': return <CertificateView />;
        case 'alerts': return <ExpiryAlerts />;
        default: return <ApplicantDashboard />;
      }
    }
    
    if (role === 'officer') {
      switch (activeView) {
        case 'dashboard': return <OfficerDashboard />;
        case 'queue': return <AssignedQueue />;
        case 'verification': return <AssignedQueue />;
        case 'schedule': return <ScheduleCalendar />;
        default: return <OfficerDashboard />;
      }
    }
    
    if (role === 'admin') {
      switch (activeView) {
        case 'dashboard': return <AdminDashboard />;
        case 'registry': return <InstrumentRegistry />;
        case 'audit': return <AuditLogViewer />;
        case 'users': return <UserManagement />;
        default: return <AdminDashboard />;
      }
    }
    
    return <ApplicantDashboard />;
  };
  
  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
