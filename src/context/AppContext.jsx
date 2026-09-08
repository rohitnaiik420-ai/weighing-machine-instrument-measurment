import React, { createContext, useContext, useState, useCallback } from 'react';
import { users } from '../data/mockData';

const AppContext = createContext(null);

// Default users for each role (for demo role switching)
const DEFAULT_USERS = {
  applicant: users.find((u) => u.id === 'USR-001'), // Rajesh Kumar
  officer: users.find((u) => u.id === 'USR-006'),   // Inspector Vikram Singh
  admin: users.find((u) => u.id === 'USR-009'),     // Dr. Kavita Mehta
};

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USERS.applicant);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 'n1', message: 'Certificate for Electronic Weighing Scale expires in 30 days', type: 'warning', read: false, timestamp: '2026-08-01' },
    { id: 'n2', message: 'Application APP-002 assigned to Inspector Vikram Singh', type: 'info', read: false, timestamp: '2026-07-15' },
    { id: 'n3', message: 'New application APP-003 submitted successfully', type: 'success', read: true, timestamp: '2026-08-20' },
  ]);

  // For data refresh triggers
  const [refreshKey, setRefreshKey] = useState(0);

  const switchRole = useCallback((role) => {
    setCurrentUser(DEFAULT_USERS[role] || DEFAULT_USERS.applicant);
    setActiveView('dashboard');
  }, []);

  const switchUser = useCallback((userId) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setActiveView('dashboard');
    }
  }, []);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [
      { id: `n${Date.now()}`, ...notification, read: false, timestamp: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const value = {
    currentUser,
    user: currentUser,
    allUsers: users,
    switchRole,
    switchUser,
    activeView,
    setActiveView,
    sidebarOpen,
    setSidebarOpen,
    notifications,
    markNotificationRead,
    addNotification,
    refreshKey,
    triggerRefresh,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export default AppContext;
