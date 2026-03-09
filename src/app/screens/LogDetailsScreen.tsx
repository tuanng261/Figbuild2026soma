import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../store";

const QUICK_TAGS = [
  "After eating",
  "During sleep",
  "After activity",
  "Morning",
  "Evening",
  "Stress-related",
  "Weather change",
  "After medication",
];

export function LogDetailsScreen() {
  const navigate = useNavigate();
  const { signalId } = useParams();
  const { sensorActiveSignals, historySignals, resolveSignal } =
    useAppStore();

  const signal = [
    ...sensorActiveSignals,
    ...historySignals,
  ].find((s) => s.id === signalId);

  const [painLevel, setPainLevel] = useState(5);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    [],
  );
  const [showSaved, setShowSaved] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
  };

  const handleSave = () => {
    console.log("Logging details:", {
      signalId,
      painLevel,
      notes,
      selectedTags,
    });
    if (signal) {
      resolveSignal(signal.id);
    }
    setShowSaved(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  if (!signal) {
    return (
      <div
        className="flex flex-col h-full items-center justify-center"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <p className="text-stone-400">Signal not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 rounded-xl bg-stone-800 text-stone-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full pb-24 overflow-y-auto"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 p-6 pt-12"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-stone-800/50 text-stone-400 hover:text-stone-200 hover:bg-stone-700/50 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-stone-100">
            Log Details
          </h1>
          <p className="text-sm text-stone-500">
            {signal.location}
          </p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Pain Level Slider */}
        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h2 className="text-sm font-medium text-stone-400 mb-4">
            Current Pain Level
          </h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-500">Mild</span>
            <span className="text-2xl font-bold text-stone-100">
              {painLevel}
            </span>
            <span className="text-xs text-stone-500">
              Severe
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={painLevel}
            onChange={(e) =>
              setPainLevel(Number(e.target.value))
            }
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(painLevel - 1) * 11.1}%, #44403c ${(painLevel - 1) * 11.1}%, #44403c 100%)`,
            }}
          />
        </div>

        {/* Quick Tags */}
        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h2 className="text-sm font-medium text-stone-400 mb-4">
            Context Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-teal-500/30 text-teal-300 border border-teal-500/50"
                    : "bg-stone-800/50 text-stone-400 border border-stone-700/50 hover:bg-stone-700/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h2 className="text-sm font-medium text-stone-400 mb-4">
            Additional Notes
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe what you were doing, how it feels, any triggers..."
            className="w-full h-24 bg-stone-800/50 border border-stone-700/50 rounded-xl p-3 text-sm text-stone-200 placeholder-stone-500 resize-none focus:outline-none focus:border-teal-500/50"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-xl text-base font-medium transition-all"
          style={{
            background:
              "linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.2) 100%)",
            border: "1px solid rgba(20, 184, 166, 0.4)",
            color: "#5eead4",
          }}
        >
          Save
        </button>
      </div>

      {/* Saved Confirmation */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.9)" }}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                <Check className="text-teal-400" size={32} />
              </div>
              <p className="text-lg font-medium text-stone-100">
                Saved Successfully
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}