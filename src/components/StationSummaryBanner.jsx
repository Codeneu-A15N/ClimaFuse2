import React, { useState } from 'react';

export default function StationSummaryBanner({ station }) {
  const [selectedHorizon, setSelectedHorizon] = useState('past');

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 lg:p-6 relative overflow-hidden shadow-xl">
      {/* Background subtle radial glow */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ backgroundColor: station.alertColor }}
      />

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
        {/* Left: Station Identity, Status Badges & Geography */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl lg:text-3xl font-bold text-white tracking-tight">
              {station.name} — <span className="text-[#c4c7c8] font-normal">{station.subdistrict}</span>
            </h1>
            <span className="font-mono text-xs text-[#a3a3a3] px-2.5 py-1 rounded-md bg-[#1c1b1b] border border-[#262626]">
              {station.awsId}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
              <span className="material-symbols-outlined text-sm font-semibold">verified</span>
              <span>Verified against IMD Ground Truth</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-[#8e9192] font-mono">
            <span className="flex items-center gap-1 text-[#e5e2e1]">
              <span className="material-symbols-outlined text-[15px] text-[#4edea3]">location_on</span>
              {station.coords}
            </span>
            <span className="text-[#383838]">·</span>
            <span>Elevation {station.elevation}</span>
            <span className="text-[#383838]">·</span>
            <span>{station.wmoRegion}</span>
            <span className="text-[#383838]">·</span>
            <span className="text-amber-400 font-medium">
              BMA Blend: {station.blend.aifs}% AIFS / {station.blend.ifs}% IFS
            </span>
          </div>
        </div>

        {/* Right: Weather Telemetry Snapshot & Synoptic Horizon Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#181818] p-3.5 sm:p-4 rounded-xl border border-[#262626] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#201f1f] flex items-center justify-center text-amber-400 border border-[#2e2e2e] shadow-inner">
              <span className="material-symbols-outlined text-2xl">{station.icon}</span>
            </div>
            <div>
              <div className="text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white tracking-tight flex items-baseline gap-1">
                {station.currentTemp}
                <span className="text-sm font-light text-[#8e9192]">°C</span>
              </div>
              <div className="text-xs text-[#a3a3a3] font-sans">
                Feels like {station.feelsLike}°C · {station.condition}
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-[#2e2e2e] hidden sm:block"></div>

          {/* Horizon Switcher */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e9192]">
              Selected Timeseries
            </span>
            <div className="inline-flex p-1 rounded-lg bg-[#0e0e0e] border border-[#262626]">
              <button
                onClick={() => setSelectedHorizon('past')}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                  selectedHorizon === 'past'
                    ? 'bg-[#252525] text-white shadow-sm'
                    : 'text-[#8e9192] hover:text-white'
                }`}
              >
                24 OCT 2024 (Past Cycle)
              </button>
              <button
                onClick={() => setSelectedHorizon('forecast')}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                  selectedHorizon === 'forecast'
                    ? 'bg-[#252525] text-white shadow-sm'
                    : 'text-[#8e9192] hover:text-white'
                }`}
              >
                D+1 to D+5 Forecast
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
