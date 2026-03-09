import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, Activity, Lightbulb } from 'lucide-react';
import { useAppStore } from '../store';

const SEVERITY_COLORS = {
  low: { bg: 'bg-yellow-500', text: 'text-yellow-400' },
  medium: { bg: 'bg-orange-500', text: 'text-orange-400' },
  high: { bg: 'bg-red-500', text: 'text-red-400' },
  critical: { bg: 'bg-red-800', text: 'text-red-300' },
};

export function SummaryScreen() {
  const navigate = useNavigate();
  const { sensorActiveSignals } = useAppStore();

  const signalsByLevel = {
    critical: sensorActiveSignals.filter(s => s.level === 'critical'),
    high: sensorActiveSignals.filter(s => s.level === 'high'),
    medium: sensorActiveSignals.filter(s => s.level === 'medium'),
    low: sensorActiveSignals.filter(s => s.level === 'low'),
  };

  const getRecommendations = () => {
    const recommendations = [];
    if (signalsByLevel.critical.length > 0 || signalsByLevel.high.length > 0) {
      recommendations.push('Consider consulting a healthcare professional for the high-severity areas.');
    }
    if (sensorActiveSignals.some(s => s.type.toLowerCase().includes('tension') || s.type.toLowerCase().includes('muscle'))) {
      recommendations.push('Regular stretching and posture checks may help reduce muscle tension.');
    }
    if (sensorActiveSignals.some(s => s.type.toLowerCase().includes('headache'))) {
      recommendations.push('Ensure adequate hydration and rest. Monitor for recurring patterns.');
    }
    if (sensorActiveSignals.length > 3) {
      recommendations.push('Multiple pain points detected. Consider a comprehensive wellness check.');
    }
    if (recommendations.length === 0) {
      recommendations.push('Continue monitoring and maintain healthy habits.');
    }
    return recommendations;
  };

  return (
    <div className="flex flex-col h-full pb-24 overflow-y-auto" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="flex items-center gap-4 p-6 pt-12" style={{ backgroundColor: '#0a0a0a' }}>
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full bg-stone-800/50 text-stone-400 hover:text-stone-200 hover:bg-stone-700/50 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-stone-100">Health Summary</h1>
          <p className="text-sm text-stone-500">Tuan Nguyen</p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Date */}
        <div className="text-sm text-stone-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {/* Overview Card */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Activity className="text-teal-400" size={20} />
            </div>
            <h2 className="text-lg font-medium text-stone-100">Overview</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-xl bg-stone-800/50">
              <div className="text-2xl font-bold text-stone-100">{sensorActiveSignals.length}</div>
              <div className="text-xs text-stone-500">Active Signals</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-stone-800/50">
              <div className="text-2xl font-bold text-red-400">{signalsByLevel.critical.length + signalsByLevel.high.length}</div>
              <div className="text-xs text-stone-500">High Priority</div>
            </div>
          </div>

          {/* Severity Breakdown */}
          <div className="mt-4 space-y-2">
            {Object.entries(signalsByLevel).map(([level, signals]) => (
              signals.length > 0 && (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${SEVERITY_COLORS[level as keyof typeof SEVERITY_COLORS].bg}`} />
                    <span className="text-sm text-stone-400 capitalize">{level}</span>
                  </div>
                  <span className="text-sm text-stone-300">{signals.length} area{signals.length > 1 ? 's' : ''}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Detected Problems */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <AlertTriangle className="text-orange-400" size={20} />
            </div>
            <h2 className="text-lg font-medium text-stone-100">Detected Problems</h2>
          </div>

          <div className="space-y-3">
            {sensorActiveSignals.map((signal) => (
              <div
                key={signal.id}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${SEVERITY_COLORS[signal.level].bg}`} />
                  <div>
                    <div className="text-sm font-medium text-stone-200">{signal.location}</div>
                    <div className="text-xs text-stone-500">{signal.type}</div>
                  </div>
                </div>
                <span className={`text-xs font-medium ${SEVERITY_COLORS[signal.level].text} capitalize`}>
                  {signal.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Lightbulb className="text-teal-400" size={20} />
            </div>
            <h2 className="text-lg font-medium text-stone-100">Recommendations</h2>
          </div>

          <div className="space-y-3">
            {getRecommendations().map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-stone-300">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
