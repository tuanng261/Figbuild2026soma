import React from 'react';
import { User, Bell, Shield, Smartphone, ChevronRight, LogOut, AlertOctagon } from 'lucide-react';
import { useAppStore } from '../store';

export function SettingsScreen() {
  const { setTriggerEscalation, setIsPaired } = useAppStore();

  const handleUnpair = () => {
    setIsPaired(false);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 pt-12 pb-6 sticky top-0 z-10 border-b border-stone-800" style={{ backgroundColor: '#0a0a0a' }}>
        <h1 className="text-2xl font-light text-stone-100 tracking-tight">Settings</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <section 
          className="rounded-3xl p-5"
          style={{
            background: 'linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 border-2 border-stone-800 ring-2 ring-teal-500/30">
              <User size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-xl font-medium text-stone-100">Tuan Nguyen</h2>
              <p className="text-stone-500 text-sm">User Profile</p>
            </div>
          </div>
          <div className="space-y-1">
            <SettingItem icon={<User size={20} />} label="Edit Profile" />
            <SettingItem icon={<Smartphone size={20} />} label="Device Settings" value="Soma Patch-A2X" />
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-widest pl-2">Preferences</h3>
          <div 
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <SettingItem icon={<Bell size={20} />} label="Notifications" border />
            <div className="flex items-center justify-between p-4 px-5 border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 text-stone-300">
                <span className="w-5 h-5 flex items-center justify-center text-stone-500">⚡</span>
                <span className="font-medium">Sensitivity</span>
              </div>
              <div className="flex items-center text-stone-500 space-x-3">
                <span className="text-sm bg-stone-800 px-3 py-1 rounded-full text-stone-300 font-medium">Medium</span>
                <ChevronRight size={18} />
              </div>
            </div>
            <SettingItem icon={<Shield size={20} />} label="Privacy & Data" />
          </div>
        </section>

        {/* Developer Actions */}
        <section className="space-y-3 pt-4">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-widest pl-2">Demo Controls</h3>
          <button 
            onClick={() => setTriggerEscalation(true)}
            className="w-full flex items-center justify-between p-4 px-5 bg-red-500/10 hover:bg-red-500/20 rounded-2xl text-red-400 font-medium transition-colors border border-red-500/30"
          >
            <div className="flex items-center space-x-3">
              <AlertOctagon size={20} className="text-red-500" />
              <span>Trigger Critical Alert</span>
            </div>
            <ChevronRight size={18} className="text-red-500/50" />
          </button>
          
          <button 
            onClick={handleUnpair}
            className="w-full flex items-center justify-between p-4 px-5 rounded-2xl font-medium transition-colors"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 162, 158, 0.2) 0%, rgba(168, 162, 158, 0.1) 100%)',
              border: '1px solid rgba(168, 162, 158, 0.3)',
              color: '#d6d3d1',
            }}
          >
            <div className="flex items-center space-x-3">
              <LogOut size={20} className="text-stone-500" />
              <span>Unpair Device</span>
            </div>
            <ChevronRight size={18} className="text-stone-500" />
          </button>
        </section>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, value, border }: { icon: React.ReactNode, label: string, value?: string, border?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 px-5 hover:bg-stone-800/30 transition-colors cursor-pointer ${border ? 'border-b border-stone-800/50' : ''}`}>
      <div className="flex items-center space-x-3 text-stone-300">
        <span className="text-stone-500">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center text-stone-500 space-x-3">
        {value && <span className="text-sm text-stone-400">{value}</span>}
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
