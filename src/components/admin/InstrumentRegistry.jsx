import React, { useState, useEffect } from 'react';
import { getAllInstruments, getAllUsers } from '../../data/services';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';
import { Download, Filter } from 'lucide-react';

export default function InstrumentRegistry() {
  const [instruments, setInstruments] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instData, userData] = await Promise.all([
          getAllInstruments(),
          getAllUsers()
        ]);
        setInstruments(instData);
        
        const userMap = userData.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});
        setUsers(userMap);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = () => {
    alert('Exporting CSV... (mock)');
  };

  const filteredInstruments = instruments.filter(inst => {
    if (statusFilter !== 'all' && inst.status !== statusFilter) return false;
    if (regionFilter !== 'all' && inst.region !== regionFilter) return false;
    
    if (expiryFilter !== 'all' && inst.expiryDate) {
      const expiry = new Date(inst.expiryDate);
      const now = new Date();
      const diffTime = expiry - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (expiryFilter === '30' && (diffDays < 0 || diffDays > 30)) return false;
      if (expiryFilter === '60' && (diffDays < 0 || diffDays > 60)) return false;
      if (expiryFilter === '90' && (diffDays < 0 || diffDays > 90)) return false;
    }
    return true;
  });

  const columns = [
    { key: 'id', header: 'ID', render: (val) => <span className="font-mono text-sm">{val}</span> },
    { key: 'type', header: 'Type' },
    { key: 'ownerId', header: 'Owner', render: (val) => users[val] || val },
    { key: 'region', header: 'Region' },
    { key: 'status', header: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'registrationDate', header: 'Registered', render: (val) => val ? formatDate(val) : 'N/A' },
    { key: 'expiryDate', header: 'Expiry', render: (val) => val ? formatDate(val) : 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy-600">Instrument Registry</h1>
        <button onClick={handleExport} className="btn-secondary flex items-center space-x-2">
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex items-center text-gray-500 mr-2">
          <Filter size={18} className="mr-2" />
          <span className="font-medium">Filters:</span>
        </div>
        
        <select 
          className="input-field py-1 h-10 w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>
        
        <select 
          className="input-field py-1 h-10 w-auto"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="all">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        
        <select 
          className="input-field py-1 h-10 w-auto"
          value={expiryFilter}
          onChange={(e) => setExpiryFilter(e.target.value)}
        >
          <option value="all">Any Expiry</option>
          <option value="30">Expiring in &lt; 30 days</option>
          <option value="60">Expiring in &lt; 60 days</option>
          <option value="90">Expiring in &lt; 90 days</option>
        </select>
      </div>

      {loading ? (
        <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
      ) : (
        <DataTable 
          data={filteredInstruments}
          columns={columns}
          keyField="id"
          onRowClick={(row) => console.log('Clicked row', row)}
        />
      )}
    </div>
  );
}
