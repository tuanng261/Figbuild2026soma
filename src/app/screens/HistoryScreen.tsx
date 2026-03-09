import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Activity, CheckCircle, Clock } from 'lucide-react';

type ViewMode = 'timeline' | 'calendar';

// Mock data based on the request
// Today is Monday, March 9, 2026
const mockEpisodes = {
  '2026-03-09': [
    { id: 1, time: '2:14 AM', region: 'Abdomen', type: 'Gas pain', confidence: 84, status: 'Resolved' },
    { id: 2, time: '10:30 AM', region: 'Lower Back', type: 'Muscle tension', confidence: 92, status: 'Resolved' },
    { id: 3, time: '2:45 PM', region: 'Head', type: 'Tension headache', confidence: 78, status: 'Active' },
  ],
  '2026-03-07': [
    { id: 4, time: '8:00 AM', region: 'Right Knee', type: 'Joint pain', confidence: 89, status: 'Resolved' },
  ],
  '2026-03-05': [
    { id: 5, time: '1:15 PM', region: 'Shoulders', type: 'Muscle tension', confidence: 95, status: 'Resolved' },
    { id: 6, time: '4:30 PM', region: 'Neck', type: 'Stiffness', confidence: 81, status: 'Resolved' },
  ],
  '2026-03-02': [
    { id: 7, time: '9:00 AM', region: 'Abdomen', type: 'Cramps', confidence: 88, status: 'Resolved' },
  ],
};

const getSeverity = (count: number) => {
  if (count === 0) return 'none';
  if (count === 1) return 'light';
  if (count === 2) return 'medium';
  return 'dark';
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'light': return 'bg-teal-200';
    case 'medium': return 'bg-teal-400';
    case 'dark': return 'bg-teal-600';
    default: return 'bg-transparent';
  }
};

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const generateCalendarDays = (year: number, month: number) => {
  const numDays = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);
  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= numDays; i++) {
    calendarDays.push(i);
  }
  return calendarDays;
};

const monthsList = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2026, i, 1);
  return {
    year: 2026,
    month: i,
    name: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    days: generateCalendarDays(2026, i)
  };
});

export function HistoryScreen() {
  const [view, setView] = useState<ViewMode>('timeline');
  const [selectedDate, setSelectedDate] = useState('2026-03-09');
  
  const handleDateSelect = (year: number, month: number, day: number | null) => {
    if (day) {
      const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      setSelectedDate(formattedDate);
      setView('timeline');
    }
  };

  const getDayEpisodes = (dateStr: string) => mockEpisodes[dateStr as keyof typeof mockEpisodes] || [];
  
  const selectedEpisodes = getDayEpisodes(selectedDate);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00'); // Prevent timezone shift
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const renderEpisodeCard = (ep: any) => (
    <div key={ep.id} className="relative pl-8 mb-8">
      {/* Timeline connector dot */}
      <div className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-stone-800 z-10" />
      
      <div className="bg-stone-900/50 border border-stone-800/50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-stone-400">{ep.time}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${ep.status === 'Resolved' ? 'bg-stone-800/50 text-stone-300 border border-stone-700' : 'bg-orange-900/30 text-orange-400 border border-orange-700/30'}`}>
              {ep.status}
            </span>
          </div>
          <span className="text-xs font-medium text-stone-500 bg-stone-800/50 px-2 py-1 rounded-md">{ep.confidence}% match</span>
        </div>
        <h4 className="text-lg font-medium text-stone-100">{ep.region}</h4>
        <p className="text-stone-400 text-sm mt-1">{ep.type}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Top Header */}
      <div className="pt-14 pb-4 px-6 flex justify-between items-center z-20 backdrop-blur-md" style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)' }}>
        <h1 className="text-2xl font-light text-stone-100">History</h1>
        <div className="flex bg-stone-800/50 p-1 rounded-full shadow-inner border border-stone-700/50">
          <button 
            onClick={() => setView('timeline')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${view === 'timeline' ? 'bg-stone-700/80 text-stone-100 shadow-sm' : 'text-stone-400 hover:text-stone-200'}`}
          >
            Timeline
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${view === 'calendar' ? 'bg-stone-700/80 text-stone-100 shadow-sm' : 'text-stone-400 hover:text-stone-200'}`}
          >
            Calendar
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {view === 'timeline' ? (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="px-6 pt-6"
            >
              <div className="mb-10">
                <h2 className="text-xl font-medium text-stone-100">{selectedDate === '2026-03-09' ? 'Today' : formatDate(selectedDate)}</h2>
                <p className="text-stone-400 mt-1">{selectedEpisodes.length} episode{selectedEpisodes.length !== 1 ? 's' : ''} detected</p>
              </div>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-0 top-6 bottom-4 w-px bg-stone-700" />
                
                {selectedEpisodes.length > 0 ? (
                  selectedEpisodes.map(renderEpisodeCard)
                ) : (
                  <div className="pl-8 py-4">
                    <p className="text-stone-500 text-sm">No episodes on this day</p>
                  </div>
                )}
              </div>

              <div className="mt-8 mb-8 text-center">
                <button 
                  onClick={() => setView('calendar')}
                  className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
                >
                  View past days
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col pb-12"
            >
              {monthsList.map((monthData, mIndex) => {
                return (
                  <div key={`${monthData.year}-${monthData.month}`} className="mb-6">
                    {/* Sticky Month Header */}
                    <div className="sticky top-0 backdrop-blur-md z-10 px-6 py-4" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}>
                      <h2 className="text-xl font-medium text-stone-100">{monthData.name}</h2>
                    </div>

                    <div className="px-6 pb-2">
                      {/* Days Header */}
                      <div className="grid grid-cols-7 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div key={i} className="text-center text-[10px] font-medium text-stone-500 uppercase tracking-widest">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-y-4">
                        {monthData.days.map((day, i) => {
                          if (!day) return <div key={`empty-${i}`} className="h-10" />;
                          
                          const dateStr = `${monthData.year}-${(monthData.month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                          const isSelected = selectedDate === dateStr;
                          const isToday = dateStr === '2026-03-09';
                          const dayEpisodes = getDayEpisodes(dateStr);
                          const severity = getSeverity(dayEpisodes.length);
                          const dotColor = getSeverityColor(severity);
                          
                          return (
                            <button 
                              key={day}
                              onClick={() => handleDateSelect(monthData.year, monthData.month, day)}
                              className="flex flex-col items-center justify-center h-10 relative group"
                            >
                              <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                                isToday && !isSelected ? 'bg-stone-700 text-stone-100 font-medium' :
                                isSelected ? 'bg-teal-500 text-white font-medium shadow-md' :
                                'text-stone-300 group-hover:bg-stone-800/50'
                              }`}>
                                {day}
                              </div>
                              {severity !== 'none' && !isSelected && !isToday && (
                                <div className={`w-1 h-1 rounded-full absolute bottom-0 ${dotColor}`} />
                              )}
                              {(isSelected || isToday) && severity !== 'none' && (
                                <div className={`w-1 h-1 rounded-full absolute bottom-0 ${isSelected || isToday ? 'bg-white opacity-50' : dotColor}`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}