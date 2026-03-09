import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppStore } from "../store";
import { motion } from "motion/react";
import {
  Bluetooth,
  Activity,
  CheckCircle,
  ChevronRight,
  Fingerprint,
  Camera,
  ScanLine,
  RefreshCw,
  User,
} from "lucide-react";

export function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [scanProgress, setScanProgress] =
    useState("Front view");
  const { setIsPaired } = useAppStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      setStep(6);
      setScanProgress("Front view");
      // Simulate scan process
      setTimeout(() => {
        setScanProgress("Side view");
      }, 3000);
      setTimeout(() => {
        setScanProgress("Complete");
        setTimeout(() => setStep(7), 1500);
      }, 6000);
    } else if (step === 7) {
      setIsPaired(true);
      navigate("/");
    } else if (step < 7) {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    setIsPaired(true);
    navigate("/");
  };

  return (
    <div
      className="flex flex-col h-full text-stone-100 p-6 pt-12 relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Progress Dots */}
      <div
        className={`flex justify-center items-center space-x-2 mb-12 ${step === 6 ? "opacity-0 pointer-events-none" : ""}`}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step
                ? "w-8 bg-teal-500"
                : i < step
                  ? "w-3 bg-teal-700"
                  : "w-3 bg-stone-700"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center mb-4 text-teal-400">
              <Activity size={48} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-light tracking-tight text-stone-100">
              Welcome to Soma
            </h1>
            <p className="text-stone-400 max-w-xs leading-relaxed">
              Translate invisible pain signals into a visible,
              actionable body map.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-48 h-48 bg-stone-800 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-teal-500/10 rounded-full animate-ping opacity-30"></div>
              <div className="bg-stone-900 p-6 rounded-3xl shadow-lg rotate-12 border border-stone-700">
                <Fingerprint
                  size={48}
                  className="text-teal-400"
                  strokeWidth={1}
                />
              </div>
            </div>
            <h2 className="text-2xl font-light text-stone-100">
              Pair your Sensor
            </h2>
            <p className="text-stone-400 max-w-xs leading-relaxed">
              Place the Soma wearable patch on your body. Ensure
              Bluetooth is enabled on your phone.
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center text-center space-y-8 w-full"
          >
            <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
              <Bluetooth size={40} className="animate-pulse" />
            </div>
            <h2 className="text-2xl font-light text-stone-100">
              Connecting...
            </h2>

            <div
              className="w-full p-4 rounded-2xl flex items-center justify-between"
              style={{
                background:
                  "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.9) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center">
                  <Fingerprint
                    size={20}
                    className="text-stone-400"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium text-stone-100">
                    Soma Patch-A2X
                  </p>
                  <p className="text-xs text-stone-500">
                    Ready to pair
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin"></div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-32 h-32 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 mb-4">
              <CheckCircle size={64} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-light text-stone-100">
              Paired Successfully
            </h2>
            <p className="text-stone-400 max-w-xs leading-relaxed">
              Your device is connected and calibrating baseline
              signals.
            </p>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-24 h-24 bg-stone-800 rounded-full flex items-center justify-center mb-2">
              <ScanLine
                size={48}
                className="text-stone-300"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-3xl font-light text-stone-100">
              Let's map your body
            </h2>
            <p className="text-stone-400 max-w-xs leading-relaxed">
              We'll use your camera to create a personalized
              body model. This takes about 30 seconds.
            </p>
            <p className="text-xs text-stone-500 mt-4 max-w-[200px]">
              Your scan is processed on-device and never stored
              or shared.
            </p>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-stone-900 flex flex-col"
          >
            <div className="relative flex-1 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1597141716939-18f43b33c8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdGFuZGluZyUyMHN0cmFpZ2h0JTIwZmFjaW5nJTIwY2FtZXJhJTIwbmV1dHJhbCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczMDIyMzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Camera feed"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              {/* Body Outline Guide */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
                <div className="w-full max-w-[240px] h-[80%] border-4 border-dashed border-teal-400/70 rounded-[100px] animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>

              <div className="absolute top-12 left-0 w-full text-center z-10 px-6">
                <div className="bg-stone-900/60 backdrop-blur-md text-white px-4 py-2 rounded-full inline-block text-sm font-medium">
                  Stand 6 feet away and face the camera
                </div>
              </div>

              <div className="absolute bottom-16 left-0 w-full flex flex-col items-center z-10 px-6 space-y-4">
                <div className="text-white font-medium text-lg tracking-wide bg-stone-900/40 px-6 py-2 rounded-full backdrop-blur-md">
                  {scanProgress}
                </div>
                <div className="w-48 h-2 bg-stone-700/50 rounded-full overflow-hidden backdrop-blur-md">
                  <motion.div
                    className="h-full bg-teal-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        scanProgress === "Front view"
                          ? "33%"
                          : scanProgress === "Side view"
                            ? "66%"
                            : "100%",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="relative w-48 h-64 bg-stone-800 rounded-3xl overflow-hidden mb-2 border border-stone-700">
              {/* Simplified Spiderweb Wireframe Placeholder */}
              <svg
                className="absolute inset-0 w-full h-full text-teal-500/30"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M50 10 L45 20 L55 20 Z"
                  fill="currentColor"
                />
                <path
                  d="M45 20 L40 40 L60 40 L55 20 Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M40 40 L30 70 L45 70 L50 60 L55 70 L70 70 L60 40 Z"
                  fill="currentColor"
                  opacity="0.6"
                />
                <path
                  d="M30 70 L35 90 L45 90 L45 70 Z"
                  fill="currentColor"
                  opacity="0.4"
                />
                <path
                  d="M70 70 L65 90 L55 90 L55 70 Z"
                  fill="currentColor"
                  opacity="0.4"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-800 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-teal-500/20 text-teal-400 p-1.5 rounded-full">
                <CheckCircle size={16} />
              </div>
            </div>
            <h2 className="text-3xl font-light text-stone-100">
              Your body map is ready
            </h2>
            <p className="text-stone-400 max-w-xs leading-relaxed">
              We've created a model based on your body. You can
              update this anytime.
            </p>
          </motion.div>
        )}
      </div>

      <div
        className={`pb-10 pt-4 mt-auto ${step === 6 ? "hidden" : ""}`}
      >
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-medium text-lg transition-colors flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.2) 100%)",
            border: "1px solid rgba(20, 184, 166, 0.4)",
            color: "#5eead4",
          }}
        >
          {step === 4
            ? "Continue"
            : step === 5
              ? "Start Scan"
              : step === 7
                ? "Looks good, continue"
                : "Continue"}
          {step !== 5 && step !== 7 && (
            <ChevronRight size={20} className="ml-2" />
          )}
        </button>

        {step === 5 && (
          <button
            onClick={handleSkip}
            className="w-full mt-4 text-stone-500 font-medium text-sm hover:text-stone-300 transition-colors"
          >
            Skip for now
          </button>
        )}

        {step === 7 && (
          <button
            onClick={() => setStep(5)}
            className="w-full mt-4 text-teal-400 font-medium hover:text-teal-300 transition-colors flex items-center justify-center"
          >
            <RefreshCw size={16} className="mr-2" />
            Retake scan
          </button>
        )}
      </div>
    </div>
  );
}