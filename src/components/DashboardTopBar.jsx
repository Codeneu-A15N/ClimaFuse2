import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardTopBar({ activeTab = 'map', setActiveTab }) {
  return (
    <header className="w-full pl-16 pr-5 z-30 shrink-0 pt-1.5 pb-1">
      <div className="w-full flex items-center justify-between px-5 rounded-2xl bg-[#121212]/90 backdrop-blur-xl border border-[#262626]/70 shadow-lg py-2">
        {/* Left: Brand Title & Live Status */}
        <div className="flex items-center space-x-3.5">
          <Link to="/" className="flex items-center space-x-2.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[1.25rem] font-bold tracking-tight text-white">
              ClimaFuse
            </span>
            <span className="text-[#444748] font-mono text-xs">/</span>
            <span className="font-mono text-[11px] text-[#a3a3a3] tracking-widest uppercase">
              AI-NWP PLATFORM
            </span>
          </Link>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#201f1f]/80 border border-[#262626]/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]" />
            </span>
            <span className="font-mono text-[10px] text-[#4edea3] tracking-wider font-semibold">LIVE</span>
          </div>
        </div>

        {/* Center: Prominent Navigation Buttons */}
        <nav className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#111111]/90 border border-[#262626]/50">
          {/* Live Map (Active) */}
          <button
            onClick={() => setActiveTab && setActiveTab('map')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-[#3a3939]/70 text-white border border-[#444748] shadow-sm font-semibold'
                : 'text-[#a3a3a3] hover:text-white hover:bg-[#201f1f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs tracking-wide">Live Map</span>
          </button>

          {/* Model Comparison */}
          <button
            onClick={() => setActiveTab && setActiveTab('comparison')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-all cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-[#3a3939]/70 text-white border border-[#444748] shadow-sm font-semibold'
                : 'text-[#a3a3a3] hover:text-white hover:bg-[#201f1f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs tracking-wide">Model Comparison</span>
          </button>

          {/* Severe Alerts */}
          <button
            onClick={() => setActiveTab && setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-all cursor-pointer ${
              activeTab === 'alerts'
                ? 'bg-[#3a3939]/70 text-white border border-[#444748] shadow-sm font-semibold'
                : 'text-[#a3a3a3] hover:text-white hover:bg-[#201f1f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#f97316]">warning</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs tracking-wide">Severe Alerts</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316] text-[10px] font-mono font-bold">
              2
            </span>
          </button>

          {/* Synoptic Insights */}
          <button
            onClick={() => setActiveTab && setActiveTab('insights')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-all cursor-pointer ${
              activeTab === 'insights'
                ? 'bg-[#3a3939]/70 text-white border border-[#444748] shadow-sm font-semibold'
                : 'text-[#a3a3a3] hover:text-white hover:bg-[#201f1f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">analytics</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs tracking-wide">Synoptic Insights</span>
          </button>
        </nav>

        {/* Right: Operational Telemetry Badge & Time Run Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Hybrid EPS Mode Badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#201f1f]/70 border border-[#262626]/60 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
            <span className="text-[#a3a3a3]">
              OPERATIONAL · <strong className="text-white font-medium">0.05° EPS</strong>
            </span>
          </div>

          {/* Timestamp Button */}
          <div className="flex items-center px-3.5 py-1.5 rounded-xl bg-[#201f1f]/70 border border-[#262626]/60 space-x-2 font-mono text-[11px]">
            <span className="material-symbols-outlined text-[#8e9192] text-[16px]">calendar_today</span>
            <span className="text-white">24 OCT 2024</span>
            <span className="text-[#444748]">·</span>
            <span className="text-[#a3a3a3]">06:00 UTC</span>
          </div>

          {/* Quick Settings / Filter Button */}
          <button
            className="w-8 h-8 rounded-xl bg-[#201f1f]/70 border border-[#262626]/60 flex items-center justify-center text-[#8e9192] hover:text-white hover:bg-[#353534] transition-colors cursor-pointer"
            title="Configuration & Filters"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>
      </div>
    </header>
  );
}
