import React from 'react';

const StatCard = ({
  icon,
  label,
  title,
  value,
  trend,
  color = 'bg-navy-100 text-navy-600',
  iconBg,
}) => {
  const displayTitle = label || title || '';
  const isPositive = trend && String(trend).startsWith('+');
  const isNegative = trend && String(trend).startsWith('-');

  // Render icon whether it's passed as a React component function or as an instantiated JSX element
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComponent = icon;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-xl flex items-center justify-center ${iconBg || color}`}>
          {renderIcon()}
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-green-100 text-green-700'
                : isNegative
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{displayTitle}</h3>
        <p className="text-2xl font-bold text-navy-700 mt-1">{value ?? 0}</p>
      </div>
    </div>
  );
};

export default StatCard;
