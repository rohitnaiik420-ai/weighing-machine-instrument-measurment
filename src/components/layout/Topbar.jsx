import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ROLES } from '../../utils/constants';
import { Menu, Bell, ChevronDown, Shield, Sparkles } from 'lucide-react';
import DemoScenarioModal from '../common/DemoScenarioModal';

export default function Topbar() {
  const { currentUser, switchRole, switchUser, allUsers, setSidebarOpen, notifications, markNotificationRead, activeView } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const roleRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) setShowRoleMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const roleLabel = ROLES[currentUser.role]?.label || currentUser.role;
  const viewLabel = activeView.charAt(0).toUpperCase() + activeView.slice(1).replace(/_/g, ' ');

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Left: hamburger + breadcrumb */}
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-navy-400" />
            <span className="text-gray-500">{roleLabel}</span>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-navy-600">{viewLabel}</span>
          </div>
          <span className="sm:hidden text-base font-bold text-navy-600">TRUEMEASURE</span>
        </div>

        {/* Right: Test scenarios button + role switcher + notifications + avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Test Scenarios Trigger Button */}
          <button
            onClick={() => setShowScenarioModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-brand-blue text-xs font-bold hover:from-blue-100 hover:to-indigo-100 transition-all shadow-sm"
            title="Open Interactive Demo Scenarios"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span className="hidden sm:inline">Test Scenarios</span>
            <span className="sm:hidden">Test</span>
          </button>

          {/* Role Switcher */}
          <div ref={roleRef} className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 text-navy-700 text-sm font-medium hover:bg-navy-100 transition-colors"
            >
              <span className="hidden sm:inline">{roleLabel}</span>
              <span className="sm:hidden text-xs">{currentUser.avatar}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase">Switch Role (Demo)</p>
                {Object.entries(ROLES).map(([key, role]) => (
                  <button
                    key={key}
                    onClick={() => { switchRole(key); setShowRoleMenu(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${currentUser.role === key ? 'bg-blue-50 text-brand-blue font-semibold' : 'text-gray-700'}`}
                  >
                    <div>
                      <div>{role.label}</div>
                      <div className="text-xs text-gray-400">{role.description}</div>
                    </div>
                    {currentUser.role === key && <span className="text-brand-blue text-xs">Active</span>}
                  </button>
                ))}

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <div className="px-4 py-1 flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Specific Personas</p>
                    <button
                      onClick={() => { setShowRoleMenu(false); setShowScenarioModal(true); }}
                      className="text-[10px] text-brand-blue font-semibold hover:underline"
                    >
                      View All Scenarios →
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {allUsers?.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => { switchUser(u.id); setShowRoleMenu(false); }}
                        className={`w-full text-left px-4 py-1.5 text-xs hover:bg-gray-50 flex items-center justify-between ${currentUser.id === u.id ? 'font-bold text-navy-700 bg-gray-100' : 'text-gray-600'}`}
                      >
                        <div className="truncate">
                          <span className="font-medium text-gray-900">{u.name}</span>
                          <span className="text-gray-400 ml-1">({u.region})</span>
                          <div className="text-[10px] text-gray-400 truncate">{u.businessName}</div>
                        </div>
                        {currentUser.id === u.id && <span className="text-brand-blue text-[10px] ml-2">●</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto">
                <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase">Notifications</p>
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-gray-400 text-center">No notifications</p>
                ) : (
                  notifications.slice(0, 8).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 border-b border-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start gap-2">
                        {!n.read && <span className="w-2 h-2 bg-brand-blue rounded-full mt-1.5 flex-shrink-0" />}
                        <div>
                          <p className={`${!n.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{n.timestamp}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div
            onClick={() => setShowScenarioModal(true)}
            className="w-9 h-9 rounded-full bg-navy-600 text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:ring-2 hover:ring-brand-blue transition-all"
            title={`Active: ${currentUser.name} (${currentUser.role}). Click to switch test scenario`}
          >
            {currentUser.avatar}
          </div>
        </div>
      </header>

      {/* Test Scenarios Interactive Modal */}
      <DemoScenarioModal
        isOpen={showScenarioModal}
        onClose={() => setShowScenarioModal(false)}
      />
    </>
  );
}
