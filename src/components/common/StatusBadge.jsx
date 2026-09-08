import React from 'react';
import { STATUS_CONFIG } from '../../utils/constants';

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG?.[status] || {
    label: status || 'Unknown',
    color: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
