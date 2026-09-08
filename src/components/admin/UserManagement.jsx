import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../data/services';
import StatusBadge from '../common/StatusBadge';
import Modal from '../common/Modal';
import { Users, UserPlus, Shield, Edit, Search } from 'lucide-react';
import { ROLES, REGIONS } from '../../utils/constants';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'applicant', region: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    }
    load();
  }, []);

  const tabs = [
    { key: 'all', label: 'All', count: users.length },
    { key: 'applicant', label: 'Applicants', count: users.filter((u) => u.role === 'applicant').length },
    { key: 'officer', label: 'Officers', count: users.filter((u) => u.role === 'officer').length },
    { key: 'admin', label: 'Admins', count: users.filter((u) => u.role === 'admin').length },
  ];

  const filtered = users.filter((u) => {
    if (activeTab !== 'all' && u.role !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.businessName.toLowerCase().includes(q);
    }
    return true;
  });

  const roleBadgeColors = {
    applicant: 'bg-blue-100 text-blue-800',
    officer: 'bg-purple-100 text-purple-800',
    admin: 'bg-navy-100 text-navy-800',
  };

  // TODO: Connect to real user management API
  const handleAddUser = () => {
    setSuccessMsg(`User "${newUser.name}" added successfully (mock).`);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', phone: '', role: 'applicant', region: '' });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Users className="w-7 h-7 text-navy-600" />
          <div>
            <h1 className="text-2xl font-bold text-navy-600">User Management</h1>
            <p className="text-gray-500 text-sm">{users.length} registered users</p>
          </div>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
          ✅ {successMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-white text-navy-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label} <span className="text-xs text-gray-400 ml-1">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by name, email, or business..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Business / Dept</th>
              <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Email</th>
              <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Phone</th>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
              <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Region</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">No users found.</td>
              </tr>
            ) : (
              filtered.map((user, i) => (
                <tr key={user.id} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-xs font-bold text-navy-600">
                        {user.avatar}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">{user.businessName}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleBadgeColors[user.role]}`}>
                      {ROLES[user.role]?.label || user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{user.region}</td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-600" title="Edit User">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New User" size="md">
        <div className="space-y-4">
          <div>
            <label className="label-text">Full Name</label>
            <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="input-field" placeholder="Enter full name" />
          </div>
          <div>
            <label className="label-text">Email</label>
            <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="input-field" placeholder="Enter email" />
          </div>
          <div>
            <label className="label-text">Phone</label>
            <input type="tel" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} className="input-field" placeholder="Enter phone number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Role</label>
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="input-field">
                {Object.entries(ROLES).map(([key, r]) => <option key={key} value={key}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label-text">Region</label>
              <select value={newUser.region} onChange={(e) => setNewUser({ ...newUser, region: e.target.value })} className="input-field">
                <option value="">Select...</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleAddUser} disabled={!newUser.name || !newUser.email} className="btn-primary">Add User</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
