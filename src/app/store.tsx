import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

export type SignalLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface PainSignal {
  id: string;
  location: string;
  region: string; // Body region ID (e.g., 'head', 'chest', 'abdomen', 'left-upper-arm', etc.)
  type: string;
  confidence: number;
  level: SignalLevel;
  timestamp: string;
  resolved: boolean; // User acknowledged/dismissed the alert
  sensorActive: boolean; // Sensor still detecting pain (controls 3D visualization)
  actions: string[];
}

interface AppState {
  isPaired: boolean;
  setIsPaired: (paired: boolean) => void;
  activeSignals: PainSignal[]; // All signals (for UI cards)
  sensorActiveSignals: PainSignal[]; // Only sensor-active signals (for 3D visualization)
  historySignals: PainSignal[];
  resolveSignal: (id: string) => void; // User dismisses alert (pain may still show on 3D)
  clearPainFromSensor: (id: string) => void; // Sensor no longer detects pain
  triggerEscalation: boolean;
  setTriggerEscalation: (trigger: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(
  undefined,
);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPaired, setIsPaired] = useState(false);
  const [triggerEscalation, setTriggerEscalation] =
    useState(false);

  // Mock data for signals - multiple body parts for testing
  const [activeSignals, setActiveSignals] = useState<
    PainSignal[]
  >([
    {
      id: "1",
      location: "Left Trapezius",
      region: "left-trap",
      type: "Muscle tension",
      confidence: 84,
      level: "medium",
      timestamp: new Date().toISOString(),
      resolved: false,
      sensorActive: true,
      actions: [
        "Apply heat therapy",
        "Gentle neck stretches",
        "Check posture",
      ],
    },
    {
      id: "2",
      location: "Right Bicep",
      region: "right-bicep",
      type: "Muscle strain",
      confidence: 72,
      level: "high",
      timestamp: new Date().toISOString(),
      resolved: false,
      sensorActive: true,
      actions: [
        "Rest the arm",
        "Apply ice for 15 minutes",
        "Avoid lifting",
      ],
    },
    {
      id: "3",
      location: "Right Knee",
      region: "right-knee",
      type: "Joint discomfort",
      confidence: 88,
      level: "critical",
      timestamp: new Date().toISOString(),
      resolved: false,
      sensorActive: true,
      actions: [
        "Elevate the leg",
        "Apply compression",
        "Consider medical evaluation",
      ],
    },
    {
      id: "4",
      location: "Left Inner Ankle",
      region: "left-inner-ankle",
      type: "Ligament stress",
      confidence: 65,
      level: "low",
      timestamp: new Date().toISOString(),
      resolved: false,
      sensorActive: true,
      actions: [
        "Rest and elevate",
        "Gentle rotation exercises",
        "Supportive footwear",
      ],
    },
    {
      id: "5",
      location: "Right Inner Ankle",
      region: "left-outer-ankle",
      type: "Mild sprain",
      confidence: 70,
      level: "medium",
      timestamp: new Date().toISOString(),
      resolved: false,
      sensorActive: true,
      actions: [
        "RICE protocol",
        "Ankle support brace",
        "Avoid weight bearing",
      ],
    },
    {
      id: "6",
      location: "Left Temple",
      region: "left-temple",
      type: "Tension headache",
      confidence: 78,
      level: "high",
      timestamp: new Date().toISOString(),
      resolved: false,
      sensorActive: true,
      actions: [
        "Rest in dark room",
        "Gentle temple massage",
        "Stay hydrated",
      ],
    },
  ]);

  const [historySignals, setHistorySignals] = useState<
    PainSignal[]
  >([
    {
      id: "old1",
      location: "Left Temple",
      region: "head",
      type: "Headache",
      confidence: 92,
      level: "high",
      timestamp: new Date(
        Date.now() - 1000 * 60 * 60 * 24,
      ).toISOString(),
      resolved: true,
      sensorActive: false,
      actions: ["Monitor temperature", "Keep head elevated"],
    },
    {
      id: "old2",
      location: "Lower Abdomen",
      region: "abdomen",
      type: "Gas pain",
      confidence: 78,
      level: "low",
      timestamp: new Date(
        Date.now() - 1000 * 60 * 60 * 48,
      ).toISOString(),
      resolved: true,
      sensorActive: false,
      actions: ["Burping", "Gentle rocking"],
    },
  ]);

  // Signals where sensor is still detecting pain (for 3D visualization)
  const sensorActiveSignals = activeSignals.filter(
    (s) => s.sensorActive,
  );

  // User dismisses/acknowledges the alert card - pain still shows on 3D model
  const resolveSignal = (id: string) => {
    setActiveSignals((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, resolved: true } : s,
      ),
    );
  };

  // Sensor no longer detects pain - removes from 3D visualization and moves to history
  const clearPainFromSensor = (id: string) => {
    const signalToClear = activeSignals.find(
      (s) => s.id === id,
    );
    if (signalToClear) {
      setActiveSignals((prev) =>
        prev.filter((s) => s.id !== id),
      );
      setHistorySignals((prev) => [
        {
          ...signalToClear,
          resolved: true,
          sensorActive: false,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isPaired,
        setIsPaired,
        activeSignals,
        sensorActiveSignals,
        historySignals,
        resolveSignal,
        clearPainFromSensor,
        triggerEscalation,
        setTriggerEscalation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useAppStore must be used within an AppProvider",
    );
  }
  return context;
}