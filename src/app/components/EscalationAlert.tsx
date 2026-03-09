import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, X, AlertTriangle } from "lucide-react";
import { useAppStore } from "../store";

export function EscalationAlert() {
  const { triggerEscalation, setTriggerEscalation } =
    useAppStore();

  return (
    <AnimatePresence>
      {triggerEscalation && (
        <motion.div
          key="escalation-alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[100] bg-red-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setTriggerEscalation(false)}
              className="p-3 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="max-w-sm w-full relative overflow-hidden p-8 rounded-[2rem]"
            style={{
              background:
                "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.95) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              boxShadow: "0 0 60px rgba(239, 68, 68, 0.2)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

            <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle
                size={40}
                strokeWidth={1.5}
                className="animate-pulse"
              />
            </div>

            <h2 className="text-3xl font-light text-stone-100 mb-2 tracking-tight">
              Critical Signal
            </h2>
            <p className="text-red-400 font-medium text-sm uppercase tracking-widest mb-6">
              High Fever & Distress
            </p>

            <p className="text-stone-400 text-base leading-relaxed mb-8">
              Prolonged high severity signals detected. We
              recommend consulting a healthcare provider or
              going to the emergency room immediately.
            </p>

            <div className="space-y-4">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-medium text-lg flex items-center justify-center transition-colors shadow-lg shadow-red-600/30 active:scale-[0.98]">
                <Phone size={22} className="mr-3" />
                Call Emergency
              </button>
              <button
                onClick={() => setTriggerEscalation(false)}
                className="w-full py-4 rounded-2xl font-medium transition-colors"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168, 162, 158, 0.2) 0%, rgba(168, 162, 158, 0.1) 100%)",
                  border: "1px solid rgba(168, 162, 158, 0.3)",
                  color: "#d6d3d1",
                }}
              >
                I'm handling this
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}