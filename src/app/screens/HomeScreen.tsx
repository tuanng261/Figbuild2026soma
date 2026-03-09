import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  RotateCcw,
  FileText,
  X,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BodyMap3D } from "../components/BodyMap3D";
import { useAppStore, PainSignal } from "../store";

const SEVERITY_COLORS = {
  low: {
    bg: "bg-yellow-500",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  medium: {
    bg: "bg-orange-500",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
  high: {
    bg: "bg-red-500",
    text: "text-red-400",
    border: "border-red-500/30",
  },
  critical: {
    bg: "bg-red-800",
    text: "text-red-300",
    border: "border-red-800/30",
  },
};

const SEVERITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function HomeScreen() {
  const navigate = useNavigate();
  const { sensorActiveSignals, resolveSignal } = useAppStore();
  const [selectedSignal, setSelectedSignal] =
    useState<PainSignal | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleRegionClick = useCallback(
    (regionId: string) => {
      const signal = sensorActiveSignals.find(
        (s) => s.region === regionId,
      );
      if (signal) {
        setSelectedSignal(signal);
      }
    },
    [sensorActiveSignals],
  );

  const handleResetView = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const handleCloseCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSignal(null);
  };

  const handleResolve = () => {
    if (selectedSignal) {
      resolveSignal(selectedSignal.id);
      setSelectedSignal(null);
    }
  };

  return (
    <div
      className="flex flex-col h-full relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Header */}
      <div
        className="flex flex-col p-6 pt-12 z-20 pointer-events-none relative"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="flex justify-between items-center w-full pointer-events-auto">
          <div>
            <h1 className="text-2xl font-light text-stone-100 tracking-tight mb-1">
              Tuan Nguyen
            </h1>
            <div className="flex items-center text-sm font-medium text-stone-400 space-x-2">
              <button
                onClick={() => navigate("/summary")}
                className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors"
              >
                <FileText size={14} />
                <span>View Summary</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetView}
              className="p-2 rounded-full bg-stone-800/50 text-stone-400 hover:text-stone-200 hover:bg-stone-700/50 transition-all"
              title="Reset View"
            >
              <RotateCcw size={18} />
            </button>
            <div className="text-sm font-medium text-stone-500 text-right">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Body Map */}
      <div
        className="flex-1 relative w-full"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <BodyMap3D
          activeSignals={sensorActiveSignals}
          onRegionClick={handleRegionClick}
          resetTrigger={resetTrigger}
        />
      </div>

      {/* Pain Severity Legend */}
      {!selectedSignal && (
        <div
          className="absolute bottom-[80px] left-0 right-0 px-4 pb-2 z-10"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(to right, #d6d3d1, #fde047, #fb923c, #ef4444, #991b1b)",
            }}
          />
          <div className="flex justify-between text-[10px] text-stone-500 mt-1 px-1">
            <span>No Pain</span>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
            <span>Critical</span>
          </div>
        </div>
      )}

      {/* Selected Signal Card */}
      <AnimatePresence>
        {selectedSignal && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="absolute bottom-[80px] left-0 right-0 z-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
            }}
          >
            <div className="p-5 pb-6">
              {/* Close Button */}
              <button
                onClick={handleCloseCard}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-700/50 text-stone-400 hover:text-stone-200 hover:bg-stone-600/50 transition-all z-50"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${SEVERITY_COLORS[selectedSignal.level].bg} flex items-center justify-center`}
                >
                  <AlertTriangle
                    className="text-white"
                    size={24}
                  />
                </div>
                <div className="flex-1 pr-8">
                  <h3 className="text-lg font-semibold text-stone-100">
                    {selectedSignal.location}
                  </h3>
                  <p className="text-sm text-stone-400">
                    {selectedSignal.type}
                  </p>
                </div>
              </div>

              {/* Severity Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${SEVERITY_COLORS[selectedSignal.level].bg} text-white`}
                >
                  {SEVERITY_LABELS[selectedSignal.level]}{" "}
                  Severity
                </span>
                <span className="text-xs text-stone-500">
                  Detected{" "}
                  {new Date(
                    selectedSignal.timestamp,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Actions */}
              {selectedSignal.actions &&
                selectedSignal.actions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-stone-400 mb-2">
                      Recommended Actions
                    </p>
                    <div className="space-y-2">
                      {selectedSignal.actions
                        .slice(0, 2)
                        .map((action, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-stone-300"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                            {action}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/log/${selectedSignal.id}`)
                  }
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(20, 184, 166, 0.1) 100%)",
                    border: "1px solid rgba(20, 184, 166, 0.3)",
                    color: "#5eead4",
                  }}
                >
                  Log Details
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={handleResolve}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168, 162, 158, 0.2) 0%, rgba(168, 162, 158, 0.1) 100%)",
                    border:
                      "1px solid rgba(168, 162, 158, 0.3)",
                    color: "#d6d3d1",
                  }}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}