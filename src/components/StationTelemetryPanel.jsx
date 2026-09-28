import React from 'react';

/**
 * StationTelemetryPanel
 *
 * Full-height technical telemetry inspection workstation for the selected IMD AWS station.
 * Utilizes the full vertical space from the very top of the dashboard to the bottom,
 * providing comprehensive synoptic readouts, diurnal progression, and AI consensus blend.
 */
export default function StationTelemetryPanel({ city, onBack }) {
  if (!city) return null;

  return (
    <aside
      className="w-full lg:w-[420px] h-full flex flex-col justify-between rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-[#262626] p-4 lg:p-5 shadow-2xl overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#262626]"
      aria-label="Station Telemetry Inspection"
    >
      {/* 0. Return to National Overview Header */}
      {onBack && (
        <div className="flex items-center justify-between pb-2.5 border-b border-[#262626]/60">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-white/30 text-[#4edea3] hover:text-white font-mono text-[11px] transition-all cursor-pointer group shadow-sm"
            title="Return to Subcontinental All-India Overview"
          >
            <span className="material-symbols-outlined text-[14px] group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            <span>All-India Overview</span>
          </button>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8e9192]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            <span>STATION TELEMETRY</span>
          </div>
        </div>
      )}

      {/* 1. Station Header & Geo Coordinates */}
      <div className="flex items-start justify-between pb-1 border-b border-[#262626]/40">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-white tracking-tight">
              {city.name}
            </h2>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#1e1e1e] border border-[#333] text-[#a3a3a3] font-semibold">
              {city.awsId}
            </span>
          </div>
          <p className="font-sans text-[12px] text-[#8e9192] mt-1">
            {city.state} · <span className="font-mono text-[#a3a3a3]">{city.coords}</span>
          </p>
        </div>
        <button
          className="text-[#8e9192] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#201f1f]"
          title="Station Configuration Options"
        >
          <span className="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
      </div>

      {/* 2. IMD Severity Alert Banner */}
      <div
        className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl bg-[#1a1a1a] border transition-colors shadow-sm"
        style={{ borderColor: `${city.alertColor}60` }}
      >
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{
            backgroundColor: city.alertColor,
            animation: city.alertTier === 'Red' || city.alertTier === 'Orange' ? 'pulse 1.8s infinite' : 'none',
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              IMD Alert Tier: {city.alertTier}
            </span>
            <span className="font-mono text-[10px] font-semibold" style={{ color: city.alertColor }}>
              {city.alertDuration}
            </span>
          </div>
          <p className="font-sans text-[12px] text-[#a3a3a3] mt-0.5 truncate">
            {city.alertDesc}
          </p>
        </div>
      </div>

      {/* 3. Core Thermal Metric & Synoptic Overview */}
      <div className="flex items-baseline justify-between py-1 px-1">
        <div>
          <div className="flex items-baseline space-x-1.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-5xl lg:text-6xl font-semibold text-white tracking-tight">
              {city.temp}
            </span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl text-[#8e9192] font-light">
              °C
            </span>
          </div>
          <div className="flex items-center space-x-2.5 mt-1.5">
            <span className="font-mono text-xs text-[#a3a3a3]">
              H: {city.high} · L: {city.low}
            </span>
            <span className="text-[#444748]">·</span>
            <span className="font-mono text-xs text-[#4edea3] font-medium">
              {city.delta}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-1.5 text-white">
            <span className="material-symbols-outlined text-[28px] text-white">{city.icon}</span>
          </div>
          <p className="font-sans text-xs text-[#d4d4d4] font-medium mt-1">
            {city.condition}
          </p>
          <span className="font-mono text-[10px] text-[#8e9192] block mt-0.5">
            Visibility: {city.visibility}
          </span>
        </div>
      </div>

      {/* 4. Primary 4-Metric Grid (Wind, Humidity, Rain, AQI) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]/70 shadow-sm">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase tracking-wider">
            Surface Wind
          </span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-semibold text-white">
              {city.wind}
            </span>
            <span className="font-mono text-[11px] text-[#a3a3a3] flex items-center">
              {city.windDir}
              <span className="material-symbols-outlined text-[14px] ml-0.5 text-[#8e9192]">north_west</span>
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]/70 shadow-sm">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase tracking-wider">
            Relative Humidity
          </span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-semibold text-white">
              {city.humidity}
            </span>
            <span className="font-mono text-[11px] text-[#a3a3a3]">
              Dew: {city.dewPoint}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]/70 shadow-sm">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase tracking-wider">
            Rain Prob (PoP)
          </span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-semibold text-white">
              {city.pop}
            </span>
            <span className="font-mono text-[11px] text-[#8e9192]">
              {city.rainRate}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]/70 shadow-sm">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase tracking-wider">
            CPCB AQI Index
          </span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-semibold" style={{ color: city.aqiColor }}>
              {city.aqi}
            </span>
            <span
              className="font-mono text-[10px] px-1.5 py-0.5 rounded font-bold"
              style={{ backgroundColor: `${city.aqiColor}20`, color: city.aqiColor }}
            >
              {city.aqiStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Extended Synoptic Observations (Utilizes Vertical Space) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-2.5 rounded-xl bg-[#181818]/80 border border-[#262626]/60">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase">
            Barometric Pressure
          </span>
          <div className="flex items-center justify-between mt-1 font-mono">
            <span className="text-xs text-white font-medium">1012.4 hPa</span>
            <span className="text-[10px] text-[#4edea3]">Steady</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#181818]/80 border border-[#262626]/60">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase">
            Solar / UV Index
          </span>
          <div className="flex items-center justify-between mt-1 font-mono">
            <span className="text-xs text-white font-medium">UV 6.8 · Mod</span>
            <span className="text-[10px] text-[#fbbf24]">620 W/m²</span>
          </div>
        </div>
      </div>

      {/* 6. 24-Hour Diurnal Hourly Meteogram Strip */}
      <div className="p-3.5 rounded-xl bg-[#181818] border border-[#262626]/70 space-y-2.5 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-wider font-semibold">
            24-Hour Diurnal Hourly Progression
          </span>
          <span className="font-mono text-[10px] text-[#4edea3]">+24h Synoptic Run</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 pt-0.5 text-center font-mono">
          {city.hourly.map((h, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg transition-all ${
                h.highlight
                  ? 'bg-[#2a2a2a] border border-white/25 shadow-sm'
                  : 'bg-[#201f1f]/60 hover:bg-[#252525]'
              }`}
            >
              <span className="text-[10px] text-[#8e9192] block font-medium">{h.time}</span>
              <span className="text-[13px] text-white font-bold block my-1">{h.temp}</span>
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ color: h.color || (h.highlight ? '#ffffff' : '#a3a3a3') }}
              >
                {h.icon}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Multi-Model AI-NWP Consensus Blend */}
      <div className="p-3.5 rounded-xl bg-[#181818] border border-[#262626]/70 space-y-2 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-wider font-semibold">
            AI-NWP Consensus Blend
          </span>
          <span className="font-mono text-[10px] text-[#4edea3] font-semibold">
            Reliability: {city.blend.reliability}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#353534] flex overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-500"
            style={{ width: `${city.blend.ec}%` }}
            title={`ECMWF IFS (${city.blend.ec}%)`}
          />
          <div
            className="bg-[#4edea3] h-full transition-all duration-500"
            style={{ width: `${city.blend.ai}%` }}
            title={`GraphCast AI (${city.blend.ai}%)`}
          />
          <div
            className="bg-[#8e9192] h-full transition-all duration-500"
            style={{ width: `${city.blend.ncmrwf}%` }}
            title={`NCMRWF Unified (${city.blend.ncmrwf}%)`}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#a3a3a3] pt-1">
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-white mr-1.5" />
            ECMWF {city.blend.ec}%
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] mr-1.5" />
            GraphCast {city.blend.ai}%
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#8e9192] mr-1.5" />
            NCMRWF {city.blend.ncmrwf}%
          </span>
        </div>
      </div>

      {/* 8. Full-Width Station Action Button */}
      <div className="pt-1 mt-auto">
        <button
          onClick={() => alert(`Operational synoptic telemetry for ${city.name} exported.`)}
          className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-white hover:bg-[#e2e2e2] text-[#0a0a0a] font-sans text-xs font-bold transition-all cursor-pointer shadow-lg hover:shadow-xl active:scale-[0.99]"
        >
          <span>View Full Station Analytics &amp; Radiosonde</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
}
