import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useApp } from '../../context/AppContext';

export default function DashboardLayout({ children }) {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {/* Main content area - offset by sidebar width on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-3 text-center text-xs text-gray-400">
          TRUEMEASURE © 2026 — Legal Metrology Department, Ministry of Consumer Affairs — SIH 2026 PS26036
        </footer>
      </div>
    </div>
  );
}
