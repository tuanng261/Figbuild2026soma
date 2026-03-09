import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save } from 'lucide-react';
import { useAppStore, PainSignal } from '../store';

export function LogDetailsModal({ signal, isOpen, onClose }: { signal: PainSignal, isOpen: boolean, onClose: () => void }) {
  const [notes, setNotes] = useState('');
  const [painLevel, setPainLevel] = useState(5);
  const { resolveSignal } = useAppStore();

  const handleSave = () => {
    // In a real app we'd dispatch an update to the store to append the note
    // For now we'll just resolve it to clear the alert
    resolveSignal(signal.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="modal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-end justify-center pointer-events-auto"
        >
          <div 
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-h-[85vh] bg-white rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
          {/* Handle */}
          <div className="flex justify-center pt-4 pb-2 bg-white">
            <div className="w-12 h-1.5 bg-stone-200 rounded-full" />
          </div>

          <div className="flex justify-between items-center px-6 pb-4">
            <div>
              <h2 className="text-xl font-medium text-stone-900">Log Details</h2>
              <p className="text-sm text-stone-500">{signal.location} &bull; {signal.type}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-safe space-y-6">
            
            {/* Subjective Pain Slider */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
              <label className="block text-sm font-medium text-stone-700 mb-4">
                How intense is the feeling? <span className="text-stone-400 font-normal ml-2">({painLevel}/10)</span>
              </label>
              
              <div className="relative pt-2 pb-6">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={painLevel}
                  onChange={(e) => setPainLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-2 absolute w-full font-medium uppercase tracking-wider">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>
            </div>

            {/* Context Notes */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Context & Notes
              </label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What were you doing when this started? Did you take anything?"
                className="w-full h-32 p-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
              />
            </div>
            
            {/* Action tags */}
            <div>
               <label className="block text-sm font-medium text-stone-700 mb-3">
                Quick Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {['Resting', 'Exercising', 'Eating', 'Stressed', 'Just woke up', 'Taking medication'].map(tag => (
                  <button key={tag} className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-medium rounded-lg transition-colors border border-stone-200">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Action */}
            <div className="pt-4 pb-8">
              <button 
                onClick={handleSave}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-medium transition-colors shadow-sm shadow-teal-600/20 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save & Resolve Signal
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}