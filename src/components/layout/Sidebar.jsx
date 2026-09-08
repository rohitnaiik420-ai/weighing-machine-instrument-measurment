import React from 'react';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from '../../utils/constants';
import {
  LayoutDashboard, Plus, FileText, Award, Bell,
  ClipboardList, CheckSquare, Calendar,
  Database, ScrollText, Users, X, Scale
} from 'lucide-react';

const ICON_MAP = {
  LayoutDashboard, Plus, FileText, Award, Bell,
  ClipboardList, CheckSquare, Calendar,
  Database, ScrollText, Users,
};

export default function Sidebar() {
  const { currentUser, activeView, setActiveView, sidebarOpen, setSidebarOpen } = useApp();
  const navItems = NAV_ITEMS[currentUser.role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy-600 text-white z-50 flex flex-col transition-transform duration-300 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-navy-500">
          <button className="absolute top-4 right-4 lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">TRUEMEASURE</h1>
              <div className="w-12 h-0.5 bg-brand-blue rounded-full mt-1" />
            </div>
          </div>
          <p className="text-xs text-navy-200 mt-2">Digital Verification Platform</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setActiveView(item.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-white/15 text-white'
                    : 'text-navy-200 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-navy-500">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-sm font-bold">
              {currentUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-navy-300 truncate">{currentUser.businessName}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
