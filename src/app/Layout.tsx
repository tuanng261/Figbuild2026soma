import React, { useEffect } from "react";
import {
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router";
import { Home, Clock, Bell, Settings, Zap } from "lucide-react";
import { useAppStore } from "./store";
import { EscalationAlert } from "./components/EscalationAlert";

export function Layout() {
  const { isPaired } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPaired && location.pathname !== "/onboarding") {
      navigate("/onboarding", { replace: true });
    } else if (
      isPaired &&
      location.pathname === "/onboarding"
    ) {
      navigate("/", { replace: true });
    }
  }, [isPaired, location.pathname, navigate]);

  if (!isPaired) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-900 font-sans text-stone-100 overflow-hidden">
        <div className="w-full max-w-[400px] h-[100dvh] bg-stone-50 relative shadow-2xl overflow-hidden flex flex-col sm:h-[850px] sm:rounded-[3rem] sm:border-[8px] sm:border-stone-800">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen font-sans text-stone-100 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="w-full max-w-[400px] h-[100dvh] relative shadow-2xl overflow-hidden flex flex-col sm:h-[850px] sm:rounded-[3rem] sm:border-[8px] sm:border-stone-800"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <EscalationAlert />

        {/* Main Content Area */}
        <div
          className="flex-1 overflow-y-auto relative scrollbar-hide"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        <div
          className="absolute bottom-0 w-full backdrop-blur-2xl border-t border-stone-800/50 pb-safe z-50"
          style={{
            backgroundColor: "rgba(28, 25, 23, 0.95)",
            height: "80px",
          }}
        >
          <div className="flex justify-around items-center h-[72px] px-2">
            <NavItem
              to="/"
              icon={<Home size={24} strokeWidth={1.5} />}
              label="Map"
              active={location.pathname === "/"}
            />
            <NavItem
              to="/history"
              icon={<Clock size={24} strokeWidth={1.5} />}
              label="History"
              active={location.pathname === "/history"}
            />
            <NavItem
              to="/device"
              icon={<Zap size={24} strokeWidth={1.5} />}
              label="Device"
              active={location.pathname === "/device"}
            />
            <NavItem
              to="/settings"
              icon={<Settings size={24} strokeWidth={1.5} />}
              label="Settings"
              active={location.pathname === "/settings"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  active,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <NavLink
      to={to}
      className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-300 relative ${active ? "text-teal-400" : "text-stone-500 hover:text-stone-300"}`}
    >
      <div
        className={`flex items-center justify-center transition-transform duration-300 ${active ? "scale-110" : "scale-100"}`}
      >
        {icon}
      </div>
      <span
        className={`text-[10px] font-medium tracking-wide transition-opacity duration-300 ${active ? "opacity-100" : "opacity-70"}`}
      >
        {label}
      </span>
      {active && (
        <span className="absolute bottom-[6px] w-1 h-1 bg-teal-400 rounded-full animate-pulse" />
      )}
    </NavLink>
  );
}