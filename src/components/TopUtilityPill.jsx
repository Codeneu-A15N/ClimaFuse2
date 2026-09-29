import React from 'react';
import { Link } from 'react-router-dom';

export default function TopUtilityPill() {
  return (
    <header className="fixed top-6 right-6 md:right-8 z-50 flex items-center gap-3 bg-[#111111]/85 backdrop-blur-xl border border-[#262626] px-3 py-1.5 rounded-full shadow-2xl">
      <div className="flex items-center gap-2 pl-1.5">
        <img src="/weather.png" alt="ClimaFuse" className="w-4 h-4 object-contain rounded-full shadow-sm" />
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4edea3]" />
        </span>
        <span className="font-mono text-[0.6875rem] text-[#e5e2e1] tracking-wider font-medium">
          Hybrid AI-NWP EPS Online
        </span>
      </div>
      <span className="h-3 w-px bg-[#262626] mx-1" />
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0a0a0a] font-sans text-[0.8125rem] font-semibold hover:bg-[#e2e2e2] transition-colors duration-150"
      >
        <span>View Live Dashboard</span>
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </header>
  );
}
