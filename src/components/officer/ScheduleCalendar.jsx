import React, { useState, useEffect } from 'react';
import { getApplicationsByOfficer } from '../../data/services';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function ScheduleCalendar() {
  const { user } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Sep 2026 for context
  const [applications, setApplications] = useState([]);
  const [selectedDayApps, setSelectedDayApps] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const apps = await getApplicationsByOfficer(user.id);
        const enhancedApps = apps.map(app => ({
          ...app,
          applicantName: app.applicantName || 'Test Applicant',
          instrumentType: app.instrumentType || 'Weighing Scale',
          location: app.location || 'Central Market'
        }));
        setApplications(enhancedApps);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApps();
  }, [user.id]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  
  // Adjust so Monday is 0 for calendar grid, optional but common
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedDayApps([]);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedDayApps([]);
  };

  const getAppsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return applications.filter(app => app.scheduleDate && app.scheduleDate.startsWith(dateStr));
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedDayApps(getAppsForDay(day));
  };

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

  // Calendar grid generation
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border-b border-r p-2 opacity-50"></div>);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dayApps = getAppsForDay(d);
    const isToday = isCurrentMonth && today.getDate() === d;
    const isSelected = selectedDate === d;
    
    days.push(
      <div 
        key={`day-${d}`} 
        onClick={() => handleDayClick(d)}
        className={`h-24 border-b border-r p-2 relative cursor-pointer hover:bg-blue-50 transition-colors
          ${isToday ? 'bg-blue-50 ring-2 ring-brand-blue ring-inset' : 'bg-white'}
          ${isSelected ? 'bg-gray-100' : ''}
        `}
      >
        <div className="flex justify-between items-start">
          <span className={`text-sm font-semibold ${isToday ? 'text-brand-blue' : 'text-gray-700'}`}>{d}</span>
          {dayApps.length > 0 && (
            <span className="w-5 h-5 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
              {dayApps.length}
            </span>
          )}
        </div>
        {dayApps.length > 0 && (
          <div className="mt-2 text-[10px] text-gray-500 truncate space-y-1">
            {dayApps.slice(0, 2).map((app, i) => (
              <div key={i} className="bg-gray-100 px-1 rounded truncate border border-gray-200">
                {app.id}
              </div>
            ))}
            {dayApps.length > 2 && <div className="text-gray-400">+{dayApps.length - 2} more</div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="bg-white rounded shadow overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-navy-600 text-white flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Clock size={24} />
            <span>Verification Schedule</span>
          </h2>
          <div className="flex items-center space-x-4">
            <button onClick={prevMonth} className="p-1 hover:bg-navy-700 rounded"><ChevronLeft size={24} /></button>
            <span className="font-semibold min-w-[120px] text-center">{monthName} {year}</span>
            <button onClick={nextMonth} className="p-1 hover:bg-navy-700 rounded"><ChevronRight size={24} /></button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div>
          <div className="grid grid-cols-7 bg-gray-100 text-gray-600 text-sm font-semibold uppercase text-center border-b">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="py-2 border-r">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 border-l">
            {days}
          </div>
        </div>
      </div>

      {/* Selected Day Details Panel */}
      {selectedDate && (
        <div className="bg-white rounded shadow p-6 border-t-4 border-brand-blue">
          <h3 className="text-lg font-bold text-navy-600 mb-4">
            Assignments for {monthName} {selectedDate}, {year}
          </h3>
          
          {selectedDayApps.length === 0 ? (
            <p className="text-gray-500">No verifications scheduled for this day.</p>
          ) : (
            <div className="space-y-4">
              {selectedDayApps.map(app => (
                <div key={app.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-shadow">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm text-gray-500">{app.id}</span>
                      <StatusBadge status={app.status} />
                    </div>
                    <h4 className="font-semibold text-lg">{app.applicantName}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-2 sm:gap-4">
                      <span>{app.instrumentType}</span>
                      <span className="flex items-center"><MapPin size={14} className="mr-1" /> {app.location}</span>
                      <span className="flex items-center"><Clock size={14} className="mr-1" /> 
                        {new Date(app.scheduleDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 border font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
