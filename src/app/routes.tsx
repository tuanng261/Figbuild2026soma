import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./Layout";
import { HomeScreen } from "./screens/HomeScreen";
import { AlertsScreen } from "./screens/AlertsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { DeviceScreen } from "./screens/DeviceScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { SummaryScreen } from "./screens/SummaryScreen";
import { LogDetailsScreen } from "./screens/LogDetailsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "alerts", element: <AlertsScreen /> },
      { path: "device", element: <DeviceScreen /> },
      { path: "settings", element: <SettingsScreen /> },
      { path: "history", element: <HistoryScreen /> },
      { path: "onboarding", element: <OnboardingScreen /> },
      { path: "summary", element: <SummaryScreen /> },
      { path: "log/:signalId", element: <LogDetailsScreen /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);