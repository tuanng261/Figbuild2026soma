import React, { useState } from "react";
import { useAppStore } from "../store";
import {
  Bluetooth,
  Battery,
  Zap,
  Activity,
  Clock,
  Server,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";

export function DeviceScreen() {
  const { isPaired } = useAppStore();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div
      className="flex flex-col min-h-full pb-24"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Header */}
      <div
        className="px-6 pt-12 pb-6 border-b border-stone-800 sticky top-0 z-10"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <h1 className="text-2xl font-light text-stone-100 tracking-tight">
          Device Status
        </h1>
        <p className="text-sm text-stone-500">
          Biometric wearable connection
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Status Card */}
        <div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between mb-8 relative z-10">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                  Active Connection
                </span>
              </div>
              <h2 className="text-xl font-medium text-stone-100">
                Soma Band v2
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
              <Bluetooth size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-stone-800/50 rounded-2xl p-4">
              <div className="flex items-center text-stone-400 mb-2">
                <Battery size={14} className="mr-1.5" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Battery
                </span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-light text-stone-100">
                  84
                </span>
                <span className="text-sm text-stone-500">
                  %
                </span>
              </div>
            </div>

            <div className="bg-stone-800/50 rounded-2xl p-4">
              <div className="flex items-center text-stone-400 mb-2">
                <Zap size={14} className="mr-1.5" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Signal
                </span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-light text-stone-100">
                  Excellent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Data Stream */}
        <div
          className="rounded-3xl p-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider">
              Live Telemetry
            </h3>
            <button
              onClick={handleSync}
              className={`text-stone-500 hover:text-stone-300 transition-colors ${isSyncing ? "animate-spin" : ""}`}
            >
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-stone-300">
                <Activity
                  size={16}
                  className="mr-3 text-rose-500"
                />
                <span className="text-sm font-medium">
                  Heart Rate
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-light text-stone-100">
                  72{" "}
                  <span className="text-xs text-stone-500">
                    bpm
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-stone-300">
                <Zap
                  size={16}
                  className="mr-3 text-amber-500"
                />
                <span className="text-sm font-medium">
                  Galvanic Skin
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-light text-stone-100">
                  2.4{" "}
                  <span className="text-xs text-stone-500">
                    µS
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-stone-300">
                <Server
                  size={16}
                  className="mr-3 text-blue-500"
                />
                <span className="text-sm font-medium">
                  Local Processing
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-sm text-stone-300">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full py-4 rounded-2xl text-sm font-medium transition-colors"
          style={{
            background:
              "linear-gradient(135deg, rgba(168, 162, 158, 0.2) 0%, rgba(168, 162, 158, 0.1) 100%)",
            border: "1px solid rgba(168, 162, 158, 0.3)",
            color: "#d6d3d1",
          }}
        >
          Unpair Device
        </button>
      </div>
    </div>
  );
}