import React from 'react';

export default function StationTelemetryPanel({ city }) {
  if (!city) return null;

  return (
    <aside
      className="w-full lg:w-[420px] h-full flex flex-col rounded-2xl bg-[#121212]/90 backdrop-blur-2xl border border-[#262626] p-4 shadow-2xl overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-[#262626]"
      aria-label="Station Telemetry Inspection"
    >
      {/* Station Header & Geo Coordinates */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-white tracking-tight">
              {city.name}
            </h2>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#201f1f] text-[#a3a3a3]">
              {city.awsId}
            </span>
          </div>
          <p className="font-sans text-[12px] text-[#a3a3a3] mt-0.5">
            {city.state} · {city.coords}
          </p>
        </div>
        <button className="text-[#8e9192] hover:text-white transition-colors p-1" title="Station Options">
          <span className="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
      </div>

      {/* IMD Severity Alert Badge */}
      <div
        className="flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-[#201f1f]/70 border transition-colors"
        style={{ borderColor: `${city.alertColor}60` }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse"
          style={{ backgroundColor: city.alertColor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold text-white uppercase tracking-wider">
              IMD Alert Tier: {city.alertTier}
            </span>
            <span className="font-mono text-[10px]" style={{ color: city.alertColor }}>
              {city.alertDuration}
            </span>
          </div>
          <p className="font-sans text-[12px] text-[#a3a3a3] truncate">
            {city.alertDesc}
          </p>
        </div>
      </div>

      {/* Core Thermal Row */}
      <div className="flex items-baseline justify-between pt-0.5">
        <div>
          <div className="flex items-baseline space-x-1">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              {city.temp}
            </span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl text-[#8e9192] font-light">
              °C
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="font-mono text-xs text-[#a3a3a3]">
              H: {city.high} · L: {city.low}
            </span>
            <span className="text-[#444748]">·</span>
            <span className="font-mono text-xs text-[#4edea3]">
              {city.delta}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-1 text-white">
            <span className="material-symbols-outlined text-[24px]">{city.icon}</span>
          </div>
          <p className="font-sans text-xs text-[#a3a3a3] font-medium mt-1">
            {city.condition}
          </p>
          <span className="font-mono text-[10px] text-[#8e9192]">
            Visibility: {city.visibility}
          </span>
        </div>
      </div>

      {/* 4-Metric Scientific Grid Strip */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-[#181818] border border-[#262626]/50">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase">
            Surface Wind
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold text-white">
              {city.wind}
            </span>
            <span className="font-mono text-[11px] text-[#a3a3a3] flex items-center">
              {city.windDir}
              <span className="material-symbols-outlined text-[13px] ml-0.5">north_west</span>
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#181818] border border-[#262626]/50">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase">
            Relative Humidity
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold text-white">
              {city.humidity}
            </span>
            <span className="font-mono text-[11px] text-[#a3a3a3]">
              Dew: {city.dewPoint}
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#181818] border border-[#262626]/50">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase">
            Rain Prob (PoP)
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold text-white">
              {city.pop}
            </span>
            <span className="font-mono text-[11px] text-[#8e9192]">
              {city.rainRate}
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#181818] border border-[#262626]/50">
          <span className="font-mono text-[10px] text-[#8e9192] block uppercase">
            CPCB AQI Index
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold" style={{ color: city.aqiColor }}>
              {city.aqi}
            </span>
            <span
              className="font-mono text-[10px] px-1 py-0.2 rounded"
              style={{ backgroundColor: `${city.aqiColor}20`, color: city.aqiColor }}
            >
              {city.aqiStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 24-Hour Diurnal Hourly Meteogram Strip */}
      <div className="p-3 rounded-xl bg-[#181818] border border-[#262626]/50 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-wider">
            24-Hour Diurnal Progression
          </span>
          <span className="font-mono text-[10px] text-[#a3a3a3]">+24h Run</span>
        </div>
        <div className="grid grid-cols-6 gap-1 pt-1 text-center font-mono">
          {city.hourly.map((h, i) => (
            <div
              key={i}
              className={`p-1.5 rounded-lg ${
                h.highlight
                  ? 'bg-[#2a2a2a] border border-white/20'
                  : 'bg-[#201f1f]/50'
              }`}
            >
              <span className="text-[10px] text-[#8e9192] block">{h.time}</span>
              <span className="text-[12px] text-white font-semibold block my-0.5">{h.temp}</span>
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ color: h.color || (h.highlight ? '#ffffff' : '#a3a3a3') }}
              >
                {h.icon}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Model AI-NWP Consensus Blend */}
      <div className="space-y-1.5 pt-0.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono text-[11px] text-[#8e9192] uppercase tracking-wider">
            AI-NWP Consensus Blend
          </span>
          <span className="font-mono text-[10px] text-[#4edea3]">
            {city.blend.reliability}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#353534] flex overflow-hidden">
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
        <div className="flex items-center justify-between text-[11px] font-mono text-[#a3a3a3] pt-0.5">
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
            ECMWF {city.blend.ec}%
          </span>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] mr-1.5" />
            GraphCast {city.blend.ai}%
          </span>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8e9192] mr-1.5" />
            NCMRWF {city.blend.ncmrwf}%
          </span>
        </div>
      </div>

      {/* Pill CTA Button */}
      <div className="pt-1">
        <button
          onClick={() => alert(`Operational telemetry report for ${city.name} exported.`)}
          className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-full bg-white hover:bg-[#e2e2e2] text-[#0a0a0a] font-sans text-xs font-semibold transition-all cursor-pointer shadow-md"
        >
          <span>View Full Station Analytics</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
}
