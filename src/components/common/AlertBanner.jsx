import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

const CONFIG = {
  info:    { icon: Info,          bg: 'bg-blue-50',   border: 'border-blue-200',  text: 'text-blue-800',   iconColor: 'text-blue-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50',  border: 'border-amber-200', text: 'text-amber-800',  iconColor: 'text-amber-500' },
  success: { icon: CheckCircle,   bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-800',  iconColor: 'text-green-500' },
  error:   { icon: XCircle,       bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-800',    iconColor: 'text-red-500' },
};

export default function AlertBanner({ type = 'info', message, onDismiss, action }) {
  const cfg = CONFIG[type] || CONFIG.info;
  const Icon = cfg.icon;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${cfg.bg} ${cfg.border}`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${cfg.iconColor}`} />
      <p className={`flex-1 text-sm font-medium ${cfg.text}`}>{message}</p>
      {action && (
        <button onClick={action.onClick} className={`text-sm font-semibold underline ${cfg.text} hover:opacity-80`}>
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button onClick={onDismiss} className={`${cfg.iconColor} hover:opacity-70`}>
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
