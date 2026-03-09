import React from "react";
import {
  Bell,
  AlertTriangle,
  Info,
  Clock,
  Check,
} from "lucide-react";

export function AlertsScreen() {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "High Fever & Distress",
      message:
        "Persistent high signal detected in head and torso. Doctor consultation recommended.",
      time: "2 hours ago",
      resolved: true,
    },
    {
      id: 2,
      type: "warning",
      title: "Prolonged Discomfort",
      message:
        "Lower abdomen signal active for over 45 minutes.",
      time: "Yesterday",
      resolved: true,
    },
    {
      id: 3,
      type: "info",
      title: "Sensor Reconnected",
      message: "Soma Patch successfully re-paired.",
      time: "3 days ago",
      resolved: true,
    },
  ];

  return (
    <div
      className="flex flex-col h-full pb-24"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="p-6 pt-12 pb-6 sticky top-0 z-10 border-b border-stone-800"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <h1 className="text-2xl font-light text-stone-100 tracking-tight">
          Alerts
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Notification log
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
              border:
                alert.type === "critical"
                  ? "1px solid rgba(239, 68, 68, 0.3)"
                  : alert.type === "warning"
                    ? "1px solid rgba(251, 146, 60, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex items-start">
              <div
                className={`p-2.5 rounded-full mr-4 shrink-0 ${
                  alert.type === "critical"
                    ? "bg-red-500/20 text-red-400"
                    : alert.type === "warning"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {alert.type === "critical" ? (
                  <AlertTriangle size={20} />
                ) : alert.type === "warning" ? (
                  <Bell size={20} />
                ) : (
                  <Info size={20} />
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`font-medium ${
                      alert.type === "critical"
                        ? "text-red-300"
                        : alert.type === "warning"
                          ? "text-orange-300"
                          : "text-stone-200"
                    }`}
                  >
                    {alert.title}
                  </h3>
                  <span className="text-xs text-stone-500 whitespace-nowrap ml-2 flex items-center">
                    <Clock size={10} className="mr-1" />
                    {alert.time}
                  </span>
                </div>

                <p className="text-sm text-stone-400 mb-3 leading-relaxed">
                  {alert.message}
                </p>

                {alert.resolved && (
                  <div className="flex items-center text-xs text-teal-400 font-medium bg-teal-500/10 w-fit px-2.5 py-1 rounded-md border border-teal-500/20">
                    <Check size={12} className="mr-1.5" />
                    Resolved
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}