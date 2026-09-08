import React, { useState, useEffect } from 'react';
import { getAuditLogs, getAllUsers } from '../../data/services';
import DataTable from '../common/DataTable';
import { formatDateTime } from '../../utils/helpers';
import { ScrollText, Filter } from 'lucide-react';

const ACTION_COLORS = {
  'Registered Instrument': 'text-blue-600',
  'Submitted Application': 'text-indigo-600',
  'Uploaded Documents': 'text-purple-600',
  'Assigned Officer': 'text-sky-600',
  'Completed Field Verification': 'text-teal-600',
  'Verified Instrument': 'text-green-600',
  'Rejected Instrument': 'text-red-600',
  'Certificate Issued': 'text-green-700',
  'Expiry Alert': 'text-amber-600',
};

export default function AuditLogViewer() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('');
  const [filterActor, setFilterActor] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [logData, userData] = await Promise.all([getAuditLogs(), getAllUsers()]);
      setLogs(logData);
      setUsers(userData);
      setLoading(false);
    }
    load();
  }, []);

  const getUserName = (id) => {
    if (id === 'SYSTEM') return '🤖 System';
    const u = users.find((u) => u.id === id);
    return u ? u.name : id;
  };

  const actionTypes = [...new Set(logs.map((l) => l.action))];

  const filtered = logs.filter((l) => {
    if (filterAction && l.action !== filterAction) return false;
    if (filterActor && l.actorId !== filterActor) return false;
    return true;
  });

  const columns = [
    {
      key: 'timestamp',
      label: 'Timestamp',
      sortable: true,
      render: (val) => <span className="text-xs text-gray-500 whitespace-nowrap">{formatDateTime(val)}</span>,
    },
    {
      key: 'actorId',
      label: 'Actor',
      render: (val) => <span className="font-medium text-sm">{getUserName(val)}</span>,
    },
    {
      key: 'action',
      label: 'Action',
      render: (val) => (
        <span className={`font-semibold text-sm ${ACTION_COLORS[val] || 'text-gray-700'}`}>
          {val}
        </span>
      ),
    },
    { key: 'targetId', label: 'Target ID', render: (val) => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{val}</code> },
    { key: 'details', label: 'Details', render: (val) => <span className="text-sm text-gray-600 max-w-xs truncate block">{val}</span> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ScrollText className="w-7 h-7 text-navy-600" />
        <div>
          <h1 className="text-2xl font-bold text-navy-600">Audit Log</h1>
          <p className="text-gray-500 text-sm">{filtered.length} entries</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={filterActor} onChange={(e) => setFilterActor(e.target.value)} className="input-field w-auto min-w-[180px]">
            <option value="">All Actors</option>
            {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            <option value="SYSTEM">System</option>
          </select>
          <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="input-field w-auto min-w-[200px]">
            <option value="">All Actions</option>
            {actionTypes.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          {(filterAction || filterActor) && (
            <button onClick={() => { setFilterAction(''); setFilterActor(''); }} className="btn-secondary text-sm">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchable
        searchPlaceholder="Search audit logs..."
        emptyMessage="No audit log entries match your filters."
      />
    </div>
  );
}
