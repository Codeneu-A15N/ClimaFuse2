import React from 'react';

export default function StationParameterGrid({ summaryCards }) {
  if (!summaryCards) return null;

  const { temp, heatIndex, rain, wind, humidity } = summaryCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {/* Card 1: Surface Air Temp */}
      <div className="bg-[#121212] border border-[#262626] hover:border-[#383838] transition-all rounded-xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-[#8e9192]">
          <span className="font-mono text-[10px] uppercase tracking-wider">Surface Air Temp</span>
          <span className="material-symbols-outlined text-[18px]">device_thermostat</span>
        </div>
        <div className="my-2.5">
          <div className="text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white tracking-tight flex items-baseline">
            {temp.value}
            <span className="text-base font-normal text-[#8e9192] ml-0.5">{temp.unit}</span>
          </div>
          <div className="text-xs text-[#a3a3a3] font-mono mt-1">
            Min: {temp.min} · Max: {temp.max}
          </div>
        </div>
        <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-[#1c1b1b]">
          <span className="material-symbols-outlined text-xs">check_circle</span>
          <span className="truncate">{temp.note}</span>
        </div>
      </div>

      {/* Card 2: Apparent Heat Index */}
      <div className="bg-[#121212] border border-[#262626] hover:border-[#383838] transition-all rounded-xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-[#8e9192]">
          <span className="font-mono text-[10px] uppercase tracking-wider">Apparent Heat Index</span>
          <span className="material-symbols-outlined text-[18px] text-amber-400">warning</span>
        </div>
        <div className="my-2.5">
          <div className="text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-amber-400 tracking-tight flex items-baseline">
            {heatIndex.value}
            <span className="text-base font-normal text-[#8e9192] ml-0.5">{heatIndex.unit}</span>
          </div>
          <div className="text-xs text-[#a3a3a3] font-mono mt-1 truncate">
            {heatIndex.threshold}
          </div>
        </div>
        <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5 pt-2 border-t border-[#1c1b1b]">
          <span className="material-symbols-outlined text-xs">arrow_upward</span>
          <span className="truncate">{heatIndex.note}</span>
        </div>
      </div>

      {/* Card 3: Accumulated Rain */}
      <div className="bg-[#121212] border border-[#262626] hover:border-[#383838] transition-all rounded-xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-[#8e9192]">
          <span className="font-mono text-[10px] uppercase tracking-wider">Accumulated Rain</span>
          <span className="material-symbols-outlined text-[18px]">water_drop</span>
        </div>
        <div className="my-2.5">
          <div className="text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white tracking-tight flex items-baseline">
            {rain.value}
            <span className="text-base font-normal text-[#8e9192] ml-0.5"> {rain.unit}</span>
          </div>
          <div className="text-xs text-[#a3a3a3] font-mono mt-1">
            24h Observed: {rain.observed24h}
          </div>
        </div>
        <div className="text-[11px] font-mono text-[#8e9192] flex items-center gap-1.5 pt-2 border-t border-[#1c1b1b]">
          <span className="material-symbols-outlined text-xs">remove</span>
          <span className="truncate">{rain.note}</span>
        </div>
      </div>

      {/* Card 4: Wind Speed */}
      <div className="bg-[#121212] border border-[#262626] hover:border-[#383838] transition-all rounded-xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-[#8e9192]">
          <span className="font-mono text-[10px] uppercase tracking-wider">Surface Vector Wind</span>
          <span className="material-symbols-outlined text-[18px]">air</span>
        </div>
        <div className="my-2.5">
          <div className="text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white tracking-tight flex items-baseline">
            {wind.value}
            <span className="text-base font-normal text-[#8e9192] ml-0.5"> {wind.unit}</span>
          </div>
          <div className="text-xs text-[#a3a3a3] font-mono mt-1 truncate">
            {wind.gusts}
          </div>
        </div>
        <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-[#1c1b1b]">
          <span className="material-symbols-outlined text-xs">trending_down</span>
          <span className="truncate">{wind.note}</span>
        </div>
      </div>

      {/* Card 5: Relative Humidity */}
      <div className="bg-[#121212] border border-[#262626] hover:border-[#383838] transition-all rounded-xl p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-[#8e9192]">
          <span className="font-mono text-[10px] uppercase tracking-wider">Relative Humidity</span>
          <span className="material-symbols-outlined text-[18px]">humidity_percentage</span>
        </div>
        <div className="my-2.5">
          <div className="text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white tracking-tight flex items-baseline">
            {humidity.value}
            <span className="text-base font-normal text-[#8e9192] ml-0.5">{humidity.unit}</span>
          </div>
          <div className="text-xs text-[#a3a3a3] font-mono mt-1 truncate">
            {humidity.dewPoint}
          </div>
        </div>
        <div className="text-[11px] font-mono text-[#8e9192] flex items-center gap-1.5 pt-2 border-t border-[#1c1b1b]">
          <span className="material-symbols-outlined text-xs">sync</span>
          <span className="truncate">{humidity.note}</span>
        </div>
      </div>
    </div>
  );
}
